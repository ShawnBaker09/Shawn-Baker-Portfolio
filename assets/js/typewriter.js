(function(){
  const lines = [
    {text: 'Shawn Baker', pause: 600},
    {text: 'IT Student | Developer | Tech Enthusiast', pause: 0}
  ];

  function type(el, str, speed=60){
    return new Promise((resolve)=>{
      let i=0;
      const t = setInterval(()=>{
        el.textContent = str.slice(0,i+1);
        i++;
        if(i>=str.length){
          clearInterval(t);
          resolve();
        }
      }, speed);
    });
  }

  async function run(){
    const l1 = document.getElementById('type-line-1');
    const l2 = document.getElementById('type-line-2');
    const cursor = document.getElementById('type-cursor');
    if(!l1||!l2) return;
    for(let i=0;i<lines.length;i++){
      if(cursor) cursor.style.opacity = '1';
      await type(i===0?l1:l2, lines[i].text, i===0?80:40);
      await new Promise(r=>setTimeout(r, lines[i].pause));
    }
    // keep cursor blinking like a terminal
    if(cursor) cursor.classList.add('blink');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
