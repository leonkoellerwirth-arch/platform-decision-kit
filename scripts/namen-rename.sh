#!/usr/bin/env bash
#
# namen-rename.sh — standardisierte Figur-/Namen-Umbenennung.
# Generalisierte Version aus dev/base. Bash 3.2 kompatibel (macOS).
#
# KONFIGURATION (via Umgebungsvariablen, alle optional):
#   FIGUREN_JSON     Figuren-DB (Default: notizen/figuren.json)
#   KAPITEL_DIR      Manuskript-Verz. (Default: kapitel)
#   AUDIT_SCRIPT     Audit-Skript (Default: scripts/namen-audit.sh)
#   INTEGRITY_SCRIPT Integritäts-Gate (Default: scripts/book-integrity.sh)
#   NAMENS_ACHSE     Epochen-Gate (Default: scripts/namens-achse-check.sh)
#
# AUFRUF:
#   ./backbone/namen-rename.sh --alt "AltName" --neu "NeuName"
#   ./backbone/namen-rename.sh --alt "AltName" --neu "NeuName" --scope alle --dry-run
#
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIGUREN="${FIGUREN_JSON:-$ROOT/notizen/figuren.json}"
KDIR="${KAPITEL_DIR:-$ROOT/kapitel}"
AUDIT="${AUDIT_SCRIPT:-$ROOT/scripts/namen-audit.sh}"
INTEGRITY="${INTEGRITY_SCRIPT:-$ROOT/scripts/book-integrity.sh}"
NAMENS_ACHSE_BIN="${NAMENS_ACHSE:-$ROOT/scripts/namens-achse-check.sh}"

G=$'\e[32m'; R=$'\e[31m'; Y=$'\e[33m'; B=$'\e[1m'; DIM=$'\e[2m'; N=$'\e[0m'

alt=""; neu=""; figur_id=""; scope="kapitel"; dry_run=0

while [ $# -gt 0 ]; do
  case "$1" in
    --alt)       alt="$2";      shift; shift ;;
    --neu)       neu="$2";      shift; shift ;;
    --figur-id)  figur_id="$2"; shift; shift ;;
    --scope)     scope="$2";    shift; shift ;;
    --dry-run)   dry_run=1;     shift ;;
    *) echo "${R}Unbekanntes Argument: $1${N}" >&2; exit 2 ;;
  esac
done

[ -n "$alt" ] && [ -n "$neu" ] || {
  echo "Aufruf: $0 --alt <AlterName> --neu <NeuerName> [--figur-id ID] [--scope kapitel|alle] [--dry-run]"
  exit 2
}

echo ""
echo "${B}NAMEN-RENAME${N}"
printf '%0.s-' {1..70}; printf '\n'
echo "  Alt: \"${alt}\"  ->  Neu: \"${neu}\"  (scope: ${scope})"
[ "$dry_run" -eq 1 ] && echo "  ${Y}[DRY-RUN]${N}"
printf '%0.s-' {1..70}; printf '\n'

for dep in perl jq python3; do
  command -v "$dep" >/dev/null 2>&1 || { echo "${R}FEHLER: ${dep} nicht gefunden${N}" >&2; exit 2; }
done
[ -f "$FIGUREN" ] || { echo "${R}FEHLER: Figuren-DB nicht gefunden${N}" >&2; exit 2; }

# ── R0: Vorkommen ──────────────────────────────────────────────────────────
echo ""
echo "${B}R0 · Vorkommen${N}"
hit_files=$(python3 - "$ROOT" "$KDIR" "$alt" "$scope" <<'PYEOF'
import os, subprocess, sys
root=sys.argv[1]; kdir=sys.argv[2]; token=sys.argv[3]; scope=sys.argv[4]
targets=[kdir]
if scope=="alle":
    for d in ["docs","notizen"]:
        p=os.path.join(root,d)
        if os.path.isdir(p): targets.append(p)
    for f in ["BIBEL.md","outline.md","DRAMATURGIE.md","DYNAMIK.md","STIL.md"]:
        p=os.path.join(root,f)
        if os.path.isfile(p): targets.append(p)
results=[]
for t in targets:
    if os.path.isfile(t):
        try:
            subprocess.check_output(["grep","-qwI",token,t],stderr=subprocess.DEVNULL)
            results.append(t)
        except subprocess.CalledProcessError: pass
    elif os.path.isdir(t):
        for dp,_,files in os.walk(t):
            for fn in files:
                if fn.endswith(".md"):
                    fp=os.path.join(dp,fn)
                    try:
                        subprocess.check_output(["grep","-qwI",token,fp],stderr=subprocess.DEVNULL)
                        results.append(fp)
                    except subprocess.CalledProcessError: pass
print("\n".join(results))
PYEOF
)
[ -z "$hit_files" ] && { echo "  ${Y}!${N}  \"${alt}\" nicht gefunden — nichts zu ersetzen."; exit 0; }
while IFS= read -r f; do
  [ -n "$f" ] || continue
  cnt=$(grep -owcE "\\b${alt}\\b" "$f" 2>/dev/null | head -1 || echo 0)
  printf "    %-55s  %sx\n" "${f#$ROOT/}" "${cnt:-0}"
done <<EOF
$hit_files
EOF

# ── R1: figuren.json ────────────────────────────────────────────────────────
echo ""
echo "${B}R1 · figuren.json${N}"
[ -z "$figur_id" ] && figur_id=$(python3 - "$FIGUREN" "$alt" <<'PYEOF'
import json,sys
with open(sys.argv[1],encoding="utf-8") as fh: data=json.load(fh)
tok=sys.argv[2].lower()
for a in data.get("protagonist",{}).get("aliasse",[]):
    if a.lower()==tok: print("protagonist"); sys.exit(0)
if data.get("protagonist",{}).get("name","").lower()==tok: print("protagonist"); sys.exit(0)
for fig in data.get("figuren",[]):
    if fig.get("name","").lower()==tok: print(fig["id"]); sys.exit(0)
    for a in fig.get("aliasse",[]):
        if a.lower()==tok: print(fig["id"]); sys.exit(0)
print("")
PYEOF
)

if [ -z "$figur_id" ]; then
  echo "  ${Y}!${N}  Nicht in figuren.json — manuell eintragen."
elif [ "$dry_run" -eq 1 ]; then
  echo "  ${DIM}[DRY-RUN] figuren.json ID=${figur_id} wuerde aktualisiert${N}"
else
  python3 - "$FIGUREN" "$figur_id" "$alt" "$neu" <<'PYEOF'
import json,sys
path=sys.argv[1]; fid=sys.argv[2]; old=sys.argv[3]; new=sys.argv[4]
with open(path,encoding="utf-8") as fh: data=json.load(fh)
changed=False
def upd(o):
    global changed
    if o.get("name")==old: o["name"]=new; changed=True
    nl=[new if a==old else a for a in o.get("aliasse",[])]
    if nl!=o.get("aliasse",[]): changed=True
    o["aliasse"]=nl
    for e in o.get("namensarchitektur",[]):
        if e.get("name")==old: e["name"]=new; changed=True
if fid=="protagonist": upd(data["protagonist"])
else: [upd(f) for f in data.get("figuren",[]) if f["id"]==fid]
r=data.setdefault("meta",{}).setdefault("retirierteNamen",[])
if not any(x["literal"]==old for x in r):
    r.append({"literal":old,"grund":"umbenannt -> %s (namen-rename.sh)"%new,"scope":"kapitel","allowedIn":[]}); changed=True
with open(path,"w",encoding="utf-8") as fh: json.dump(data,fh,ensure_ascii=False,indent=2); fh.write("\n")
print("OK" if changed else "NOOP")
PYEOF
  echo "  ${G}OK${N}  figuren.json aktualisiert (${alt} -> ${neu}; retiriert)"
fi

# ── R2/R3: Ersetzen ─────────────────────────────────────────────────────────
echo ""
echo "${B}R2-R3 · Ersetzen${N}  ${DIM}(Perl Wort-Grenzen)${N}"
changed_files=0
while IFS= read -r f; do
  [ -n "$f" ] || continue
  before=$(grep -owcE "\\b${alt}\\b" "$f" 2>/dev/null | head -1 || echo 0)
  if [ "$dry_run" -eq 1 ]; then
    printf "  ${DIM}[DRY-RUN]${N} %-50s  %sx\n" "${f#$ROOT/}" "${before:-0}"
  else
    perl -i '' -pe "s/\\b\Q${alt}\E\\b/${neu}/g" "$f" 2>/dev/null
    after=$(grep -owcE "\\b${neu}\\b" "$f" 2>/dev/null | head -1 || echo 0)
    orphan=$(grep -owcI "\\b${alt}\\b" "$f" 2>/dev/null | head -1 || echo 0)
    if [ "${orphan:-0}" -gt 0 ]; then
      printf "  ${Y}!${N} %-50s  %sx -> %sx  (ORPHAN: %sx!)\n" "${f#$ROOT/}" "${before:-0}" "${after:-0}" "$orphan"
    else
      printf "  ${G}V${N} %-50s  %sx -> %sx\n" "${f#$ROOT/}" "${before:-0}" "${after:-0}"
    fi
    changed_files=$((changed_files+1))
  fi
done <<EOF
$hit_files
EOF

# ── R4: Verifikation ────────────────────────────────────────────────────────
echo ""
echo "${B}R4 · Verifikation${N}"
if [ "$dry_run" -eq 1 ]; then
  echo "  ${DIM}[DRY-RUN] Gates uebersprungen${N}"
else
  # Orphan-Check
  orphan_found=$(python3 - "$ROOT" "$KDIR" "$alt" "$scope" <<'PYEOF'
import os,subprocess,sys
root=sys.argv[1]; kdir=sys.argv[2]; token=sys.argv[3]; scope=sys.argv[4]
targets=[kdir]
if scope=="alle":
    for d in ["docs","notizen"]:
        p=os.path.join(root,d)
        if os.path.isdir(p): targets.append(p)
    for f in ["BIBEL.md","outline.md","DRAMATURGIE.md","DYNAMIK.md","STIL.md"]:
        p=os.path.join(root,f)
        if os.path.isfile(p): targets.append(p)
r=[]
for t in targets:
    if os.path.isfile(t):
        try:
            subprocess.check_output(["grep","-qwI",token,t],stderr=subprocess.DEVNULL)
            r.append(t)
        except subprocess.CalledProcessError: pass
    elif os.path.isdir(t):
        for dp,_,files in os.walk(t):
            for fn in files:
                if fn.endswith(".md"):
                    fp=os.path.join(dp,fn)
                    try:
                        subprocess.check_output(["grep","-qwI",token,fp],stderr=subprocess.DEVNULL)
                        r.append(fp)
                    except subprocess.CalledProcessError: pass
print("\n".join(r))
PYEOF
)
  if [ -n "$orphan_found" ]; then
    echo "  ${R}X${N}  Orphan-Check FAIL:"
    while IFS= read -r f; do [ -n "$f" ] && printf "        %s\n" "${f#$ROOT/}"; done <<EOF
$orphan_found
EOF
  else
    echo "  ${G}OK${N}  Orphan-Check: \"${alt}\" vollstaendig ersetzt"
  fi

  for pair in "namen-audit:$AUDIT" "book-integrity:$INTEGRITY" "namens-achse:$NAMENS_ACHSE_BIN"; do
    label="${pair%%:*}"; bin="${pair#*:}"
    [ -x "$bin" ] || continue
    echo ""
    echo "  Laufe ${label} ..."
    if "$bin" 2>&1 | grep -qE '\[ OK \]'; then
      echo "  ${G}OK${N}  ${label}: PASS"
    else
      echo "  ${R}X${N}  ${label}: Verstoesse"
    fi
  done
fi

printf '%0.s-' {1..70}; printf '\n'
echo ""
if [ "$dry_run" -eq 1 ]; then
  echo "${Y}${B}[DRY-RUN]${N}  Keine Aenderungen."
else
  echo "${G}${B}[RENAME ABGESCHLOSSEN]${N}  \"${alt}\" -> \"${neu}\"  (${changed_files} Datei(en))"
  echo ""
  echo "  Naechste Schritte:"
  echo "    1. Kapiteltext reviewen (Uebergaenge, Epoche)"
  echo "    2. BIBLE.md / outline.md ergaenzen"
  echo "    3. Granular committen (figuren: / kapitel: / docs:)"
  echo "    4. Rueckgaengig: git checkout -- ."
fi
echo ""
