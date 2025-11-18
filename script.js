// Active nav on scroll
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const idx = sections.indexOf(entry.target);
    if (idx >= 0 && entry.isIntersecting) {
      links.forEach(l => l.classList.remove('active'));
      links[idx].classList.add('active');
      history.replaceState(null, '', '#' + entry.target.id);
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sections.forEach(s => s && activeObserver.observe(s));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Loader control (min duration for smoothness)
const MIN_LOADER_MS = 1200;
const start = performance.now();

function hideLoader() {
  document.body.classList.add('is-loaded');
}

window.addEventListener('load', () => {
  const elapsed = performance.now() - start;
  const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
  setTimeout(hideLoader, remaining);
});

// Accessibility: allow Enter on skip link to bypass loader immediately
document.querySelector('.skip-link')?.addEventListener('click', () => {
  hideLoader();
});

// Wave text effect - split text into individual letters
function initWaveText() {
  const waveElements = document.querySelectorAll('.wave-text');
  
  waveElements.forEach(element => {
    const text = element.textContent;
    element.innerHTML = ''; // Clear original text
    
    // Split into individual characters and wrap each in a span
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      // Use non-breaking space entity for spaces to preserve them
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.1}s`;
      element.appendChild(span);
    });
  });
}

// Initialize wave text after DOM is ready
initWaveText();