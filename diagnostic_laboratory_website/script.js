(() => {
  "use strict";

  // Configure your laboratory in this file. Keep the WhatsApp number digits-only.
  const LAB_CONFIG = {
    name: "CarePoint Diagnostics",
    whatsappNumber: "923266438812",
    phoneDisplay: "+92 326 6438812",
    email: "hello@example.com",
    branches: [
      { value: "Main branch (configure address)", label: "Main branch (configure address)" }
    ]
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  // Mobile navigation
  const menuToggle = $(".menu-toggle");
  const nav = $("#primary-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !isOpen);
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  // Test directory search and category filters
  const searchInput = $("#test-search");
  const categorySelect = $("#test-category");
  const clearFilters = $("#clear-filters");
  const testRows = $$(".test-row");
  const resultsCount = $("#results-count");
  const emptyState = $("#empty-state");

  function filterTests() {
    const query = (searchInput?.value || "").trim().toLocaleLowerCase();
    const category = categorySelect?.value || "all";
    let visible = 0;
    testRows.forEach(row => {
      const name = (row.dataset.name || row.textContent).toLocaleLowerCase();
      const rowCategory = row.dataset.category || "";
      const matches = name.includes(query) && (category === "all" || rowCategory === category);
      row.hidden = !matches;
      if (matches) visible += 1;
    });
    if (resultsCount) {
      resultsCount.textContent = `Showing ${visible} of ${testRows.length} directory entries`;
    }
    if (emptyState) emptyState.hidden = visible !== 0;
  }
  searchInput?.addEventListener("input", filterTests);
  categorySelect?.addEventListener("change", filterTests);
  clearFilters?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (categorySelect) categorySelect.value = "all";
    filterTests();
    searchInput?.focus();
  });
  $$(".test-row [data-test]").forEach(link => {
    link.addEventListener("click", () => {
      const testInput = $("#requested-test");
      if (testInput) testInput.value = link.dataset.test || "";
    });
  });

  // Add configured branches to the appointment form.
  const branchSelect = $("#branch");
  if (branchSelect && LAB_CONFIG.branches.length) {
    branchSelect.replaceChildren(new Option("Select a branch", ""));
    LAB_CONFIG.branches.forEach(branch => {
      branchSelect.add(new Option(branch.label, branch.value));
    });
  }

  // Date input: don't allow selecting a date before today.
  const dateInput = $("#preferred-date");
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().slice(0, 10);
    dateInput.min = localToday;
  }

  // Show home collection area only when requested.
  const homeCheckbox = $("#home-request");
  const homeAreaWrap = $("#home-area-wrap");
  const homeAreaInput = $("#home-area");
  function updateHomeArea() {
    const checked = Boolean(homeCheckbox?.checked);
    if (homeAreaWrap) homeAreaWrap.hidden = !checked;
    if (homeAreaInput) {
      homeAreaInput.required = checked;
      if (!checked) homeAreaInput.value = "";
    }
  }
  homeCheckbox?.addEventListener("change", updateHomeArea);
  updateHomeArea();

  // Booking enquiry validation and WhatsApp hand-off. No medical data is requested.
  const form = $("#booking-form");
  const status = $("#form-status");
  const fieldErrors = {
    patientName: $("#name-error"),
    phone: $("#phone-error"),
    email: $("#email-error"),
    branch: $("#branch-error"),
    requestedTest: $("#test-error")
  };
  const fields = {
    patientName: $("#patient-name"),
    phone: $("#patient-phone"),
    email: $("#patient-email"),
    branch: $("#branch"),
    requestedTest: $("#requested-test")
  };

  function setError(key, message) {
    const field = fields[key];
    const error = fieldErrors[key];
    if (field) {
      field.setAttribute("aria-invalid", message ? "true" : "false");
      if (!message) field.removeAttribute("aria-invalid");
    }
    if (error) error.textContent = message;
  }

  function validateForm() {
    let valid = true;
    const name = fields.patientName.value.trim();
    const phone = fields.phone.value.trim();
    const email = fields.email.value.trim();
    const branch = fields.branch.value.trim();
    const test = fields.requestedTest.value.trim();
    const phoneDigits = phone.replace(/\D/g, "");

    const checks = {
      patientName: name ? "" : "Please enter your name.",
      phone: phoneDigits.length >= 7 ? "" : "Enter a valid phone number.",
      email: !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address or leave it blank.",
      branch: branch ? "" : "Please select a branch.",
      requestedTest: test ? "" : "Please enter a test or service."
    };
    Object.entries(checks).forEach(([key, message]) => {
      setError(key, message);
      if (message) valid = false;
    });

    if (homeCheckbox?.checked && !homeAreaInput?.value.trim()) {
      if (status) status.textContent = "Please add your area or neighbourhood for the home collection enquiry.";
      homeAreaInput?.focus();
      valid = false;
    }
    if (!valid) {
      if (status && !status.textContent) status.textContent = "Please review the highlighted fields.";
      const firstInvalid = form?.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
    } else if (status) {
      status.textContent = "";
    }
    return valid;
  }

  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateForm()) return;

    const data = new FormData(form);
    const messageLines = [
      `Hello ${LAB_CONFIG.name}, I'd like to enquire about an appointment.`,
      "",
      `Patient name: ${String(data.get("patientName") || "").trim()}`,
      `Contact number: ${String(data.get("phone") || "").trim()}`,
      `Requested test/service: ${String(data.get("requestedTest") || "").trim()}`,
      `Preferred branch: ${String(data.get("branch") || "").trim()}`,
      `Preferred date: ${String(data.get("date") || "").trim() || "Flexible / not specified"}`,
      `Preferred time: ${String(data.get("time") || "").trim() || "No preference"}`,
      `Home collection enquiry: ${homeCheckbox?.checked ? "Yes" : "No"}`
    ];
    if (homeCheckbox?.checked) {
      messageLines.push(`Area/neighbourhood: ${String(data.get("homeArea") || "").trim()}`);
    }
    const email = String(data.get("email") || "").trim();
    if (email) messageLines.push(`Email: ${email}`);
    const adminMessage = String(data.get("message") || "").trim();
    if (adminMessage) messageLines.push(`Administrative message: ${adminMessage}`);
    messageLines.push("", "I understand this is an enquiry, not a confirmed appointment. Please confirm availability.");
    const url = `https://wa.me/${LAB_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    if (status) status.textContent = "Opening WhatsApp with your enquiry. Review the message and press Send in WhatsApp. The laboratory must confirm your appointment.";
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      if (status) status.textContent = "Your browser blocked the new tab. Use the WhatsApp link below or allow pop-ups and submit again.";
      const fallback = document.createElement("a");
      fallback.href = url;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      fallback.className = "text-link";
      fallback.textContent = "Open your WhatsApp enquiry";
      fallback.style.marginTop = "8px";
      fallback.style.display = "inline-flex";
      status?.append(" ", fallback);
    }
  });

  form?.addEventListener("reset", () => {
    window.setTimeout(() => {
      Object.keys(fieldErrors).forEach(key => setError(key, ""));
      if (status) status.textContent = "";
      updateHomeArea();
    }, 0);
  });

  // Footer year
  const year = $("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Back-to-top control remains a normal anchor; add a descriptive title.
  const backTop = $("#back-top");
  if (backTop) backTop.title = "Back to top";
})();
