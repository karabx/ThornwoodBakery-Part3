const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", mainNav.classList.contains("open"));
  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const yearEl = document.getElementById("currentYear");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const siteHeader = document.querySelector(".site-header");
const backToTop = document.createElement("button");
backToTop.type = "button";
backToTop.className = "back-to-top";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.textContent = "\u2191";
document.body.appendChild(backToTop);

backToTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function handleScroll() {
  const scrolled = window.scrollY > 40;
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrolled);
  }
  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealObserver =
  "IntersectionObserver" in window && !prefersReducedMotion
    ? new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add("in-view");
            observer.unobserve(el);
            setTimeout(function () {
              el.classList.remove("reveal", "in-view");
            }, 800);
          });
        },
        { threshold: 0.12 }
      )
    : null;

function revealElements(elements) {
  if (!revealObserver) return;
  Array.prototype.forEach.call(elements, function (el, index) {
    el.style.transitionDelay = (index % 4) * 80 + "ms";
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

window.revealElements = revealElements;

revealElements(
  document.querySelectorAll(
    ".intro-card, .product-card, .mission-card, .team-card, .location-card, .gallery-item, .accordion-item, .section-title"
  )
);
