"use strict";var navBtn=document.querySelector("#nav-btn"),nav=document.querySelector("#nav"),navList=document.querySelector("#nav-list");function toggleNav(){nav.classList.toggle("active")}function hideNav(t){t.target.classList.contains("nav-link")&&nav.classList.remove("active")}navBtn.addEventListener("click",toggleNav),navList.addEventListener("click",hideNav);