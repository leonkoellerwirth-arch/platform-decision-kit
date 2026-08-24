#!/usr/bin/env bash
# meisterklasse-check.sh — Deterministisches Rückgrat für /meisterklasse (KEINE KI, null Tokens)
#
# Kopiere diese Datei nach scripts/meisterklasse.sh im Ziel-Repo und passe die
# Konfigurationsvariablen unten an.
#
# Subkommandos:
#   status            Tabelle: alle Slugs × vollständig? × stale?
#   slugs             Alle Einheits-Slugs (aus KDIR/*.md)
#   missing           Slugs ohne vollständige Analyse (Datei fehlt oder < MIN_LINES Zeilen)
#   stale             Slugs mit Analyse, aber Einheit geändert (mk-hash fehlt / passt nicht)
#   backfill-needed   Union: missing + stale
#   complete <slug>   Exit 0 = vollständig, 1 = fehlt/kaputt
#   record <slug>     Stempelt mk-hash in MDIR/<slug>.md
#   counts            Einzeiler: X/N vollständig · Y fehlen · Z stale
#
# Vollständigkeit = Datei existiert UND >= MIN_LINES Zeilen.
# Stale = mk-hash fehlt ODER passt nicht mehr zum aktuellen Body-Hash der Einheit.
# record = setzt/ersetzt <!-- mk-hash: XXXX --> als erste Zeile in MDIR/<slug>.md.
#
set -euo pipefail

# ─── KONFIGURATION — hier anpassen ────────────────────────────────────────────
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KDIR="$ROOT/kapitel"            # Verzeichnis mit den Einheiten (*.md)
MDIR="$ROOT/docs/meisterklasse" # Ausgabe-Verzeichnis für Analysen
MIN_LINES=40                    # Mindest-Zeilen für eine vollständige Analyse
# ──────────────────────────────────────────────────────────────────────────────

# Normierter Body-Hash (HTML-Kommentare + H1-Zeile ignoriert — identisch zu review-cache.sh)
body_hash() {
  local f="$1"
  sed -E 's/<!--.*-->//g' "$f" | grep -v '^# ' | shasum -a 256 | cut -c1-12
}

all_slugs() {
  for f in "$KDIR"/*.md; do
    [ -e "$f" ] || continue
    basename "$f" .md
  done
}

stored_hash() {
  local af="$MDIR/${1}.md"
  [ -f "$af" ] || { echo ""; return; }
  grep -m1 '^<!-- mk-hash:' "$af" 2>/dev/null | sed 's/<!-- mk-hash: //;s/ -->//' || true
}

is_complete() {
  local af="$MDIR/${1}.md"
  [ -f "$af" ] || return 1
  local lc; lc=$(wc -l < "$af")
  [ "$lc" -ge "$MIN_LINES" ] && return 0 || return 1
}

cmd_status() {
  local total=0 complete=0 stale_n=0 missing_n=0
  printf '%-35s %-12s %-10s %s\n' "Slug" "Einh-Hash" "Analyse" "Status"
  printf '%.0s─' {1..74}; echo
  local slug h sh
  for slug in $(all_slugs); do
    local kf="$KDIR/${slug}.md"
    h="$(body_hash "$kf")"
    sh="$(stored_hash "$slug")"
    total=$((total+1))
    local status
    if ! is_complete "$slug"; then
      status="FEHLT"
      missing_n=$((missing_n+1))
    elif [ -z "$sh" ]; then
      status="⟳kein-hash"
      stale_n=$((stale_n+1))
      complete=$((complete+1))
    elif [ "$sh" != "$h" ]; then
      status="⟳stale"
      stale_n=$((stale_n+1))
      complete=$((complete+1))
    else
      status="✓ frisch"
      complete=$((complete+1))
    fi
    printf '%-35s %-12s %-10s %s\n' "$slug" "$h" \
      "$([ -f "$MDIR/${slug}.md" ] && echo "$(wc -l < "$MDIR/${slug}.md")Z" || echo "—")" \
      "$status"
  done
  echo
  printf 'Gesamt: %d · %d vollständig · %d fehlen · %d stale\n' \
    "$total" "$complete" "$missing_n" "$stale_n"
}

cmd_slugs()   { all_slugs; }

cmd_missing() {
  local slug
  for slug in $(all_slugs); do
    is_complete "$slug" || echo "$slug"
  done
}

cmd_stale() {
  local slug h sh
  for slug in $(all_slugs); do
    is_complete "$slug" || continue
    h="$(body_hash "$KDIR/${slug}.md")"
    sh="$(stored_hash "$slug")"
    if [ -z "$sh" ] || [ "$sh" != "$h" ]; then echo "$slug"; fi
  done
}

cmd_backfill_needed() { { cmd_missing; cmd_stale; } | sort -u; }

cmd_complete() {
  local slug="${1:?slug fehlt}"
  if is_complete "$slug"; then
    echo "✓ vollständig: $MDIR/${slug}.md"; exit 0
  else
    local af="$MDIR/${slug}.md"
    if [ -f "$af" ]; then
      echo "UNVOLLSTÄNDIG: $(wc -l < "$af") Zeilen (Mindest: $MIN_LINES)"
    else
      echo "FEHLT: $MDIR/${slug}.md"
    fi
    exit 1
  fi
}

cmd_record() {
  local slug="${1:?slug fehlt}"
  local kf="$KDIR/${slug}.md"
  local af="$MDIR/${slug}.md"
  [ -f "$kf" ] || { echo "Einheit nicht gefunden: $kf" >&2; exit 1; }
  [ -f "$af" ] || { echo "Analyse nicht gefunden (erst schreiben lassen): $af" >&2; exit 1; }
  local h; h="$(body_hash "$kf")"
  local hashline="<!-- mk-hash: ${h} -->"
  local tmp; tmp="$(mktemp)"
  if head -1 "$af" | grep -q '^<!-- mk-hash:'; then
    { echo "$hashline"; tail -n +2 "$af"; } > "$tmp" && mv "$tmp" "$af"
    echo "✓ Hash aktualisiert: $slug → $h"
  else
    { echo "$hashline"; cat "$af"; } > "$tmp" && mv "$tmp" "$af"
    echo "✓ Hash eingetragen: $slug → $h"
  fi
}

cmd_counts() {
  local total=0 complete=0 stale_n=0 missing_n=0
  local slug
  for slug in $(all_slugs); do
    total=$((total+1))
    if ! is_complete "$slug"; then
      missing_n=$((missing_n+1))
    else
      complete=$((complete+1))
      local h sh
      h="$(body_hash "$KDIR/${slug}.md")"
      sh="$(stored_hash "$slug")"
      if [ -z "$sh" ] || [ "$sh" != "$h" ]; then stale_n=$((stale_n+1)); fi
    fi
  done
  echo "${complete}/${total} vollständig · ${missing_n} fehlen · ${stale_n} stale"
}

case "${1:-status}" in
  status)           cmd_status ;;
  slugs)            cmd_slugs ;;
  missing)          cmd_missing ;;
  stale)            cmd_stale ;;
  backfill-needed)  cmd_backfill_needed ;;
  complete)         cmd_complete "${2:-}" ;;
  record)           cmd_record "${2:-}" ;;
  counts)           cmd_counts ;;
  *)
    echo "Nutzung: $(basename "$0") {status|slugs|missing|stale|backfill-needed|complete <slug>|record <slug>|counts}" >&2
    exit 1 ;;
esac
