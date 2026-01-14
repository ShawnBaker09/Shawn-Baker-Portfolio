(function(){
  function onScroll(){
    const d = document.documentElement;
    const y = (d.scrollTop||document.body.scrollTop);
    const h = d.scrollHeight - d.clientHeight;
    const pct = h>0? Math.min(100, Math.round((y/h)*10000)/100) : 0;
    const el = document.getElementById('scroll-progress');
    if(el) el.style.width = pct + '%';
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  if(document.readyState!=='loading') onScroll();
})();
