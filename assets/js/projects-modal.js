document.addEventListener('DOMContentLoaded', function(){
  const exe = document.querySelector('.exe-file');
  if(!exe) return;
  // Create modal elements
  const overlay = document.createElement('div');
  overlay.className = 'projects-modal-overlay';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML = `
    <div class="projects-modal" role="dialog" aria-modal="true" aria-label="Projects">
      <header>
        <h3>Projects</h3>
        <div>
          <button class="close-btn" aria-label="Close">Close</button>
        </div>
      </header>
      <div class="projects-list">
        <div class="project-card">
          <div class="p-icon">📦</div>
          <div class="p-body">
            <h4>Mln_admin</h4>
            <p style="margin:0;color:var(--muted);">Admin tools and ML helpers — hosted on GitHub.</p>
          </div>
          <div class="p-actions">
            <a href="https://github.com/ShawnBaker09/Mln_admin" target="_blank" rel="noopener noreferrer">Open on GitHub</a>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const modal = overlay.querySelector('.projects-modal');
  const closeBtn = overlay.querySelector('.close-btn');

  function openModal(){
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    // focus first actionable element
    const link = overlay.querySelector('.p-actions a');
    if(link) link.focus();
  }
  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    exe.focus();
  }

  // Single-click opens modal (user requested click should open somewhere)
  exe.addEventListener('click', function(e){
    e.preventDefault();
    openModal();
  });

  // Support double-click tooltip hint as well
  exe.addEventListener('dblclick', function(e){
    e.preventDefault();
    openModal();
  });

  // Keyboard activation
  exe.addEventListener('keydown', function(ev){
    if(ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); openModal(); }
  });

  // Close handlers
  closeBtn.addEventListener('click', function(){ closeModal(); });
  overlay.addEventListener('click', function(ev){ if(ev.target === overlay) closeModal(); });
  document.addEventListener('keydown', function(ev){ if(ev.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  // Make exe-file accessible and add hover pulse on mouseenter
  exe.addEventListener('mouseenter', ()=> exe.classList.add('pulse'));
  exe.addEventListener('mouseleave', ()=> exe.classList.remove('pulse'));
});
