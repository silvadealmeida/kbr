"""Cruza as formas `spoken` das regras (src/content/hangul/rules.ts) com o g2pkk.
Uso: .audio/venv/bin/python scripts/audio/check-spoken-forms.py
Evidência mecânica, não revisão nativa: g2pkk é o mesmo G2P que o MeloTTS-Korean usa."""
import re, sys
from g2pkk import G2p

src = open("src/content/hangul/rules.ts", encoding="utf-8").read()
pairs = re.findall(r'written: "([^"]+)", spoken: "([^"]+)"', src)
g2p, bad = G2p(), 0
for written, spoken in pairs:
    a, b = g2p(written), g2p(spoken)
    ok = a == spoken and b == spoken
    bad += not ok
    print(("OK  " if ok else "DIFF"), written, "->", a, "| spoken", spoken, "-> g2p", b)
print(f"{len(pairs)} pares, {bad} divergências")
sys.exit(1 if bad else 0)
