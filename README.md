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

- Pagine: `/gioco/` (da condividere), `/manutenzione/`, `404.html`, generate da `_build/game_pages.py` (testi delle pagine) tramite `python3 _build/build.py`.
- Motore e testi del gioco: `js/nexgame.js`; stile: `css/nexgame.css`. Il codice del gioco viene inserito dentro le pagine dal build: dopo ogni modifica rilanciare `python3 _build/build.py`.
- Gioco infinito a cicli di 40 giorni; punti solo con tutti i parametri in fascia, maggiorati da precisione e serie; bonus a ogni raccolto.
- "Guarda NEX" rigioca la stessa serra (stesso seme) per gli stessi giorni. Il confronto usa solo grandezze del gioco (giorni, tempo in fascia, correzioni a mano, punti) con la nota "simulazione semplificata".
- Bilanciamento (50 partite simulate per profilo): chi non tocca nulla arriva al giorno ~5, principiante ~42, giocatore medio ~70 (2 cicli), bravo ~120. Costanti in `C` all'inizio di `nexgame.js`.
- Quando si modificano CSS o JS aumentare `CSS_VER` in `game_pages.py` (e `?v=` nel template del sito).
