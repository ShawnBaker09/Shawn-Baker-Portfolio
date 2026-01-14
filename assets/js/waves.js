(function(){/* Made by Bubbabaker2009 */})();
// Inject SVG wave separators between major sections and animate them subtly
(function(){
  function waveSVG(id){
    return '<svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
      + '<defs><linearGradient id="g-'+id+'" x1="0" x2="1"><stop offset="0" stop-color="#9b6bff" stop-opacity="0.06"/><stop offset="1" stop-color="#00f5d4" stop-opacity="0.06"/></linearGradient></defs>'
      + '<path class="wave-fill wave-anim" fill="url(#g-'+id+')" d="M0,160 C320,220 480,100 720,128 C960,156 1120,260 1440,200 L1440,320 L0,320 Z"></path></svg>';
  }

  function insertWaves(){
    const sections = Array.from(document.querySelectorAll('section'));
    for(let i=0;i<sections.length-1;i++){
      const s = sections[i];
      // skip if separator already present
      if(s.nextElementSibling && s.nextElementSibling.classList && s.nextElementSibling.classList.contains('section-wave')) continue;
      const wrap = document.createElement('div'); wrap.className = 'section-wave'; wrap.setAttribute('data-parallax','true');
      wrap.innerHTML = waveSVG(i);
      s.parentNode.insertBefore(wrap, s.nextElementSibling);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', insertWaves); else insertWaves();
})();
