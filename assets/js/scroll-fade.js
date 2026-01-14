// scroll-fade.js
// Fades an overlay element out as the user scrolls down.
(function(){
  const overlay = document.getElementById('fade-overlay');
  if(!overlay) return;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function update(){
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const scroll = docH > 0 ? window.scrollY / docH : 0;
    // Use an eased opacity so fade is smooth
    const eased = Math.pow(clamp(1 - scroll, 0, 1), 1.25);
    overlay.style.opacity = eased;
    // slight parallax transform
    overlay.style.transform = `translateY(${(1 - eased) * 20}px) scale(${0.98 + eased*0.02})`;
  }

  let ticking = false;
  function onScroll(){ if(!ticking){ requestAnimationFrame(()=>{ update(); ticking=false; }); ticking=true; }}

  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', update);
  // initialize
  update();
})();
