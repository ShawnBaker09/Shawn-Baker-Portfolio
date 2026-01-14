(function(){
  function createRipple(target, x, y){
    const r = document.createElement('span');
    r.className = 'ripple';
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    r.style.width = r.style.height = size + 'px';
    r.style.left = (x - rect.left - size/2) + 'px';
    r.style.top = (y - rect.top - size/2) + 'px';
    target.appendChild(r);
    requestAnimationFrame(()=> r.classList.add('animate'));
    r.addEventListener('animationend', ()=> r.remove());
  }

  function init(){
    document.addEventListener('click', function(e){
      const btn = e.target.closest && e.target.closest('.copy-btn, .resume-btn.small, .btn, button, a');
      if(!btn) return;
      createRipple(btn, e.clientX, e.clientY);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
