(function(){
  // NEX console: cycle perception -> decision -> action
  var stages=[].slice.call(document.querySelectorAll('.stage'));
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i=0;
  function show(){stages.forEach(function(s,k){s.classList.toggle('on',k===i)});}
  if(stages.length){show();if(!reduce){setInterval(function(){i=(i+1)%stages.length;show();},2200);}}

  // copy buttons
  document.querySelectorAll('.copy').forEach(function(b){
    var label=b.textContent, doneLabel=b.getAttribute('data-done')||'✓';
    b.addEventListener('click',function(){
      var t=b.getAttribute('data-copy');
      function done(){b.textContent=doneLabel;setTimeout(function(){b.textContent=label},1600);}
      function sel(){var r=document.createRange();r.selectNodeContents(b.parentNode.querySelector('.addr'));var s=getSelection();s.removeAllRanges();s.addRange(r);}
      try{navigator.clipboard.writeText(t).then(done,sel);}catch(e){sel();}
    });
  });

  // remember language choice
  function store(k,v){try{localStorage.setItem(k,v)}catch(e){}}
  function read(k){try{return localStorage.getItem(k)}catch(e){return null}}
  document.querySelectorAll('.lang a, .lang-hint a').forEach(function(a){
    a.addEventListener('click',function(){store('ngt-lang',a.getAttribute('hreflang'))});
  });

  // suggest the visitor's language on the Italian home (no automatic redirect)
  var hint=document.getElementById('lang-hint');
  if(hint){
    var paths={en:'/en/',es:'/es/'};
    var saved=read('ngt-lang');
    if(saved&&paths[saved]){location.replace(paths[saved]+location.hash);return;}
    var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'it']).map(function(l){return String(l).toLowerCase().slice(0,2)});
    if(!saved && langs.indexOf('it')===-1){
      var pick=langs.indexOf('es')!==-1&&(langs.indexOf('en')===-1||langs.indexOf('es')<langs.indexOf('en'))?'es':'en';
      var box=hint.querySelector('[data-hint="'+pick+'"]');
      if(box){box.hidden=false;hint.hidden=false;}
    }
    hint.querySelectorAll('.lang-hint-close').forEach(function(btn){
      btn.addEventListener('click',function(){hint.hidden=true;store('ngt-lang','it');});
    });
  }
})();
