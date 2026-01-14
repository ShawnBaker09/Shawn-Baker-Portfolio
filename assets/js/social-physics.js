/* Made by Bubbabaker2009 */
(function(){
  function init(){
    const deck = document.getElementById('social-deck');
    if(!deck) return;
    const cards = Array.from(deck.querySelectorAll('.s-card'));
    // compute centers for cards
    function onMove(e){
      const rect = deck.getBoundingClientRect();
      const mx = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left - rect.width/2;
      const my = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top - rect.height/2;
      const nx = mx / (rect.width/2);
      const ny = my / (rect.height/2);
      cards.forEach((c, i)=>{
        const tilt = nx * (5 + i*0.3); // small per-card variance
        const ty = ny * 6;
        c.style.setProperty('--tilt', tilt + 'deg');
        c.style.setProperty('--ty', ty + 'px');
      });
    }

    function onLeave(){
      cards.forEach(c=>{
        c.style.setProperty('--tilt','0deg');
        c.style.setProperty('--ty','0px');
      });
    }

    deck.addEventListener('mousemove', onMove);
    deck.addEventListener('touchmove', onMove, {passive:true});
    deck.addEventListener('mouseleave', onLeave);
    deck.addEventListener('touchend', onLeave);

    // hover repel
    cards.forEach(c=>{
      c.addEventListener('mouseenter', (ev)=>{
        c.classList.add('hovering');
      });
      c.addEventListener('mouseleave', ()=> c.classList.remove('hovering'));
      // mobile tap to fan
      c.addEventListener('click', (e)=>{
        if(window.matchMedia('(hover: none)').matches){
          deck.classList.toggle('fanned');
          // when fanned, set transforms to spread by index
          if(deck.classList.contains('fanned')){
            cards.forEach((card, idx)=>{
              const x = (idx - (cards.length-1)/2) * 110;
              const r = (idx - (cards.length-1)/2) * 3;
              card.style.setProperty('--base-transform', `translate(-50%,-50%) translateX(${x}px) rotate(${r}deg)`);
            });
          } else {
            cards.forEach(card=> card.style.removeProperty('--base-transform'));
          }
        }
      });
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
