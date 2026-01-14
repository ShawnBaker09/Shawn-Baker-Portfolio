(function(){/* Made by Bubbabaker2009 */})();
// Lightweight interactive terminal for the portfolio page
(function(){
  const PROMPT = 'shawn@portfolio:~$ ';

  function $(sel, root=document){ return root.querySelector(sel); }
  function create(tag, attrs={}, parent=document.body){ const el = document.createElement(tag); for(const k in attrs) if(k==='html') el.innerHTML = attrs[k]; else el.setAttribute(k, attrs[k]); parent.appendChild(el); return el; }

  function typeOut(text, container, speed=18){
    return new Promise(resolve=>{
      let i=0; const step = ()=>{
        if(i<text.length){ container.append(text.charAt(i++)); container.parentElement.scrollTop = container.parentElement.scrollHeight; setTimeout(step, speed); }
        else resolve();
      }; step();
    });
  }

  function ensureTerminal(){
    if($('#cmd-terminal')) return;

    const panel = create('div',{id:'cmd-terminal','aria-live':'polite'});
    panel.setAttribute('role','region');
    panel.setAttribute('aria-label','Interactive terminal');
    panel.style.cssText = 'position:fixed;right:18px;bottom:18px;width:520px;max-width:calc(100% - 48px);height:320px;background:rgba(6,10,14,0.92);border:1px solid rgba(33,178,166,0.08);box-shadow:0 18px 48px rgba(0,0,0,0.6);border-radius:8px;overflow:hidden;z-index:99999;font-family:monospace;color:#d8fff6;display:flex;flex-direction:column;font-size:13px';

    const header = create('div',{html:'<strong style="color:var(--accent,#21b2a6)">shawn@portfolio</strong> <span style="opacity:.6;margin-left:.6rem">cmd</span>'}, panel);
    header.style.cssText = 'padding:.55rem .75rem;border-bottom:1px solid rgba(255,255,255,0.03);background:linear-gradient(180deg,rgba(255,255,255,0.01),transparent);font-weight:700';

    const out = create('div',{id:'cmd-output','aria-atomic':'false'}, panel);
    out.setAttribute('role','log');
    out.style.cssText = 'flex:1;padding:.75rem;overflow:auto;line-height:1.45';

    const inputRow = create('div',{id:'cmd-input-row'}, panel);
    inputRow.style.cssText = 'padding:.5rem .75rem;border-top:1px solid rgba(255,255,255,0.02);display:flex;align-items:center;gap:.5rem;background:linear-gradient(0deg,rgba(255,255,255,0.01),transparent)';

    const prompt = create('div',{id:'cmd-prompt',html:PROMPT}, inputRow);
    prompt.style.cssText = 'white-space:pre;color:rgba(180,255,240,0.95)';

    const input = create('div',{id:'cmd-input',tabindex:0,'aria-label':'Terminal input'} , inputRow);
    input.setAttribute('role','textbox');
    input.setAttribute('aria-multiline','true');
    input.contentEditable = 'true';
    input.style.cssText = 'outline:none;flex:1;min-height:18px;color:#d8fff6;caret-color:var(--accent,#21b2a6)';

    // focus behavior
    input.addEventListener('focus', ()=> input.classList.add('focus'));
    input.addEventListener('blur', ()=> input.classList.remove('focus'));

    // better announce when output is appended for screen readers
    const liveAnnouncer = document.createElement('div');
    liveAnnouncer.setAttribute('aria-live','polite'); liveAnnouncer.style.position='absolute'; liveAnnouncer.style.width='1px'; liveAnnouncer.style.height='1px'; liveAnnouncer.style.overflow='hidden'; liveAnnouncer.style.clip='rect(1px, 1px, 1px, 1px)'; panel.appendChild(liveAnnouncer);

    // small helper to push a line into output
    function pushOutput(html){
      const line = document.createElement('div'); line.className='cmd-line'; line.innerHTML = html; out.appendChild(line); out.scrollTop = out.scrollHeight; return line;
    }

    // expose for command handling
    panel._out = out; panel._input = input; panel._push = pushOutput;
  }

  function initTerminal(){
    ensureTerminal();
    const panel = $('#cmd-terminal');
    const out = $('#cmd-output');
    const input = $('#cmd-input');

    let history = []; let histIndex = -1;
    let _unsavedBuffer = '';

    function scrollBottom(){ out.scrollTop = out.scrollHeight; }

    async function runCommand(raw){
      const cmd = raw.trim();
      if(!cmd) return;
      history.push(cmd); histIndex = history.length;

      // echo the command
      const echo = document.createElement('div'); echo.innerHTML = '<span style="opacity:.6">'+PROMPT+'</span>'+escapeHtml(cmd); out.appendChild(echo); scrollBottom();

      const args = cmd.split(/\s+/);
      const name = args[0].toLowerCase();

      const printer = async (text, speed=8)=>{
        const lines = String(text).split('\n');
        for(let li=0; li<lines.length; li++){
          const el = document.createElement('div'); out.appendChild(el);
          await typeOut(lines[li], el, speed);
          scrollBottom();
          if(li < lines.length - 1) await new Promise(r => setTimeout(r, 120));
        }
      };

      switch(name){
        case 'help':
          await printer('Available commands: help, status, contact, socials, certs, resume, clear, about, echo');
          break;
        case 'status':
          await printer('System: ONLINE\nUptime: ~2 days\nLast updated: 2026\nLocation: PA, USA');
          break;
        case 'contact':
          await printer('Email: Bubbabaker2009@gmail.com\nPhone: 814-483-9612');
          break;
        case 'socials':{
          const cards = document.querySelectorAll('.social-deck .s-card[data-name][data-url]');
          if(!cards.length) { await printer('No social links found on the page.'); break; }
          for(const c of cards){ await printer((c.dataset.name||'link')+': '+(c.dataset.url||'(no url)')); }
          break; }
        case 'certs':{
          const certs = Array.from(document.querySelectorAll('.cert a'));
          if(!certs.length){ await printer('No certifications found.'); break; }
          for(const a of certs.slice(0,12)){
            const title = (a.querySelector('h3') && a.querySelector('h3').textContent.trim()) || a.getAttribute('title') || a.href.split('/').pop();
            await printer(title, 6);
          }
          break; }
        case 'resume':
          await printer('Resume: ' + (document.querySelector('.resume-btn')?.href || 'assets/resume.pdf')); break;
        case 'about':
          await printer('Shawn Baker — IT Student, Developer, Tech Enthusiast. See the About section for details.'); break;
        case 'clear': out.innerHTML=''; break;
        case 'echo': await printer(args.slice(1).join(' ')); break;
        default:
          await printer('Command not found: '+name+' (type "help" for available commands)');
      }
    }

    // escape helper
    function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

    // key handling with history
    input.addEventListener('keydown', async (ev)=>{
      if(ev.key === 'Enter'){
        ev.preventDefault();
        const txt = input.textContent || '';
        input.textContent = '';
        // reset history cursor to end after executing
        histIndex = history.length;
        _unsavedBuffer = '';
        await runCommand(txt);
      } else if(ev.key === 'ArrowUp'){
        ev.preventDefault();
        if(!history.length) return;
        // save current buffer the first time user presses up
        if(histIndex === history.length) _unsavedBuffer = input.textContent || '';
        histIndex = Math.max(0, histIndex - 1);
        input.textContent = history[histIndex] || '';
        placeCaretAtEnd(input);
      } else if(ev.key === 'ArrowDown'){
        ev.preventDefault();
        if(!history.length) return;
        // move forward in history; if we advance past last, restore unsaved buffer
        if(histIndex < history.length - 1){
          histIndex = Math.min(history.length - 1, histIndex + 1);
          input.textContent = history[histIndex] || '';
        } else {
          histIndex = history.length;
          input.textContent = _unsavedBuffer || '';
        }
        placeCaretAtEnd(input);
      } else if(ev.key === 'Tab'){
        ev.preventDefault();
        // simple autocomplete for command names
        const commands = ['help','status','contact','socials','certs','resume','clear','about','echo'];
        const raw = (input.textContent || '').replace(/\u00A0/g,' ');
        const parts = raw.trimStart().split(/\s+/);
        const first = parts[0] || '';
        if(first.length === 0) return;
        const lower = first.toLowerCase();
        const matches = commands.filter(c => c.indexOf(lower) === 0);
        if(matches.length === 1){
          input.textContent = matches[0] + ' ' + (parts.slice(1).join(' ') || '');
          placeCaretAtEnd(input);
        } else if(matches.length > 1){
          // compute common prefix
          function commonPrefix(a,b){ let i=0; while(i<a.length && i<b.length && a[i]===b[i]) i++; return a.slice(0,i); }
          const cp = matches.reduce((a,b)=>commonPrefix(a,b));
          if(cp.length > lower.length){ input.textContent = cp; placeCaretAtEnd(input); }
        }
        return;
      }
    });

    // helper to move caret
    function placeCaretAtEnd(el){ el.focus(); const range = document.createRange(); range.selectNodeContents(el); range.collapse(false); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range); }

    // make terminal focusable from anywhere by pressing ` (backtick)
    window.addEventListener('keydown', (e)=>{
      if(e.key === '`' && !e.metaKey && !e.ctrlKey){ e.preventDefault(); input.focus(); }
    });

    // initial greeting
    const greeting = 'Welcome to Shawn Baker\'s interactive terminal. Type "help" for commands.';
    const introLine = document.createElement('div'); out.appendChild(introLine); typeOut(greeting, introLine, 12);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initTerminal); else initTerminal();

})();
