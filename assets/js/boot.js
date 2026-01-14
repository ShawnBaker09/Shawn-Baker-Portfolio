(function(){
  function isMobile(){return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)}
  function showBoot(){
    const overlay = document.createElement('div');
    overlay.id='boot-overlay';
    overlay.style.position='fixed';overlay.style.left=0;overlay.style.top=0;overlay.style.right=0;overlay.style.bottom=0;
    overlay.style.background='linear-gradient(180deg,#071018,#041018)';overlay.style.zIndex=100000;overlay.style.display='flex';overlay.style.alignItems='center';overlay.style.justifyContent='center';
    overlay.innerHTML = '<div style="color:#9fd9cf;font-family:sans-serif;font-size:18px;text-align:center">Initializing modules...<br>Loading portfolio...<br><strong style="color:#fff">Access granted.</strong></div>';
    document.body.appendChild(overlay);
    setTimeout(()=>{ overlay.style.transition='opacity .35s'; overlay.style.opacity='0'; setTimeout(()=>overlay.remove(),400); }, 800);
  }
  function init(){
    try{
      if(isMobile()) return; // skip on mobile
      if(!localStorage) return;
      if(!localStorage.getItem('portfolio_booted')){
        showBoot();
        localStorage.setItem('portfolio_booted','1');
      }
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
