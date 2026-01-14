document.addEventListener('DOMContentLoaded', function() {
  var banner = document.getElementById('banner');
  var bg = document.querySelector('.banner-bg');
  if (!banner || !bg) return;

  var rect = null;

  // animated follow variables
  var targetX = 0, targetY = 0;
  var currentX = 0, currentY = 0;
  var rafId = null;

  function clamp(v, a, b) { return Math.max(a, Math.min(v, b)); }

  function setTargetFromEvent(e) {
    if (!rect) rect = banner.getBoundingClientRect();
    var clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    var clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    targetX = clamp(clientX - rect.left, 0, rect.width);
    targetY = clamp(clientY - rect.top, 0, rect.height);
  }

  function animate() {
    // lerp towards target
    var ease = 0.18;
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    // set CSS vars
    bg.style.setProperty('--x', Math.round(currentX) + 'px');
    bg.style.setProperty('--y', Math.round(currentY) + 'px');
    // add active while moving
    if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) > 0.5) {
      if (!bg.classList.contains('active')) bg.classList.add('active');
    }
    rafId = window.requestAnimationFrame(animate);
  }

  banner.addEventListener('mousemove', function(e) {
    setTargetFromEvent(e);
  });

  banner.addEventListener('mouseenter', function(e) {
    rect = banner.getBoundingClientRect();
    setTargetFromEvent(e);
    if (!rafId) animate();
  });

  banner.addEventListener('mouseleave', function() {
    bg.classList.remove('active');
    if (stoppedTimer) { clearTimeout(stoppedTimer); stoppedTimer = null; }
    // gradually return center
    rect = banner.getBoundingClientRect();
    targetX = rect.width / 2;
    targetY = rect.height / 3; // keep focus higher
  });

  // Touch support: tap to toggle reveal for a short period and follow touches
  banner.addEventListener('touchstart', function(e) {
    rect = banner.getBoundingClientRect();
    setTargetFromEvent(e);
    if (!rafId) animate();
  }, {passive: true});

  banner.addEventListener('touchmove', function(e) {
    setTargetFromEvent(e);
  }, {passive: true});

});
document.addEventListener('DOMContentLoaded', function() {
  var banner = document.getElementById('banner');
  var bg = document.querySelector('.banner-bg');
  if (!banner || !bg) return;

  var rect = null;

  function updateVars(e) {
    if (!rect) rect = banner.getBoundingClientRect();
    var clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    var clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    var x = clientX - rect.left;
    var y = clientY - rect.top;
    // clamp inside banner
    x = Math.max(0, Math.min(x, rect.width));
    y = Math.max(0, Math.min(y, rect.height));
    bg.style.setProperty('--x', Math.round(x) + 'px');
    bg.style.setProperty('--y', Math.round(y) + 'px');
  }

  banner.addEventListener('mousemove', function(e) {
    updateVars(e);
    bg.classList.add('active');
  });

  banner.addEventListener('mouseenter', function(e) {
    rect = banner.getBoundingClientRect();
    updateVars(e);
    bg.classList.add('active');
  });

  banner.addEventListener('mouseleave', function() {
    bg.classList.remove('active');
  });

  // Touch support: tap to toggle reveal for a short period
  banner.addEventListener('touchstart', function(e) {
    rect = banner.getBoundingClientRect();
    updateVars(e);
    bg.classList.add('active');
    setTimeout(function() { bg.classList.remove('active'); }, 1500);
  });

  banner.addEventListener('touchmove', function(e) {
    updateVars(e);
  });

});
