"""Genera le pagine del sito in tutte le lingue.

Uso (dalla cartella principale del sito):
    python3 _build/build.py

- _build/template.html  pagina master in italiano, con alcuni segnaposto
- _build/lang/<codice>.json  coppie [testo italiano, traduzione], applicate in ordine

Per aggiungere una lingua: crea _build/lang/<codice>.json e aggiungi una riga in LANGS.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://neuragrowtech.com"
LASTMOD = "2026-10-12"

# codice, percorso, locale Open Graph, nome nella lingua stessa,
# testo e link dell'avviso mostrato sulla home italiana a chi ha il browser in quella lingua
LANGS = [
    {"code": "it", "path": "/", "locale": "it_IT", "name": "Italiano"},
    {"code": "en", "path": "/en/", "locale": "en_GB", "name": "English",
     "hint": "This page is also available in English.", "hint_link": "Read in English →", "close": "Close"},
    {"code": "es", "path": "/es/", "locale": "es_ES", "name": "Español",
     "hint": "Esta página también está disponible en español.", "hint_link": "Leer en español →", "close": "Cerrar"},
]
SWITCH_LABEL = {"it": "Lingua", "en": "Language", "es": "Idioma"}


def head_alternates(current):
    lines = [f'<link rel="canonical" href="{BASE}{current["path"]}">']
    for l in LANGS:
        lines.append(f'<link rel="alternate" hreflang="{l["code"]}" href="{BASE}{l["path"]}">')
    lines.append(f'<link rel="alternate" hreflang="x-default" href="{BASE}/">')
    return "\n".join(lines)


def switcher(current):
    links = ""
    for l in LANGS:
        cur = ' aria-current="true"' if l is current else ""
        links += (f'<a href="{l["path"]}"{cur} hreflang="{l["code"]}" lang="{l["code"]}" '
                  f'title="{l["name"]}">{l["code"].upper()}</a>')
    return f'<nav class="lang" aria-label="{SWITCH_LABEL.get(current["code"], "Language")}">{links}</nav>'


def hint(current):
    if current["code"] != "it":
        return ""
    items = "".join(
        f'<div class="wrap" data-hint="{l["code"]}" lang="{l["code"]}" hidden><span>{l["hint"]}</span>'
        f'<a href="{l["path"]}" hreflang="{l["code"]}">{l["hint_link"]}</a>'
        f'<button type="button" class="lang-hint-close" aria-label="{l["close"]}">×</button></div>'
        for l in LANGS if "hint" in l)
    return f'<div class="lang-hint" id="lang-hint" hidden>\n  {items}\n</div>'


def build():
    tpl = open(os.path.join(ROOT, "_build", "template.html"), encoding="utf-8").read()
    ok = True
    for l in LANGS:
        page = tpl
        if l["code"] != "it":
            pairs = json.load(open(os.path.join(ROOT, "_build", "lang", l["code"] + ".json"), encoding="utf-8"))
            for src, dst in pairs:
                if src not in page:
                    print(f"[{l['code']}] testo non trovato nel template: {src[:70]!r}")
                    ok = False
                    continue
                page = page.replace(src, dst)
        page = (page.replace("{{LANG}}", l["code"])
                    .replace("{{URL}}", BASE + l["path"])
                    .replace("{{LOCALE}}", l["locale"])
                    .replace("<!--HEAD_ALT-->", head_alternates(l))
                    .replace("      <!--LANG_SWITCH-->", "      " + switcher(l))
                    .replace("<!--LANG_HINT-->\n", hint(l) + ("\n" if l["code"] == "it" else "")))
        out = os.path.join(ROOT, l["path"].strip("/"), "index.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, "w", encoding="utf-8").write(page)
        print("scritto", os.path.relpath(out, ROOT))

    alts = "\n".join(f'    <xhtml:link rel="alternate" hreflang="{l["code"]}" href="{BASE}{l["path"]}"/>' for l in LANGS)
    alts += f'\n    <xhtml:link rel="alternate" hreflang="x-default" href="{BASE}/"/>'
    urls = "\n".join(f"  <url>\n    <loc>{BASE}{l['path']}</loc>\n    <lastmod>{LASTMOD}</lastmod>\n{alts}\n  </url>" for l in LANGS)
    open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8").write(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
        f"{urls}\n</urlset>\n")
    print("scritto sitemap.xml")
    return ok


if __name__ == "__main__":
    sys.exit(0 if build() else 1)
