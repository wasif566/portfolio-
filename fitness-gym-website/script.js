// Configure the gym WhatsApp destination in this single location.
const WHATSAPP_NUMBER = "923266438812";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}));

// Class category filtering.
const filterButtons = document.querySelectorAll(".filter-btn");
const classCards = document.querySelectorAll(".class-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  classCards.forEach(card => {
    card.hidden = filter !== "all" && card.dataset.category !== filter;
  });
}));

// FAQ accordion: supports keyboard activation through native buttons.
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.closest(".faq-item").querySelector(".faq-answer").hidden = expanded;
  });
});

// Enquiry shortcuts prefill the form and then move focus to the relevant section.
document.querySelectorAll(".enquiry-trigger").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.type || "";
    const plan = button.dataset.plan || "";
    const program = button.dataset.program || "";
    const trainer = button.dataset.trainer || "";
    const typeSelect = document.getElementById("enquiryType");
    if (type) {
      const option = [...typeSelect.options].find(item => item.value === type || item.text === type);
      if (option) typeSelect.value = option.value;
    }
    if (plan) document.getElementById("planSelect").value = plan;
    if (program) {
      const select = document.getElementById("programSelect");
      const option = [...select.options].find(item => item.value === program || item.text === program);
      if (option) select.value = option.value;
      else select.value = "Other";
    }
    if (trainer) {
      const message = document.querySelector('[name="message"]');
      message.value = `I'd like to ask about ${trainer}.`;
    }
    document.getElementById("enquiry").scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => typeSelect.focus({ preventScroll: true }), 350);
  });
});

// Keep trial date from being set in the past using local date.
const trialDate = document.getElementById("trialDate");
const now = new Date();
trialDate.min = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
document.getElementById("year").textContent = new Date().getFullYear();

// WhatsApp enquiry form with inline field validation.
const form = document.getElementById("enquiryForm");
const status = document.getElementById("formStatus");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, message) {
  const label = input.closest("label");
  const error = label ? label.querySelector(".field-error") : null;
  input.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message || "";
}

form.querySelectorAll("input, select, textarea").forEach(input => {
  input.addEventListener("input", () => setError(input, ""));
  input.addEventListener("change", () => setError(input, ""));
});

form.addEventListener("submit", event => {
  event.preventDefault();
  status.hidden = true;
  status.textContent = "";
  let valid = true;
  const name = form.elements.name;
  const phone = form.elements.phone;
  const email = form.elements.email;
  const type = form.elements.type;

  if (!name.value.trim()) { setError(name, "Please enter your name."); valid = false; }
  if (!phone.value.trim() || phone.value.trim().replace(/[^\d]/g, "").length < 7) {
    setError(phone, "Enter a valid phone number."); valid = false;
  }
  if (email.value.trim() && !emailPattern.test(email.value.trim())) {
    setError(email, "Enter a valid email address."); valid = false;
  }
  if (!type.value) { setError(type, "Please select an enquiry type."); valid = false; }

  if (!valid) {
    status.textContent = "Please check the highlighted fields.";
    status.hidden = false;
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const value = key => String(new FormData(form).get(key) || "").trim();
  const message = [
    "Hello FORGE Fitness, I'd like to make an enquiry.",
    "",
    "ENQUIRY DETAILS (not confirmed)",
    `Full name: ${value("name")}`,
    `Phone: ${value("phone")}`,
    `Email: ${value("email") || "Not provided"}`,
    `Enquiry type: ${value("type")}`,
    `Preferred membership plan: ${value("plan") || "Not sure yet"}`,
    `Preferred training program: ${value("program") || "Not sure yet"}`,
    `Preferred trial date: ${value("date") || "Not specified"}`,
    `Preferred time: ${value("time") || "Flexible / to discuss"}`,
    `Fitness goals: ${value("goals") || "Not provided"}`,
    `Additional message: ${value("message") || "None"}`,
    "",
    "Please let me know availability, prices and any applicable terms. I understand this enquiry does not confirm a membership or trial session."
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const popup = window.open(url, "_blank", "noopener,noreferrer");
  if (!popup) window.location.href = url;
});

// Back-to-top visibility and action.
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => backToTop.classList.toggle("visible", window.scrollY > 550), { passive: true });
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
