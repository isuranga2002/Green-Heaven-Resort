const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const form = document.querySelector(".contact-form");
const status = document.querySelector(".form-status");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 32);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    header?.classList.toggle("menu-active", open);
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      header?.classList.remove("menu-active");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  status.textContent = "Thank you for your interest. Confirmed opening contact details will be announced soon.";
  form.querySelector("button").textContent = "Interest Registered";
});
