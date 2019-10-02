// ==================================================
// NAV
// ==================================================

const navBtn = document.querySelector('#nav-btn');
const nav = document.querySelector('#nav');
const navList = document.querySelector('#nav-list');

function toggleNav() {
  nav.classList.toggle('active');
}

function hideNav(e) {
  if (e.target.classList.contains('nav-link')) {
    nav.classList.remove('active');
  }
}

navBtn.addEventListener('click', toggleNav);
navList.addEventListener('click', hideNav);
