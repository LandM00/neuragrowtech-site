# neuragrowtech.com

Sito di Neura GrowTech. Pagine statiche (HTML, CSS, JS), senza build: quello che c'è in questa cartella è esattamente ciò che viene pubblicato.

- `index.html`, `en/index.html`, `es/index.html` — pagine generate: **non modificarle a mano**
- `_build/template.html` — pagina master in italiano
- `_build/lang/*.json` — traduzioni (coppie testo italiano → traduzione)
- `_build/build.py` — rigenera tutte le lingue e la sitemap: `python3 _build/build.py`

Per aggiungere una lingua: crea `_build/lang/<codice>.json`, aggiungi la lingua in `LANGS` dentro `build.py` e rilancia lo script.
- `css/style.css` — stile (colori e caratteri definiti in cima al file)
- `js/main.js` — animazione del pannello NEX e pulsanti "Copia"
- `img/` — fotografie
- `fonts/` — caratteri ospitati in locale (niente Google Fonts, quindi nessun dato inviato a terzi)

Pubblicazione: Cloudflare Pages, collegato a questo repository. Ogni modifica sul ramo `main` va online in automatico.

## Anteprima e manutenzione

- **Anteprima:** le modifiche importanti si preparano sul ramo `anteprima`. Cloudflare le pubblica su https://anteprima.neuragrowtech.pages.dev senza toccare il sito vero. Quando sono approvate si uniscono a `main`.
- **Manutenzione:** la pagina `/manutenzione/` si attiva da Cloudflare (dominio neuragrowtech.com → Rules → Redirect Rules → "Modalità manutenzione"): accendere la regola chiude il sito, spegnerla lo riapre.

## Gioco "Fai il lavoro di NEX"

`js/nexgame.js` + `css/nexgame.css`, usato in `/manutenzione/` e nella pagina 404. Testi nelle tre lingue dentro `nexgame.js`.
Il codice del gioco viene **inserito dentro le due pagine** da `python3 _build/build.py`: dopo ogni modifica a `nexgame.js` rilanciare lo script.
Quando si modificano CSS o JS, aumentare il numero `?v=` nei link delle pagine, così i browser scaricano la versione nuova.
