const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");
const form = document.querySelector(".contact-form");
const bookingForm = document.querySelector(".booking-bar");
const status = document.querySelector(".form-status");
const whatsappNumber = "94771234567";

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

const openWhatsApp = (message) => {
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
};

const formatBookingMessage = ({ name, phone, checkin, checkout, guests, cabana, message, source }) => {
  return [
    "Hello Green Heaven Eco Resort,",
    "",
    `I would like to make a booking enquiry from the website.`,
    "",
    `Name: ${name || "Not provided"}`,
    `WhatsApp / Phone: ${phone || "Not provided"}`,
    `Check-in: ${checkin || "Not provided"}`,
    `Check-out: ${checkout || "Not provided"}`,
    `Guests: ${guests || "Not provided"}`,
    `Preferred cabana: ${cabana || "Not provided"}`,
    `Special request: ${message || "None"}`,
    "",
    `Source: ${source}`
  ].join("\n");
};

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(bookingForm);
  const message = formatBookingMessage({
    name: data.get("name"),
    phone: data.get("phone"),
    checkin: data.get("checkin"),
    checkout: data.get("checkout"),
    guests: data.get("guests"),
    cabana: data.get("cabana"),
    message: "Please confirm availability and opening booking details.",
    source: "Hero booking form"
  });

  bookingForm.querySelector("button").textContent = "Opening WhatsApp";
  openWhatsApp(message);
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = formatBookingMessage({
    name: data.get("name"),
    phone: data.get("phone"),
    checkin: data.get("dates"),
    checkout: "Flexible / to be confirmed",
    guests: "Mentioned in special request",
    cabana: data.get("cabana"),
    message: data.get("message"),
    source: "Contact enquiry form"
  });

  status.textContent = "Opening WhatsApp with your formatted booking enquiry.";
  form.querySelector("button").textContent = "Opening WhatsApp";
  openWhatsApp(message);
});
