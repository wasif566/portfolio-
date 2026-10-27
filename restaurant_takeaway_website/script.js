/* Ember & Crumb — vanilla JavaScript interactions
   Before publishing: update the business details and WhatsApp number in index.html. */
(() => {
  "use strict";

  const WHATSAPP_NUMBER = "923266438812"; // digits only, country code included
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  const orderForm = document.getElementById("orderForm");
  const orderDetails = document.getElementById("orderDetails");
  const orderType = document.getElementById("orderType");
  const deliveryAddress = document.getElementById("deliveryAddress");
  const addressLabel = document.getElementById("addressLabel");
  const formError = document.getElementById("formError");

  // Automatically update footer year.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Accessible mobile navigation.
  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  primaryNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      primaryNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });

  // Menu category filters.
  const filterButtons = [...document.querySelectorAll(".filter-btn")];
  const menuCards = [...document.querySelectorAll(".menu-card")];
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      menuCards.forEach(card => {
        card.hidden = category !== "all" && card.dataset.category !== category;
      });
    });
  });

  // Selecting a menu item pre-fills the order form and moves the visitor to it.
  document.querySelectorAll(".order-item").forEach(button => {
    button.addEventListener("click", () => {
      const item = button.dataset.item;
      const current = orderDetails.value.trim();
      const line = `${item} x 1`;
      if (!current) orderDetails.value = line;
      else if (!current.split("\n").some(entry => entry.toLowerCase().startsWith(item.toLowerCase()))) {
        orderDetails.value = `${current}\n${line}`;
      }
      document.getElementById("order").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => orderDetails.focus({ preventScroll: true }), 450);
    });
  });

  // Delivery address is required only for delivery.
  function updateDeliveryFields() {
    const deliverySelected = orderType.value === "Delivery";
    addressLabel.hidden = !deliverySelected;
    deliveryAddress.required = deliverySelected;
  }
  orderType.addEventListener("change", updateDeliveryFields);
  updateDeliveryFields();

  // Build a pre-filled WhatsApp message. Opening WhatsApp does not confirm an order.
  orderForm.addEventListener("submit", event => {
    event.preventDefault();
    formError.textContent = "";
    if (!orderForm.checkValidity()) {
      const firstInvalid = orderForm.querySelector(":invalid");
      formError.textContent = "Please complete all required fields and check your details.";
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const data = new FormData(orderForm);
    const name = String(data.get("customerName") || "").trim();
    const phone = String(data.get("customerPhone") || "").trim();
    const items = String(data.get("orderDetails") || "").trim();
    const type = String(data.get("orderType") || "");
    const time = String(data.get("preferredTime") || "").trim();
    const address = String(data.get("deliveryAddress") || "").trim();
    const notes = String(data.get("notes") || "").trim();

    const lines = [
      "Hello! I'd like to enquire about placing an order.",
      "",
      `Name: ${name}`,
      `Contact number: ${phone}`,
      `Order details:`,
      items,
      `Preference: ${type}`
    ];
    if (type === "Delivery") lines.push(`Delivery address: ${address}`);
    if (time) lines.push(`Preferred time: ${time}`);
    if (notes) lines.push(`Additional notes: ${notes}`);
    lines.push("", "Please confirm availability, final price, delivery/pickup time, and any applicable charges. I understand this order is not confirmed until you reply.");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  // Keep map directions useful until the owner replaces the placeholder address.
  const addressElement = document.querySelector('[data-config="address"]');
  const mapLink = document.getElementById("mapLink");
  if (addressElement && mapLink) {
    const addressText = addressElement.textContent.trim();
    mapLink.href = addressText === "Add your restaurant address"
      ? "https://www.google.com/maps"
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
  }
})();
