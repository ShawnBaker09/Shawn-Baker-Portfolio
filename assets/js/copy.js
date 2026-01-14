(function(){
  function showToast(msg){
    const t = document.getElementById('toast');
    if(!t) return;
    t.textContent = '✔ ' + msg;
    t.classList.add('show');
    t.setAttribute('aria-hidden','false');
    clearTimeout(t._hide);
    t._hide = setTimeout(()=>{t.classList.remove('show');t.setAttribute('aria-hidden','true')},1800);
  }

  function init(){
    document.addEventListener('click', (e)=>{
      const btn = e.target.closest && e.target.closest('.copy-btn');
      if(!btn) return;
      const txt = btn.getAttribute('data-copy') || '';
      if(!txt) return;
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(txt).then(()=> showToast('Copied')) .catch(()=> showToast('Copy failed'));
      } else {
        // fallback
        const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); showToast('Copied'); }catch(e){ showToast('Copy failed'); }
        ta.remove();
      }
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
