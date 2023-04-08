function toggleMenu() {
  const mainNav = document.getElementById("main-nav");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  mainNav.style.display = mainNav.style.display === "block" ? "none" : "block";

  hamburgerMenu.classList.toggle("x");
}
