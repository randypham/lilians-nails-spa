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

// ==================================================
// GOOGLE MAPS
// ==================================================

function initMap() {
  // map options
  const options = {
    center: { lat: 39.9731909, lng: -76.6810982 },
    zoom: 15
  };

  // new map
  const map = new google.maps.Map(document.getElementById('map'), options);

  // add marker
  const marker = new google.maps.Marker({
    position: options.center,
    map: map
  });
}

// ==================================================
// SCROLL REVEAL
// ==================================================

window.sr = ScrollReveal();

sr.reveal('.scroll-fade', {
  duration: 1600,
  origin: 'bottom'
});
