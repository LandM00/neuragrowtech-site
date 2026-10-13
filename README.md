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

- Pagine: `/gioco/` (da condividere), `/manutenzione/`, `404.html`, generate da `_build/game_pages.py` tramite `python3 _build/build.py`.
- Motore, testi e grafica: `js/nexgame.js`; stile minimale: `css/nexgame.css`. Il codice del gioco viene inserito dentro le pagine dal build: dopo ogni modifica rilanciare `python3 _build/build.py` e aumentare `CSS_VER` in `game_pages.py`.
- Serra in stile minimale: sole e luna sull'arco fanno da orologio; di notte la scena si scurisce con una dissolvenza (i manometri restano chiari).
- LED supplementari accesi solo nel fotoperiodo 06–22 quando manca il sole (nuvole o dopo il tramonto).
- Imprevisti legati all'ora: di giorno sole, nuvole, caldo, rabbocco, acqua alcalina; di notte rabbocco, acqua alcalina, umidità notturna.
- Gioco infinito a cicli di 28 giorni; giornate da 10 s all'inizio che scendono a 7 s; difficoltà in funzione del tempo di gioco.
- Bilanciamento (50 partite simulate per profilo, giorno raggiunto in mediana): fermo ~4, principiante ~19, medio ~27, bravo ~43.
- "Guarda NEX" rigioca la stessa serra (stesso seme) per gli stessi giorni; il confronto usa solo grandezze del gioco con la nota "simulazione semplificata".
