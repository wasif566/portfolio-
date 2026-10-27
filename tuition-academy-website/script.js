(() => {
  "use strict";
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }));
  }

  const subjectFilter = document.querySelector("#subject-filter");
  const levelFilter = document.querySelector("#level-filter");
  const courseCards = [...document.querySelectorAll(".course-card")];
  const emptyState = document.querySelector("#empty-state");
  function filterCourses() {
    const subject = subjectFilter.value;
    const level = levelFilter.value;
    let visible = 0;
    courseCards.forEach(card => {
      const subjects = card.dataset.subject.split(" ");
      const levels = card.dataset.level.split(" ");
      const matchesSubject = subject === "all" || subjects.includes(subject);
      const matchesLevel = level === "all" || levels.includes(level) || (level === "all-levels" && levels.includes("all-levels"));
      const show = matchesSubject && matchesLevel;
      card.hidden = !show;
      if (show) visible++;
    });
    emptyState.hidden = visible !== 0;
  }
  subjectFilter.addEventListener("change", filterCourses);
  levelFilter.addEventListener("change", filterCourses);
  document.querySelector("#reset-filters").addEventListener("click", () => {
    subjectFilter.value = "all";
    levelFilter.value = "all";
    filterCourses();
  });

  const courseSelect = document.querySelector("#course");
  document.querySelectorAll(".course-enquire").forEach(button => {
    button.addEventListener("click", () => {
      const course = button.dataset.course;
      const option = [...courseSelect.options].find(item => item.value === course || item.textContent === course);
      if (option) courseSelect.value = option.value;
      document.querySelector("#enquiry").scrollIntoView({ behavior: "smooth" });
      window.setTimeout(() => document.querySelector("#name").focus({ preventScroll: true }), 450);
    });
  });

  const form = document.querySelector("#enquiry-form");
  const error = document.querySelector("#form-error");
  const toast = document.querySelector("#toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3600);
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    error.hidden = true;
    if (!form.reportValidity()) {
      error.hidden = false;
      return;
    }
    const data = new FormData(form);
    const fields = [
      ["Student / parent name", data.get("name")],
      ["Contact telephone", data.get("phone")],
      ["Email", data.get("email") || "Not provided"],
      ["Course", data.get("course")],
      ["Class / grade level", data.get("level")],
      ["Preferred learning mode", data.get("mode") || "Not specified"],
      ["Preferred schedule", data.get("schedule") || "Not specified"],
      ["Additional questions", data.get("message") || "None"]
    ];
    const message = "Assalam-o-Alaikum, I would like to enquire about tuition classes.\\n\\n" +
      fields.map(([label, value]) => `${label}: ${String(value).trim()}`).join("\\n") +
      "\\n\\nPlease confirm course availability, timings, fees, and next steps. I understand this enquiry is not a confirmed enrollment.";
    const url = "https://wa.me/923266438812?text=" + encodeURIComponent(message);
    showToast("Opening WhatsApp with your enquiry…");
    window.open(url, "_blank", "noopener,noreferrer");
  });

  document.querySelector("#current-year").textContent = new Date().getFullYear();
})();