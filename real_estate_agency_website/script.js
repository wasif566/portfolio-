(() => {
  "use strict";
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }));
  }

  const purpose = document.querySelector("#filter-purpose");
  const category = document.querySelector("#filter-category");
  const locationFilter = document.querySelector("#filter-location");
  const cards = [...document.querySelectorAll(".property-card")];
  const emptyState = document.querySelector("#empty-state");

  function filterProperties() {
    let visible = 0;
    cards.forEach(card => {
      const matches = (purpose.value === "all" || card.dataset.purpose === purpose.value) &&
        (category.value === "all" || card.dataset.category === category.value) &&
        (locationFilter.value === "all" || card.dataset.location === locationFilter.value);
      card.hidden = !matches;
      if (matches) visible++;
    });
    emptyState.hidden = visible !== 0;
  }
  [purpose, category, locationFilter].forEach(select => select.addEventListener("change", filterProperties));
  document.querySelector(".search-button").addEventListener("click", filterProperties);
  document.querySelector("#reset-filters").addEventListener("click", () => {
    purpose.value = "all"; category.value = "all"; locationFilter.value = "all"; filterProperties();
  });

  document.querySelectorAll(".save-btn").forEach(button => {
    button.addEventListener("click", () => {
      const saved = button.classList.toggle("is-saved");
      button.textContent = saved ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", `${saved ? "Unsave" : "Save"} ${button.closest(".property-card").dataset.title}`);
    });
  });

  const propertySelect = document.querySelector("#property-select");
  const inquiryType = document.querySelector("#inquiry-type");
  document.querySelectorAll(".inquire-property").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".property-card");
      const title = `${card.dataset.title} (${card.dataset.id})`;
      const option = [...propertySelect.options].find(item => item.textContent.startsWith(card.dataset.title));
      if (option) propertySelect.value = option.value;
      if (card.dataset.purpose === "buy") inquiryType.value = "Buying a property";
      if (card.dataset.purpose === "rent") inquiryType.value = "Renting a property";
      document.querySelector("#inquiry-form").scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelector("#form-status").textContent = `Selected: ${title}. Complete the form to prepare your WhatsApp inquiry.`;
    });
  });

  document.querySelector("#inquiry-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = [
      ["Name", data.get("name")],
      ["Phone", data.get("phone")],
      ["Email", data.get("email") || "Not provided"],
      ["Inquiry type", data.get("type")],
      ["Selected property", data.get("property") || "No specific property"],
      ["Preferred location", data.get("location") || "Not specified"],
      ["Budget", data.get("budget") || "Not specified"],
      ["Additional details", data.get("notes") || "None"]
    ];
    const message = "Hello, I would like to make a property inquiry.%0A%0A" +
      fields.map(([label, value]) => `${label}: ${value}`).map(line => line).join("\n");
    const url = `https://wa.me/923266438812?text=${encodeURIComponent("Hello, I would like to make a property inquiry.\n\n" + fields.map(([label, value]) => `${label}: ${value}`).join("\n"))}`;
    document.querySelector("#form-status").textContent = "Opening WhatsApp with your inquiry. Review the message and press Send in WhatsApp.";
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
})();