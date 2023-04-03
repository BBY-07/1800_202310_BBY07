function toggleMenu() {
  const mainNav = document.getElementById('main-nav');
  const hamburgerMenu = document.querySelector('.hamburger-menu');

  // Toggle display of the nav menu
  mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';

  // Toggle "x" class on the hamburger menu
  hamburgerMenu.classList.toggle('x');
}
