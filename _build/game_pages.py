"""Genera le pagine scure con il gioco NEX: /gioco/, /manutenzione/ e 404.

Chiamato da build.py. Il codice del gioco (js/nexgame.js) viene poi inserito dentro ogni pagina
da build.inline_game(), così non dipende dal caricamento di un file esterno.
"""
import json
import os

BRAND = '''<a class="brand" href="/" aria-label="Neura GrowTech">
      <svg width="20" height="32" viewBox="200 80 795 1315" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M735.0 1375.8C725.4 1373.9 718.6 1370.6 712.6 1364.8C708.2 1360.6 705.6 1357.2 703.3 1352.5C699.9 1345.8 698.6 1340.8 697.3 1329.2C695.1 1310.4 690.2 1294.6 680.8 1276.2C670.9 1257.0 659.8 1241.7 644.0 1226.0C625.6 1207.6 605.3 1192.6 579.0 1177.9C566.8 1171.1 553.9 1165.0 529.0 1154.4C504.0 1143.8 500.9 1142.4 489.0 1137.0C475.4 1130.8 449.0 1117.5 439.8 1112.2C427.1 1104.9 409.5 1093.7 402.0 1088.2C400.5 1087.1 397.1 1084.6 394.5 1082.7C366.7 1062.5 335.5 1032.7 312.0 1003.8C294.4 982.1 276.8 954.6 263.1 927.2C245.1 891.3 231.0 851.8 224.7 820.2C219.8 795.0 217.8 774.4 217.9 746.0C217.9 727.3 218.3 719.4 220.5 701.5C228.6 633.4 258.0 555.6 304.7 478.5C314.6 462.3 337.4 429.1 349.7 413.2C389.5 361.8 430.1 319.2 480.7 275.8C494.0 264.5 531.0 235.2 542.8 226.7C576.7 202.2 591.1 192.5 618.8 175.5C655.7 152.8 673.2 142.9 707.5 125.8C733.9 112.6 754.9 103.2 766.0 99.6C772.5 97.5 783.1 96.9 789.7 98.2C799.2 100.3 808.4 107.4 813.2 116.5C821.0 131.4 819.0 147.7 807.7 161.8C775.7 201.4 762.2 227.2 756.2 260.2C755.4 264.3 755.3 267.9 755.3 279.8C755.3 293.8 755.4 294.5 756.9 303.0C762.1 331.9 775.0 361.8 802.1 407.6C813.6 427.1 828.2 449.6 860.2 497.6C883.7 532.7 891.9 545.6 902.7 563.7C913.9 582.6 914.4 583.4 921.0 595.6C944.1 638.9 956.9 671.9 967.4 715.0C971.0 729.6 974.3 751.0 976.1 770.0C976.9 779.2 976.9 813.6 976.1 823.0C974.4 841.7 970.0 867.0 965.7 883.0C961.5 898.5 954.3 919.9 950.0 929.5C949.0 931.8 946.9 936.4 945.5 939.7C941.0 950.0 931.5 967.7 923.6 980.5C910.2 1002.3 891.5 1026.3 880.3 1036.1C870.3 1044.9 859.5 1049.7 849.2 1049.6C843.1 1049.6 838.6 1048.6 833.0 1045.9C829.6 1044.3 827.9 1043.1 824.7 1039.8C812.8 1027.8 811.3 1010.0 820.7 993.1C823.2 988.7 825.4 985.8 832.5 977.7C837.8 971.6 846.9 960.1 851.1 954.5C873.4 924.2 886.7 893.6 894.4 855.2C898.0 837.7 899.9 813.4 899.0 797.2C898.0 778.5 897.0 769.6 894.2 754.5C885.4 705.9 864.6 655.0 830.6 598.9C815.9 574.7 808.0 562.5 777.5 516.8C751.6 478.1 742.6 464.2 729.6 442.6C697.7 390.2 681.7 347.7 678.5 307.3C676.2 278.5 681.4 248.2 693.0 222.4C694.6 218.7 696.0 215.5 696.0 215.3C696.0 214.6 694.1 215.1 691.5 216.6C690.0 217.4 684.6 220.4 679.5 223.1C648.3 240.1 598.4 273.9 564.0 301.2C529.9 328.4 507.1 348.5 480.5 375.0C452.4 403.0 430.3 428.4 403.8 462.9C391.9 478.5 371.4 508.7 363.4 522.5C349.1 547.1 348.2 548.8 340.0 565.2C331.5 582.3 328.3 589.6 321.9 605.5C304.7 648.2 295.1 688.4 291.9 730.5C291.2 740.1 291.7 765.6 292.7 776.5C296.1 810.2 303.0 839.8 315.1 872.0C318.8 881.8 320.9 886.3 321.5 885.7C321.8 885.4 322.0 864.8 322.1 834.0C322.3 783.8 322.3 782.6 323.4 777.8C325.0 770.5 326.7 765.5 330.0 758.7C336.2 745.8 343.3 737.6 357.0 727.9C360.2 725.6 364.8 722.3 367.2 720.5C369.7 718.7 374.0 715.7 376.8 713.8C399.3 698.2 406.8 690.5 410.7 678.2C412.7 672.0 413.0 668.7 413.0 653.5L413.0 639.2L409.0 635.6C403.7 630.7 400.5 626.4 397.2 619.8C390.4 605.7 389.5 593.6 394.3 578.2C394.8 576.9 395.9 574.2 396.9 572.3C404.8 556.5 419.2 545.7 436.7 542.7C443.3 541.5 453.1 542.0 459.4 543.7C480.9 549.6 496.4 567.9 498.5 589.8C499.3 597.6 498.6 603.3 496.2 610.5C492.8 620.5 488.3 627.5 481.1 633.9C474.3 640.0 469.0 643.1 460.6 646.0L455.2 647.8L454.9 663.3C454.6 679.7 454.2 684.1 452.2 691.2C449.2 702.0 444.2 709.9 434.1 720.1C426.1 728.0 420.2 732.6 395.2 750.3C377.2 763.0 373.1 767.0 368.9 775.5C362.5 788.2 362.5 788.9 362.5 878.7L362.5 949.8L363.9 952.0C368.7 959.4 389.7 983.0 391.5 983.0C391.8 983.0 392.0 980.2 392.0 975.4C392.0 971.2 392.1 953.0 392.2 935.0C392.4 899.3 392.6 897.1 395.5 885.3C398.9 871.7 406.0 859.4 417.1 847.8C421.8 842.8 422.5 842.3 447.0 822.7C456.2 815.4 465.1 808.1 466.7 806.6C470.6 802.8 473.3 798.6 474.6 794.4L475.6 790.9L474.6 784.6C473.3 777.1 473.2 774.1 474.3 767.8C476.8 752.1 484.8 739.2 497.5 730.6C505.1 725.3 511.6 722.7 520.7 721.2C538.3 718.4 555.0 723.9 568.1 737.0C580.8 749.7 585.6 769.8 580.3 788.0C575.9 803.3 563.6 817.5 549.3 824.0C538.9 828.7 525.4 830.0 514.2 827.3C512.6 826.9 510.7 826.5 510.1 826.5C509.4 826.5 505.7 829.2 500.1 833.6C489.7 842.0 485.9 844.9 467.2 858.8C459.6 864.5 452.2 870.0 450.8 870.9C445.9 874.6 440.4 882.7 437.8 890.0C432.9 903.7 431.9 919.4 432.1 976.6L432.2 1016.4L433.5 1017.7C437.2 1021.7 458.5 1036.5 472.5 1044.7C477.0 1047.4 481.8 1050.2 483.0 1051.0C486.4 1053.1 504.2 1062.6 509.1 1065.0C511.6 1066.3 513.7 1067.0 514.2 1066.8C514.9 1066.6 515.0 1063.0 515.0 1026.0L515.0 985.4L509.6 980.1C501.8 972.4 497.7 965.6 495.3 956.4C492.6 946.3 492.6 937.6 495.3 927.5C497.7 918.2 503.9 907.9 510.6 901.7C514.3 898.4 520.8 894.0 524.3 892.5C541.0 885.2 556.5 885.2 571.8 892.7C577.2 895.4 584.3 900.3 587.3 903.6C589.7 906.1 594.4 912.9 596.0 916.0C598.9 921.7 601.5 933.0 601.5 939.9C601.5 943.3 600.1 951.0 598.6 955.8C593.9 970.7 581.2 984.8 567.2 990.3L563.2 991.9L563.1 1040.7L563.0 1089.6L565.6 1090.7C567.1 1091.4 574.2 1094.4 581.4 1097.5C613.3 1111.0 628.4 1118.4 649.0 1130.4C681.5 1149.4 709.4 1173.2 729.5 1199.2C740.0 1212.7 744.4 1219.0 752.8 1233.0C776.9 1272.5 791.1 1319.3 785.7 1341.4C784.1 1348.4 780.2 1355.8 775.0 1361.6C770.0 1367.3 760.5 1373.0 752.8 1375.0C747.7 1376.3 739.4 1376.7 735.0 1375.8ZM554.3 956.3C557.9 954.7 561.2 951.5 562.9 948.1C564.0 945.7 564.2 944.6 564.2 941.0C564.2 937.4 564.1 936.3 562.8 933.9C561.1 930.4 557.3 926.9 553.6 925.5C551.8 924.8 549.7 924.5 547.1 924.5C543.7 924.5 542.7 924.7 540.1 926.0C536.2 928.0 532.4 932.1 531.2 935.6C530.0 939.3 530.4 945.4 532.1 948.8C534.3 953.0 538.9 956.5 543.7 957.5C546.7 958.1 551.4 957.6 554.3 956.3ZM535.3 789.6C539.4 787.6 541.7 785.5 543.5 781.8C545.6 777.5 545.9 774.1 544.6 769.6C542.6 763.3 538.6 759.4 532.0 757.7C528.1 756.7 524.2 757.3 519.9 759.6C508.3 765.7 508.0 782.7 519.3 788.9C524.8 791.9 529.9 792.1 535.3 789.6ZM452.3 610.8C460.1 607.2 463.9 598.3 461.3 589.9C457.6 578.2 442.1 574.4 432.9 583.0C428.2 587.3 426.2 595.6 428.5 601.6C430.3 606.3 434.3 610.2 439.2 611.8C442.5 612.9 448.8 612.4 452.3 610.8Z"/></svg>
      NEURA GROWTECH
    </a>'''

CSS_VER = "22"

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
