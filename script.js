// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Tiny number counter (progressive enhancement)
function animateCount(el){
  const target = Number(el.dataset.count || el.textContent.replace(/[^\d]/g,''));
  const duration = 900;
  let start = null;
  function step(ts){
    if(!start) start = ts;
    const p = Math.min((ts-start)/duration, 1);
    el.textContent = Math.floor(target * (0.2 + 0.8*p)).toLocaleString() + '+';
    if(p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
document.querySelectorAll('.num').forEach(animateCount);

// Simple, accessible form handlers (demo only)
function wireForm(id){
  const form = document.getElementById(id);
  if(!form) return;
  const msg = form.querySelector('.form-msg');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const valid = form.checkValidity();
    if(!valid){
      msg.textContent = 'Please complete the required fields.';
      msg.style.color = '#fca5a5';
      form.reportValidity();
      return;
    }
    // Demo success
    msg.textContent = 'Thanks! We\'ll be in touch soon.';
    msg.style.color = '#86efac';
    form.reset();
  });
}
wireForm('volunteer-form');
wireForm('contact-form');
