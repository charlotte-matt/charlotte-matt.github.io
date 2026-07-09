// Mobile nav toggle
const toggle = document.querySelector(".nav__toggle");
const links = document.getElementById("navLinks");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = "2026";

// Render project cards from window.PROJECTS
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid || !Array.isArray(window.PROJECTS)) return;
  grid.innerHTML = window.PROJECTS.map((p) => {
    const coming = p.status === "coming-soon";
    const tags = p.tags.map((t) => `<span class="tag">${t}</span>`).join("");
    return `
      <a class="card${coming ? " card--soon" : ""}" href="${p.href}">
        <div class="card__top">
          <span class="card__date">${p.date}</span>
          ${coming ? '<span class="card__badge">Coming soon</span>' : '<span class="card__badge card__badge--live">Live</span>'}
        </div>
        <h3 class="card__title">${p.title}</h3>
        <p class="card__summary">${p.summary}</p>
        <div class="card__tags">${tags}</div>
        <span class="card__cta">${coming ? "Preview" : "View project"} →</span>
      </a>`;
  }).join("");
}
renderProjects();

// Reveal-on-scroll
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");
if (prefersReduced || !("IntersectionObserver" in window)) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  revealEls.forEach((el) => io.observe(el));
}

// Active nav link (scrollspy)
const sections = document.querySelectorAll("main section[id]");
const navMap = new Map([...document.querySelectorAll(".nav__links a")].map((a) => [a.getAttribute("href").slice(1), a]));
if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navMap.forEach((a) => a.classList.remove("is-active"));
        navMap.get(e.target.id)?.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}
