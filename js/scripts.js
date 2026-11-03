// Mobile navigation: the hamburger button toggles the open class on the menu and aria-expanded keeps screen readers informed
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", function () {
    mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", mainNav.classList.contains("open"));
  });

  // Close the menu after a link is tapped
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// The footer year is generated so it never goes out of date
const yearEl = document.getElementById("currentYear");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// The back to top button is created with JavaScript and added to the page
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

// Adds a shadow to the header once the page is scrolled and shows the back to top button further down the page
function handleScroll() {
  const scrolled = window.scrollY > 40;
  if (siteHeader) {
    siteHeader.classList.toggle("scrolled", scrolled);
  }
  backToTop.classList.toggle("visible", window.scrollY > 500);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Scroll reveal: elements fade in as they enter the screen. Skipped for visitors who prefer reduced motion and for browsers without IntersectionObserver
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

// Adds the reveal class to each element and watches it, with a small stagger between neighbours
function revealElements(elements) {
  if (!revealObserver) return;
  Array.prototype.forEach.call(elements, function (el, index) {
    el.style.transitionDelay = (index % 4) * 80 + "ms";
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// Shared on window so other scripts can reuse it
window.revealElements = revealElements;

// Apply the effect to the cards and headings already on the page
revealElements(
  document.querySelectorAll(
    ".intro-card, .product-card, .mission-card, .team-card, .location-card, .gallery-item, .accordion-item, .section-title"
  )
);
