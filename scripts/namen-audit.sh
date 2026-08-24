#!/usr/bin/env bash
#
# namen-audit.sh — buchweiter Namens-Audit (deterministisch, KEINE KI).
# Generalisierte Version aus dev/base. Bash 3.2 kompatibel (macOS).
#
# KONFIGURATION (via Umgebungsvariablen, alle optional):
#   FIGUREN_JSON     Figuren-DB          (Default: notizen/figuren.json)
#   KAPITEL_DIR      Manuskript-Verz.    (Default: kapitel)
#   NAMENS_ACHSE     Epochen-Gate-Skript (Default: scripts/namens-achse-check.sh)
#
# PRÜFUNGEN:
#   A1  Retirierte Namen    (scope: kapitel | global)
#   A2  Namens-Epochen      (via NAMENS_ACHSE, falls vorhanden)
#   A3  Alias-Konsistenz    (mehrere Aliasse im selben Kapitel)
#   A4  Undokumentierte Namen (mid-sentence Heuristik)
#   A5  DB<->Text-Divergenz  (kapitelKanon vs. Grep)
#
# Exit 0 = GRUEN; Exit 1 = FAIL
#
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FIGUREN="${FIGUREN_JSON:-$ROOT/notizen/figuren.json}"
KDIR="${KAPITEL_DIR:-$ROOT/kapitel}"
NAMENS_ACHSE_BIN="${NAMENS_ACHSE:-$ROOT/scripts/namens-achse-check.sh}"
SELF="$(basename "$0")"

G=$'\e[32m'; R=$'\e[31m'; Y=$'\e[33m'; B=$'\e[1m'; DIM=$'\e[2m'; N=$'\e[0m'
fail=0; warn=0

ok()   { printf "  ${G}OK${N}  %s\n" "$1"; }
err()  { printf "  ${R}X${N}  %s\n"  "$1"; fail=$((fail+1)); }
hint() { printf "  ${Y}!${N}  %s\n"  "$1"; warn=$((warn+1)); }
sep()  { printf '%0.s-' {1..70}; printf '\n'; }

for dep in jq python3; do
  command -v "$dep" >/dev/null 2>&1 || { echo "${R}FEHLER: ${dep} nicht gefunden${N}" >&2; exit 2; }
done
[ -f "$FIGUREN" ] || { echo "${R}FEHLER: Figuren-DB nicht gefunden: ${FIGUREN}${N}" >&2; exit 2; }
[ -d "$KDIR" ]    || { echo "${R}FEHLER: Kapitel-Verz. nicht gefunden: ${KDIR}${N}" >&2; exit 2; }

echo ""
echo "${B}NAMEN-AUDIT${N}  ${DIM}(${FIGUREN##$ROOT/})${N}"
sep

# ── A1 ────────────────────────────────────────────────────────────────────
echo "${B}A1 · Retirierte Namen${N}"
n_retired=$(jq '.meta.retirierteNamen | length' "$FIGUREN" 2>/dev/null || echo 0)
i=0
while [ "$i" -lt "$n_retired" ]; do
  literal=$(jq -r ".meta.retirierteNamen[$i].literal" "$FIGUREN")
  scope=$(  jq -r ".meta.retirierteNamen[$i].scope"   "$FIGUREN")
  grund=$(  jq -r ".meta.retirierteNamen[$i].grund"   "$FIGUREN")
  if [ "$scope" = "kapitel" ]; then
    hits=$(grep -rnwI "$literal" "$KDIR" 2>/dev/null || true)
    if [ -n "$hits" ]; then
      err "\"${literal}\" in $(basename "$KDIR")/ (${grund}):"; printf '%s\n' "$hits" | sed 's/^/        /'
    else
      ok "\"${literal}\" (kapitel) — kein Treffer"
    fi
  elif [ "$scope" = "global" ]; then
    hits=$(python3 - "$ROOT" "$FIGUREN" "$literal" "$i" "$SELF" <<'PYEOF'
import subprocess, sys, os, json, fnmatch
root=sys.argv[1]; fp=sys.argv[2]; literal=sys.argv[3]; idx=int(sys.argv[4]); selfn=sys.argv[5]
with open(fp, encoding="utf-8") as fh: data=json.load(fh)
allowed_in=data["meta"]["retirierteNamen"][idx].get("allowedIn",[])
always_excl_dirs={".git","node_modules","scripts","review-app"}
always_excl_files={os.path.basename(fp), selfn}
allowed_dirs={a.rstrip("/") for a in allowed_in if a.endswith("/")}
allowed_globs=[a for a in allowed_in if not a.endswith("/")]
results=[]
for dirpath,dirnames,filenames in os.walk(root):
    rel_dir=os.path.relpath(dirpath,root)
    parts=rel_dir.split(os.sep)
    skip=any(p in always_excl_dirs or p in allowed_dirs for p in parts)
    if skip: dirnames[:]=[] ; continue
    for fname in filenames:
        fpath=os.path.join(dirpath,fname)
        rel=os.path.relpath(fpath,root)
        if fname in always_excl_files: continue
        if any(fnmatch.fnmatch(rel,g) or fnmatch.fnmatch(fname,g) for g in allowed_globs): continue
        try:
            out=subprocess.check_output(["grep","-nwI",literal,fpath],stderr=subprocess.DEVNULL).decode("utf-8","replace")
            for line in out.splitlines(): results.append(f"{rel}:{line}")
        except subprocess.CalledProcessError: pass
print("\n".join(results))
PYEOF
)
    if [ -n "$hits" ]; then
      err "\"${literal}\" ausserhalb Allowlist (${grund}):"; printf '%s\n' "$hits" | sed 's/^/        /'
    else
      ok "\"${literal}\" (global) — kein Treffer"
    fi
  fi
  i=$((i+1))
done
[ "$n_retired" -eq 0 ] && ok "Keine retirierten Namen registriert"
sep

# ── A2 ────────────────────────────────────────────────────────────────────
echo "${B}A2 · Namens-Epochen${N}  ${DIM}(via ${NAMENS_ACHSE_BIN##$ROOT/})${N}"
if [ -x "$NAMENS_ACHSE_BIN" ]; then
  achse_out=$("$NAMENS_ACHSE_BIN" 2>&1 || true)
  if printf '%s\n' "$achse_out" | grep -q '\[ FAIL \]'; then
    err "Epochen-Gate: FAIL"; fail=$((fail+1))
    printf '%s\n' "$achse_out" | grep -E '(FAIL|vor Kap)' | head -5 | sed 's/^/    /'
  elif printf '%s\n' "$achse_out" | grep -q '\[ OK \]'; then
    ok "Epochen-Gate: PASS"
  else
    hint "Epochen-Gate: kein klares Signal — manuell pruefen"
  fi
else
  ok "Kein Epochen-Gate-Skript (projekt-spezifisch) — uebersprungen"
fi
sep

# ── A3 ────────────────────────────────────────────────────────────────────
echo "${B}A3 · Alias-Konsistenz${N}"
a3_out=$(python3 - "$KDIR" "$FIGUREN" <<'PYEOF'
import json,os,subprocess,sys
kdir=sys.argv[1]; fp=sys.argv[2]
with open(fp,encoding="utf-8") as fh: data=json.load(fh)
multi=[(f["id"],f.get("aliasse",[]))
       for f in data.get("figuren",[])
       if f.get("scanbar") and len(f.get("aliasse",[]))>=2]
if not multi: print("OK:Keine Figur mit mehreren Aliassen"); sys.exit(0)
for fig_id,aliasse in multi:
    totals={a:0 for a in aliasse}
    for alias in aliasse:
        files=[os.path.join(kdir,fn) for fn in os.listdir(kdir) if fn.endswith(".md")]
        try:
            r=subprocess.check_output(["grep","-rnwIc",alias]+files,stderr=subprocess.DEVNULL).decode("utf-8","replace")
            totals[alias]=sum(int(l.split(":")[-1]) for l in r.splitlines() if ":" in l)
        except subprocess.CalledProcessError: pass
    print(f"INFO:{fig_id} — {' | '.join(f'{a}:{totals[a]}x' for a in aliasse)}")
    for fname in sorted(os.listdir(kdir)):
        if not fname.endswith(".md"): continue
        fpath=os.path.join(kdir,fname)
        active=[a for a in aliasse if not subprocess.run(["grep","-qwI",a,fpath],stderr=subprocess.DEVNULL).returncode]
        if len(active)>1:
            print(f"WARN:[{fig_id}] Kap. {fname[:-3]} mischt: {', '.join(active)}")
PYEOF
)
a3_warn=0
while IFS= read -r line; do
  case "$line" in OK:*) ok "${line#OK:}" ;; INFO:*) printf "  ${DIM}%s${N}\n" "${line#INFO:}" ;;
    WARN:*) hint "${line#WARN:}"; a3_warn=$((a3_warn+1)) ;; esac
done <<EOF
$a3_out
EOF
warn=$((warn+a3_warn))
sep

# ── A4 ────────────────────────────────────────────────────────────────────
echo "${B}A4 · Undokumentierte Eigennamen${N}  ${DIM}(mid-sentence >=4x — best-effort)${N}"
python3 - "$KDIR" "$FIGUREN" <<'PYEOF'
import re,json,sys,os,collections
kdir=sys.argv[1]; fp=sys.argv[2]; THRESHOLD=4
with open(fp,encoding="utf-8") as fh: data=json.load(fh)
known=set()
for a in data.get("protagonist",{}).get("aliasse",[]): known.add(a.lower())
for fig in data.get("figuren",[]): [known.add(w.lower()) for w in fig.get("name","").split()] or [known.add(a.lower()) for a in fig.get("aliasse",[])]
for r in data.get("meta",{}).get("retirierteNamen",[]): known.add(r.get("literal","").lower())
stop={"der","die","das","dem","den","des","ein","eine","einen","einem","einer","eines","er","sie","wir","ihr","ich","du","man","es","ist","war","hat","hatte","sind","waren","wird","wurde","kann","konnte","aber","und","oder","auch","noch","nicht","nur","schon","dann","jetzt","nach","vor","bei","mit","aus","von","zum","zur","auf","an","in","am","als","wie","so","da","hier","dort","wo","wenn","weil","dass","nacht","tag","haus","mann","frau","kind","vater","mutter","bruder","schwester","mädchen","junge","stadt","land","weg","zeit","wort","hand","auge","stimme","körper","kopf","arm","bein","moment","stunde","jahr","monat","minute","okay","klar","gut","los","nein","ja","bitte"}
word_counter=collections.Counter()
sentence_end=re.compile(r'[.!?]\s+')
for fname in sorted(os.listdir(kdir)):
    if not fname.endswith(".md"): continue
    with open(os.path.join(kdir,fname),encoding="utf-8") as fh: raw=fh.read()
    raw=re.sub(r'<!--.*?-->','',raw,flags=re.DOTALL)
    lines=[l for l in raw.splitlines() if not l.startswith("#")]
    for sent in sentence_end.split(" ".join(lines)):
        for w in sent.split()[1:]:
            m=re.match(r"^([A-ZÄÖÜ][a-zäöüß]{2,14})$",w)
            if m: word_counter[m.group(1)]+=1
candidates=[(w,c) for w,c in word_counter.most_common() if c>=THRESHOLD and w.lower() not in known and w.lower() not in stop]
if not candidates:
    print("  \033[32mOK\033[0m  Keine offensichtlich undokumentierten Eigennamen (>=%d x)" % THRESHOLD)
else:
    print("  \033[33m!\033[0m  Kandidaten (>=%d x, nicht in DB):" % THRESHOLD)
    [print("        %-20s  %dx" % (w,c)) for w,c in candidates[:20]]
    if len(candidates)>20: print("        ... und %d weitere" % (len(candidates)-20))
    print("  \033[2m  Heuristik: dt. Substantive sind false-positive moeglich.\033[0m")
PYEOF
sep

# ── A5 ────────────────────────────────────────────────────────────────────
echo "${B}A5 · DB<->Text-Divergenz${N}  ${DIM}(kapitelKanon vs. Grep)${N}"
a5_out=$(python3 - "$KDIR" "$FIGUREN" <<'PYEOF'
import json,os,subprocess,sys
kdir=sys.argv[1]; fp=sys.argv[2]
with open(fp,encoding="utf-8") as fh: data=json.load(fh)
slug_to_file={fn[:-3]:os.path.join(kdir,fn) for fn in os.listdir(kdir) if fn.endswith(".md")}
total=0
for fig in data.get("figuren",[]):
    if not fig.get("scanbar"): continue
    aliasse=fig.get("aliasse",[]);
    if not aliasse: continue
    fig_id=fig["id"]; kanon=set(fig.get("kapitelKanon",[]))
    actual=set()
    for fname in os.listdir(kdir):
        if not fname.endswith(".md"): continue
        slug=fname[:-3]; fpath=os.path.join(kdir,fname)
        for alias in aliasse:
            try:
                subprocess.check_output(["grep","-qwI",alias,fpath],stderr=subprocess.DEVNULL)
                actual.add(slug); break
            except subprocess.CalledProcessError: pass
    for slug in kanon:
        if slug not in actual and slug in slug_to_file:
            print(f"WARN:[{fig_id}] kapitelKanon nennt {slug!r}, kein Alias im Text"); total+=1
    for slug in actual:
        if slug not in kanon:
            print(f"WARN:[{fig_id}] Alias in {slug!r}, fehlt in kapitelKanon"); total+=1
if total==0: print("OK:Keine DB<->Text-Divergenz")
PYEOF
)
a5_warn=0
while IFS= read -r line; do
  case "$line" in OK:*) ok "${line#OK:}" ;; WARN:*) hint "${line#WARN:}"; a5_warn=$((a5_warn+1)) ;; esac
done <<EOF
$a5_out
EOF
warn=$((warn+a5_warn))
sep

echo ""
if [ "$fail" -eq 0 ]; then
  printf "${G}${B}[ OK ] Namen-Audit bestanden${N}  ${DIM}(Hinweise: %d)${N}\n\n" "$warn"; exit 0
else
  printf "${R}${B}[ FAIL ] %d Verstoss/Verstoesse${N}  ${DIM}(Hinweise: %d)${N}\n\n" "$fail" "$warn"; exit 1
fi
