(() => {
  "use strict";
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }));
  }

  const category = document.querySelector("#filter-category");
  const transmission = document.querySelector("#filter-transmission");
  const price = document.querySelector("#filter-price");
  const cards = [...document.querySelectorAll(".vehicle-card")];
  const emptyState = document.querySelector("#empty-state");

  function applyFilters() {
    let visible = 0;
    cards.forEach(card => {
      const matches = (category.value === "all" || card.dataset.category === category.value) &&
        (transmission.value === "all" || card.dataset.transmission === transmission.value) &&
        (price.value === "all" || card.dataset.price === price.value);
      card.hidden = !matches;
      if (matches) visible++;
    });
    emptyState.hidden = visible > 0;
  }
  [category, transmission, price].forEach(select => select.addEventListener("change", applyFilters));
  document.querySelector("#reset-filters").addEventListener("click", () => {
    category.value = "all";
    transmission.value = "all";
    price.value = "all";
    applyFilters();
  });

  const vehicleSelect = document.querySelector("#vehicle");
  document.querySelectorAll(".rent-vehicle").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".vehicle-card");
      const id = card.dataset.id;
      const name = card.dataset.name;
      const option = [...vehicleSelect.options].find(item => item.textContent.startsWith(name.replace(" (sample)", "")));
      if (option) vehicleSelect.value = option.value;
      document.querySelector("#form-status").textContent = `Selected ${name}, reference ${id}. Complete the form to prepare your inquiry.`;
      document.querySelector("#booking").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const pickupDate = document.querySelector("#pickup-date");
  const returnDate = document.querySelector("#return-date");
  const today = new Date();
  const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  pickupDate.min = localToday;
  returnDate.min = localToday;

  function updateReturnMinimum() {
    if (pickupDate.value) {
      returnDate.min = pickupDate.value;
      if (returnDate.value && returnDate.value < pickupDate.value) returnDate.value = pickupDate.value;
    } else {
      returnDate.min = localToday;
    }
  }
  pickupDate.addEventListener("change", updateReturnMinimum);
  returnDate.addEventListener("change", () => {
    if (pickupDate.value && returnDate.value && returnDate.value < pickupDate.value) {
      returnDate.setCustomValidity("Return date cannot be earlier than pickup date.");
    } else {
      returnDate.setCustomValidity("");
    }
  });

  document.querySelector("#rental-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    returnDate.setCustomValidity("");
    if (!form.reportValidity()) return;
    if (returnDate.value < pickupDate.value) {
      returnDate.setCustomValidity("Return date cannot be earlier than pickup date.");
      returnDate.reportValidity();
      return;
    }
    const data = new FormData(form);
    const lines = [
      "Hello, I would like to make a car rental inquiry.",
      "",
      `Name: ${data.get("name")}`,
      `Contact number: ${data.get("phone")}`,
      `Email: ${data.get("email") || "Not provided"}`,
      `Selected vehicle: ${data.get("vehicle")}`,
      `Rental type: ${data.get("rentalType")}`,
      `Pickup location: ${data.get("pickup")}`,
      `Drop-off location: ${data.get("dropoff") || "Not specified"}`,
      `Pickup date: ${data.get("pickupDate")}`,
      `Pickup time: ${data.get("pickupTime")}`,
      `Return date: ${data.get("returnDate")}`,
      `Return time: ${data.get("returnTime")}`,
      `Driver preference: ${data.get("driver")}`,
      `Additional requirements: ${data.get("requirements") || "None"}`,
      "",
      "Please confirm availability, final pricing, and rental terms. I understand this inquiry is not a confirmed reservation."
    ];
    const url = "https://wa.me/923266438812?text=" + encodeURIComponent(lines.join("\n"));
    document.querySelector("#form-status").textContent = "Opening WhatsApp with your inquiry. Review the message and press Send in WhatsApp.";
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      document.querySelector("#form-status").textContent = "Your browser blocked the new tab. Use this link to open WhatsApp and send your inquiry.";
      const fallback = document.createElement("a");
      fallback.href = url;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.textContent = "Open WhatsApp inquiry";
      fallback.className = "text-link";
      document.querySelector("#form-status").append(" ", fallback);
    }
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
})();