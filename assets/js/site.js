// Murphy's Guitar Lab — shared site script.

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

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// ---- Footer year -------------------------------------------------------------
document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
