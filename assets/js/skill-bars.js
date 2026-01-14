(function(){
  const selector = '.skill-fill';
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const v = parseInt(el.getAttribute('data-value')||0,10);
        el.style.width = v+'%';
        io.unobserve(el);
      }
    });
  }, {root:null,rootMargin:'0px 0px -8% 0px',threshold:0.12});

  function init(){
    document.querySelectorAll(selector).forEach(el=>io.observe(el));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
