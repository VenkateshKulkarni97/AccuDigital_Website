// script.js

// Animate logo on load
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('logo');
  logo.style.transition = 'all 0.8s ease';
  logo.style.opacity = '1';
  logo.style.transform = 'translateY(0)';

  const heroContent = document.querySelector('.hero-content');
  setTimeout(() => {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 400);
});

// Scroll to contact form
function scrollToForm() {
  const formSection = document.getElementById('contact');
  formSection.scrollIntoView({ behavior: 'smooth' });
}
