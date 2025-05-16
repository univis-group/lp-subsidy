// app.js

import Alpine from 'alpinejs';
import AOS from "aos";

import './css/input.css';
import 'aos/dist/aos.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const MoveTo = require("moveto");
const moveTo = new MoveTo({
  tolerance: 80,
});
const Url = require("domurl");
const bodyScrollLock = require("body-scroll-lock");
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

AOS.init();

window.Alpine = Alpine;

function setupAlpine() {
  // Mobile navigation
  const mobileNavigation = document.querySelector(".mobile-navigation");

  Alpine.store("mobileNavigation", {
    isOpen: false,
    toggle() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        disableBodyScroll(mobileNavigation);
      } else {
        enableBodyScroll(mobileNavigation);
      }
      this.firstOpen = false;
    },
  });

  Alpine.start();
}


// Smooth Scroll
function setupSmoothScroll() {
  const ankers = document.querySelectorAll("a.js-moveto");

  ankers.forEach((anker) => {
    let u = new URL(anker.href);
    if (window.location.href.split('#')[0] === u.href.split('#')[0]) {
      anker.href = `${u.hash}`;
      moveTo.registerTrigger(anker);
    }
  });
}

function setupHeaderLink() {
  var hostname = window.location.hostname;
  var baseUrl;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // 開発環境
    baseUrl = 'http://' + window.location.host + '/';
  } else {
    // 本番環境
    baseUrl = 'https://' + window.location.host + '/site/lp-freelance/';
  }

  // リンク設定
  const elements = [
    { id: 'header-home', href: baseUrl },
    { id: 'header-price', href: baseUrl + "#price" },
    { id: 'header-features', href: baseUrl + "#features" },
    { id: 'header-flow', href: baseUrl + "#flow" },
    { id: 'header-contact', href: baseUrl + "#contact" },
    { id: 'header-sp-price', href: baseUrl + "#price" },
    { id: 'header-sp-features', href: baseUrl + "#features" },
    { id: 'header-sp-flow', href: baseUrl + "#flow" },
    { id: 'link-contact-a', href: baseUrl + "#contact" },
    { id: 'link-contact-b', href: baseUrl + "#contact" },
    { id: 'footer-price', href: baseUrl + "#price" },
    { id: 'footer-features', href: baseUrl + "#features" },
    { id: 'footer-flow', href: baseUrl + "#flow" },
    { id: 'footer-sp-contact', href: baseUrl + "#contact" },
  ];
  
  elements.forEach(({ id, href }) => {
    const element = document.getElementById(id);
    if (element !== null) {
      element.href = href;
    }
  });

  // ヘッダー ロゴsrc固定
  var logo = document.getElementById('header-logo');
  logo.src = baseUrl + "img/brand.png";
  logo.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', function () {
  setupHeaderLink();
  setupSmoothScroll();
  setupAlpine();
});

// GSAP Animation

// Header animation
const headerContent = document.getElementById("header-content");
gsap.set(headerContent, {
  backgroundColor:"rgba(255,255,255,0)"
});
gsap.to(headerContent, {
  ease: "power4.inOut",
  duration: ".3",
  backgroundColor:"rgba(255,255,255,0.95)",
  scrollTrigger: {
    trigger: headerContent,
    start: "bottom 3%",
    end: "bottom 3%",
    toggleActions: "play none none reverse",
  },
});

// Block reveal effect
const blockRevealElems = gsap.utils.toArray(".c-block-reveal");
blockRevealElems.forEach((elem) => {
  const bg = elem.querySelector(".c-block-reveal-bg");
  const text = elem.querySelector(".c-block-reveal-text");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: elem,
      start: "top 80%",
      end: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  tl.to(bg, {
    "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    ease: "power4.inOut",
    duration: ".3",
    delay: elem.dataset.delay,
  });
  tl.set(text, {
    autoAlpha: "100%",
  });
  tl.set(elem, {
    backgroundColor: "#293a52",
  });
  tl.to(
    bg,
    {
      ease: "power4.inOut",
      "clip-path": "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
    },
    ">+0.2"
  );
});

// Marker animation
const markerElems = gsap.utils.toArray(".c-marker");
markerElems.forEach((elem) => {
  gsap.to(elem, {
    width: "100%",
    ease: "power4.inOut",
    duration: "1",
    delay: elem.dataset.delay,
    scrollTrigger: {
      trigger: elem,
      start: "top 90%",
      end: "top 90%",
      toggleActions: "play none none reverse",
    },
  });
});

// Badge animation
const featureItems = gsap.utils.toArray(".feature-item");
gsap.from(featureItems, {
  autoAlpha: 0,
  y: 20,
  delay: 1.2,
  duration: 0.4,
  stagger: 0.2,
});
