const WHATSAPP_NUMBER = "923266438812";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

document.querySelectorAll(".service-select").forEach(button => {
  button.addEventListener("click", () => {
    const select = document.getElementById("serviceSelect");
    const service = button.dataset.service;
    const matchingOption = [...select.options].find(option => option.value === service || option.text === service);
    if (matchingOption) select.value = matchingOption.value;
    document.getElementById("booking").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => select.focus({ preventScroll: true }), 350);
  });
});

const dateInput = document.getElementById("journeyDate");
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
dateInput.min = localToday;
document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("bookingForm");
const formError = document.getElementById("formError");

form.addEventListener("submit", event => {
  event.preventDefault();
  formError.hidden = true;

  if (!form.reportValidity()) {
    formError.hidden = false;
    return;
  }

  const data = new FormData(form);
  const value = key => String(data.get(key) || "").trim();
  const message = [
    "Hello Northstar Transfers, I'd like to request a journey.",
    "",
    "BOOKING REQUEST (not yet confirmed)",
    `Full name: ${value("name")}`,
    `Phone: ${value("phone")}`,
    `Email: ${value("email") || "Not provided"}`,
    `Service: ${value("service")}`,
    `Pickup: ${value("pickup")}`,
    `Destination: ${value("destination")}`,
    `Journey date: ${value("date")}`,
    `Preferred pickup time: ${value("time")}`,
    `Passengers: ${value("passengers")}`,
    `Luggage: ${value("luggage") || "Not specified"}`,
    `Additional notes: ${value("notes") || "None"}`,
    "",
    "Please confirm availability, fare and pickup arrangements. I understand this request is not a confirmed booking."
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  if (!newWindow) window.location.href = whatsappUrl;
});
