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

  // suggest English to visitors whose browser is not in Italian (no automatic redirect)
  var hint=document.getElementById('lang-hint');
  if(hint){
    var langs=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'it']).join(',').toLowerCase();
    var saved=read('ngt-lang');
    if(saved==='en'){location.replace('/en/'+location.hash);return;}
    if(!saved && langs.indexOf('it')!==0 && !/(^|,)it/.test(langs)){hint.hidden=false;}
    hint.querySelector('.lang-hint-close').addEventListener('click',function(){hint.hidden=true;store('ngt-lang','it');});
  }
})();
