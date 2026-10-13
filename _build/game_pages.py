"""Genera le pagine scure con il gioco NEX: /gioco/, /manutenzione/ e 404.

Chiamato da build.py. Il codice del gioco (js/nexgame.js) viene poi inserito dentro ogni pagina
da build.inline_game(), così non dipende dal caricamento di un file esterno.
"""
import json
import os

BRAND = '''<a class="brand" href="/" aria-label="Neura GrowTech">
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="11" fill="none" stroke="currentColor" stroke-width="2"/><path d="M13 21V11c0-3 2-5 5-5 0 3-2 5-5 5M13 15c0-2.5-1.8-4-4.5-4 0 2.5 1.8 4 4.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="21.5" cy="7" r="2.2" fill="var(--accent)"/></svg>
      NEURA GROWTECH
    </a>'''

CSS_VER = "20"

PAGES = {
    "gioco/index.html": {
        "robots": "index",
        "canonical": "https://neuragrowtech.com/gioco/",
        "texts": {
            "it": {"doc": "Il gioco di NEX", "eyebrow": "Il gioco di NEX", "title": "Riesci a fare il lavoro di NEX?",
                   "body": "Una serra in miniatura: tieni EC, pH e VPD nella fascia giusta mentre sole, rabbocchi e notte cambiano le carte in tavola. NEX lo fa da solo, ogni giorno, nelle serre vere.",
                   "home": "Scopri NEX", "home_href": "/"},
            "en": {"doc": "The NEX game", "eyebrow": "The NEX game", "title": "Can you do NEX’s job?",
                   "body": "A greenhouse in miniature: keep EC, pH and VPD in the right range while sun, top-ups and night keep changing the game. NEX does it on its own, every day, in real greenhouses.",
                   "home": "Discover NEX", "home_href": "/en/"},
            "es": {"doc": "El juego de NEX", "eyebrow": "El juego de NEX", "title": "¿Puedes hacer el trabajo de NEX?",
                   "body": "Un invernadero en miniatura: mantén la CE, el pH y el DPV en el rango adecuado mientras el sol, los rellenos y la noche cambian las reglas. NEX lo hace solo, cada día, en invernaderos reales.",
                   "home": "Descubre NEX", "home_href": "/es/"},
        },
        "copy": '''      <span class="eyebrow" data-t="eyebrow"></span>
      <h1 data-t="title"></h1>
      <p data-t="body"></p>
      <div class="mt-actions"><a class="btn" href="/" data-href="home_href" data-t="home"></a></div>''',
    },
    "manutenzione/index.html": {
        "robots": "noindex",
        "texts": {
            "it": {"doc": "Sito in aggiornamento", "eyebrow": "Sito in aggiornamento", "title": "Torniamo online a breve.",
                   "body": "Stiamo aggiornando il sito di Neura GrowTech. Nel frattempo, prova a fare il lavoro di NEX.", "contact": "Per qualsiasi richiesta:"},
            "en": {"doc": "Website update in progress", "eyebrow": "Website update in progress", "title": "We will be back online shortly.",
                   "body": "We are updating the Neura GrowTech website. In the meantime, try doing NEX’s job.", "contact": "For any enquiry:"},
            "es": {"doc": "Web en actualización", "eyebrow": "Web en actualización", "title": "Volvemos a estar en línea en breve.",
                   "body": "Estamos actualizando la web de Neura GrowTech. Mientras tanto, prueba a hacer el trabajo de NEX.", "contact": "Para cualquier consulta:"},
        },
        "copy": '''      <span class="eyebrow" data-t="eyebrow"></span>
      <h1 data-t="title"></h1>
      <p data-t="body"></p>
      <p><span data-t="contact"></span> <a class="mt-mail" href="mailto:info@neuragrowtech.com">info@neuragrowtech.com</a></p>''',
    },
    "404.html": {
        "robots": "noindex",
        "texts": {
            "it": {"doc": "Pagina non trovata", "eyebrow": "Errore 404", "title": "Questa pagina non esiste.",
                   "body": "Il link potrebbe essere sbagliato o la pagina è stata spostata. Torna alla home, oppure prova a fare il lavoro di NEX.",
                   "home": "Torna alla home", "home_href": "/"},
            "en": {"doc": "Page not found", "eyebrow": "Error 404", "title": "This page does not exist.",
                   "body": "The link may be wrong or the page has moved. Go back to the home page, or try doing NEX’s job.",
                   "home": "Back to home", "home_href": "/en/"},
            "es": {"doc": "Página no encontrada", "eyebrow": "Error 404", "title": "Esta página no existe.",
                   "body": "Puede que el enlace sea incorrecto o que la página se haya movido. Vuelve al inicio o prueba a hacer el trabajo de NEX.",
                   "home": "Volver al inicio", "home_href": "/es/"},
        },
        "copy": '''      <span class="eyebrow" data-t="eyebrow"></span>
      <h1 data-t="title"></h1>
      <p data-t="body"></p>
      <div class="mt-actions"><a class="btn" href="/" data-href="home_href" data-t="home"></a></div>''',
    },
}


def render(spec):
    it = spec["texts"]["it"]
    copy = spec["copy"]
    for k, v in it.items():  # testi italiani già nell'HTML: la pagina si legge anche senza JavaScript
        copy = copy.replace(f'data-t="{k}"></', f'data-t="{k}">{v}</')
    canonical = f'\n<link rel="canonical" href="{spec["canonical"]}">' if spec.get("canonical") else ""
    texts = json.dumps(spec["texts"], ensure_ascii=False)
    return f'''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Neura GrowTech · {it["doc"]}</title>
<meta name="robots" content="{spec["robots"]}">{canonical}
<meta name="theme-color" content="#F4F4F1">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/css/style.css?v={CSS_VER}">
<link rel="stylesheet" href="/css/nexgame.css?v={CSS_VER}">
</head>
<body class="mt-page">
<main class="wrap mt">
  <div class="mt-top">
    {BRAND}
    <div class="lang" role="group" aria-label="Lingua / Language / Idioma">
      <button type="button" data-lang="it" lang="it">IT</button><button type="button" data-lang="en" lang="en">EN</button><button type="button" data-lang="es" lang="es">ES</button>
    </div>
  </div>
  <div class="mt-grid">
    <div class="mt-copy">
{copy}
    </div>
    <div id="nexgame"></div>
  </div>
</main>
<script data-cfasync="false" src="/js/nexgame.js?v={CSS_VER}"></script>
<script data-cfasync="false">
(function(){{
  var T={texts};
  function store(k,v){{try{{localStorage.setItem(k,v)}}catch(e){{}}}}
  function read(k){{try{{return localStorage.getItem(k)}}catch(e){{return null}}}}
  var lang=read('ngt-lang');
  if(!T[lang]){{lang='en';var ls=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'it']);for(var i=0;i<ls.length;i++){{var c=String(ls[i]).toLowerCase().slice(0,2);if(T[c]){{lang=c;break;}}}}}}
  var game={{setLang:function(){{}}}};
  var box=document.getElementById('nexgame');
  try{{game=NexGame.mount(box,lang,{{shareUrl:'https://neuragrowtech.com/gioco/'}});}}catch(e){{
    box.innerHTML='<p style="font-family:monospace;font-size:.8rem;color:#F590BD;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:1rem"></p>';
    box.firstChild.textContent='Il gioco non è partito: '+(e&&e.message?e.message:e)+' · '+navigator.userAgent;
  }}
  function setLang(l){{
    lang=l;document.documentElement.lang=l;var t=T[l];
    document.querySelectorAll('[data-t]').forEach(function(el){{el.textContent=t[el.getAttribute('data-t')];}});
    document.querySelectorAll('[data-href]').forEach(function(el){{el.setAttribute('href',t[el.getAttribute('data-href')]);}});
    document.querySelectorAll('.lang button').forEach(function(b){{b.setAttribute('aria-pressed',b.dataset.lang===l?'true':'false');}});
    document.title='Neura GrowTech · '+t.doc;
    game.setLang(l);
  }}
  document.querySelectorAll('.lang button').forEach(function(b){{b.addEventListener('click',function(){{store('ngt-lang',b.dataset.lang);setLang(b.dataset.lang);}});}});
  setLang(lang);
}})();
</script>
</body>
</html>
'''


def build_pages(root):
    for rel, spec in PAGES.items():
        path = os.path.join(root, rel)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        open(path, "w", encoding="utf-8").write(render(spec))
        print("scritto", rel)
    return list(PAGES.keys())
