// Logo animation on load
window.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('logo');
  logo.style.opacity = '0';
  logo.style.transform = 'translateY(-10px)';

  setTimeout(() => {
    logo.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    logo.style.opacity = '1';
    logo.style.transform = 'translateY(0)';
  }, 200);
});
