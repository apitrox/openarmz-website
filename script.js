// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth in-view animation for images (progressive enhancement)
const obs = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, {threshold: 0.2})
  : null;

document.querySelectorAll('.program img, .photo img').forEach(img=>{
  img.loading = 'lazy';
  if(obs){ img.classList.add('fade'); obs.observe(img); }
});

// Add CSS class styles for fade (inline since tiny)
const style = document.createElement('style');
style.textContent = `.fade{opacity:0;transform:translateY(8px);transition:.5s ease}
.fade.in{opacity:1;transform:none}`;
document.head.appendChild(style);

// Simple form handlers (demo only)
function wireForm(id){
  const form = document.getElementById(id);
  if(!form) return;
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!form.checkValidity()){
      msg.textContent = 'Please complete the required fields.';
      msg.style.color = '#fca5a5';
      form.reportValidity();
      return;
    }
    msg.textContent = 'Thank you! We\'ll be in touch soon.';
    msg.style.color = '#68B42E';
    form.reset();
  });
}
wireForm('volunteer-form');
wireForm('contact-form');

// Modern page transitions using View Transition API
if (document.startViewTransition) {
  window.navigation.addEventListener('navigate', (e) => {
    const toUrl = new URL(e.destination.url);
    
    // Only apply transition for same-origin navigation
    if (location.origin === toUrl.origin) {
      e.intercept({
        handler: async () => {
          const response = await fetch(toUrl.pathname);
          const html = await response.text();
          const parser = new DOMParser();
          const newDoc = parser.parseFromString(html, 'text/html');
          
          document.startViewTransition(() => {
            document.body.innerHTML = newDoc.body.innerHTML;
            document.title = newDoc.title;
          });
        }
      });
    }
  });
} else {
  // Fallback: Simple fade for browsers without View Transition API
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease-in';
      document.body.style.opacity = '1';
    }, 10);
  });
}
