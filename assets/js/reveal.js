(function(){/* Made by Bubbabaker2009 */})();
// Simple scroll reveal: adds .active to elements with .reveal when they enter viewport
(function(){
  if(typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onIntersect(entries, obs){
    entries.forEach(entry=>{
      const el = entry.target;
      if(entry.isIntersecting){
        // optional per-element delay
        const delay = el.dataset.delay || el.getAttribute('data-delay') || '0s';
        el.style.setProperty('--delay', delay);
        el.classList.add('active');
        if(!el.dataset.persistent) obs.unobserve(el);
      }
    });
  }

  function init(){
    if(prefersReduced){
      document.querySelectorAll('.reveal').forEach(el=>el.classList.add('active'));
      return;
    }

    const io = new IntersectionObserver(onIntersect, {root:null, rootMargin:'0px 0px -8% 0px', threshold:0.12});
    document.querySelectorAll('.reveal').forEach((el, i)=>{
      // stagger reveals if not explicitly delayed
      if(!el.dataset.delay) el.style.setProperty('--delay', (i*70)+'ms');
      io.observe(el);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

})();
(function(){
  // Reveal on scroll with slight stagger per item
  const opts = {root:null,rootMargin:'0px 0px -8% 0px',threshold:0.08};
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      const el = entry.target;
      if(entry.isIntersecting){
        const delay = el.datasetRevealDelay || el.getAttribute('data-delay') || 0;
        // small stagger using CSS variable
        el.style.setProperty('--delay', delay+'s');
        requestAnimationFrame(()=> el.classList.add('active'));
        // once shown, unobserve to avoid re-triggering
        io.unobserve(el);
      }
    });
  }, opts);

  function init(){
    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach((el,i)=>{
      // set incremental delays for siblings when not present
      if(!el.getAttribute('data-delay')){
        el.setAttribute('data-delay', (i*0.06).toFixed(2));
      }
      el.datasetRevealDelay = el.getAttribute('data-delay');
      io.observe(el);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
