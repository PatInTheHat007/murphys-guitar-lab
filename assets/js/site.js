// Murphy's Guitar Lab — shared site script. Everything here is an enhancement:
// the pages read and navigate fine without it.

// ---- Booking link ----------------------------------------------------------
// Put your booking page (Calendly, Square, etc.) or a "mailto:you@example.com"
// link here. While it's empty, every "Book" button shows "Booking opens soon".
const BOOKING_URL = "";

document.querySelectorAll("[data-book]").forEach((btn) => {
  if (BOOKING_URL) {
    btn.href = BOOKING_URL;
    if (/^https?:/.test(BOOKING_URL)) { btn.target = "_blank"; btn.rel = "noopener"; }
  } else {
    btn.removeAttribute("href");
    btn.setAttribute("aria-disabled", "true");
    btn.textContent = "Booking opens soon";
  }
});

// ---- Mobile menu -----------------------------------------------------------
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

function setMenu(open) {
  nav?.classList.toggle("open", open);
  toggle?.setAttribute("aria-expanded", String(open));
}
toggle?.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
// Escape and clicks outside close the menu, returning focus to the button.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav?.classList.contains("open")) { setMenu(false); toggle?.focus(); }
});
document.addEventListener("click", (e) => {
  if (nav?.classList.contains("open") && !e.target.closest(".header-inner")) setMenu(false);
});

// ---- Reveal sections as they scroll into view ---------------------------------
// The CSS only hides [data-reveal] when <html> has the "js" class, and reduced-motion
// users get no movement at all (see site.css).
const reveals = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-in"); io.unobserve(entry.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-in"));
}

// ---- Footer year -------------------------------------------------------------
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
