(function(){
  function showBootLog(){
    const log = document.getElementById('boot-log');
    if(!log) return;
    const lines = [
      '[ OK ] Loading modules',
      '[ OK ] Initializing UI',
      '[ OK ] Verifying user',
      '[ OK ] Network check',
      '[ OK ] Initializing database',
      '[ OK ] Scanning local drives',
      '[ OK ] Applying config',
      '[ DONE ] Startup complete'
    ];
    log.setAttribute('aria-hidden','false');
    log.innerHTML = '';
    lines.forEach((text,i)=>{
      const el = document.createElement('div'); el.className='line'; el.textContent = text; log.appendChild(el);
      setTimeout(()=> el.classList.add('visible'), 420 + i*520);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', showBootLog); else showBootLog();
})();
