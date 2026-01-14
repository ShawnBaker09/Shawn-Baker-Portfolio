// social-deck.js
document.addEventListener('DOMContentLoaded', function(){
  const deck = document.getElementById('social-deck');
  if(!deck) return;
  const cards = Array.from(deck.querySelectorAll('.s-card'));
  const n = cards.length;

  // Place cards side-by-side and slightly overlapped like a deck of cards
  function posAll(){
    const gap = Math.max(60, Math.round(deck.offsetWidth / (n * 2.6))); // bigger overlap gap so cards are larger and spaced
    const start = -Math.round(((n - 1) * gap) / 2);
    const y = 0; // center line
    for(let i=0;i<n;i++){
      const x = start + i * gap;
      cards[i].style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      cards[i].style.zIndex = 10 + i; // stack order
      cards[i].classList.remove('active');
    }
  }

  // initial layout
  posAll();

  function spreadOn(index){
    const expanded = Math.max(180, Math.round(deck.offsetWidth / (n * 1.0))); // bigger spread for larger cards
    const center = 0;
    for(let j=0;j<n;j++){
      const offsetIndex = j - index;
      const x = center + offsetIndex * expanded;
      // slightly fan vertically for visibility
      const y = Math.sign(offsetIndex) * Math.min(40, Math.abs(offsetIndex) * 10);
      cards[j].style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      cards[j].style.zIndex = (j===index) ? 600 : 200 - Math.abs(offsetIndex);
      if(j===index) cards[j].classList.add('active'); else cards[j].classList.remove('active');
    }
  }

  function resetAll(){ posAll(); }

  cards.forEach((card, idx)=>{
    card.addEventListener('mouseenter', ()=>{ spreadOn(idx); });
    card.addEventListener('focus', ()=>{ spreadOn(idx); });
    card.addEventListener('touchstart', (e)=>{ e.preventDefault(); spreadOn(idx); });
    card.addEventListener('click', ()=>{ const url = card.getAttribute('data-url'); const name = card.getAttribute('data-name') || ''; if(url){ window.open(url, '_blank'); } else { window.open('#'+name.toLowerCase(), '_blank'); } });
  });

  deck.addEventListener('mouseleave', ()=>{ resetAll(); });
  window.addEventListener('resize', ()=>{ posAll(Math.max(60, Math.round(deck.offsetWidth/6))); });
});
