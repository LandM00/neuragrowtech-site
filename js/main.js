(function(){
  var stages=[].slice.call(document.querySelectorAll('.stage'));
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i=0;
  function show(){stages.forEach(function(s,k){s.classList.toggle('on',k===i)});}
  show();
  if(!reduce){setInterval(function(){i=(i+1)%stages.length;show();},2200);}
  document.querySelectorAll('.copy').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.getAttribute('data-copy');
      function done(){b.textContent='Copiato';setTimeout(function(){b.textContent='Copia'},1600);}
      function sel(){var r=document.createRange();r.selectNodeContents(b.parentNode.querySelector('.addr'));var s=getSelection();s.removeAllRanges();s.addRange(r);}
      try{navigator.clipboard.writeText(t).then(done,sel);}catch(e){sel();}
    });
  });
})();
