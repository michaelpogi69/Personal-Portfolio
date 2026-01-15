// ========= Helpers =========
const $ = (sel) => document.querySelector(sel);

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1600);
}

// ========= Year in footer =========
$("#year").textContent = new Date().getFullYear();

// ========= Mobile Menu =========
const menuToggle = $("#menuToggle");
const nav = $("#nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Close menu when clicking a nav link (mobile)
nav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ========= Dark Mode Toggle =========
const themeToggle = $("#themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
});

// ========= Reveal on Scroll =========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ========= Buttons Toast (Projects demo) =========
document.querySelectorAll("[data-toast]").forEach(btn => {
  btn.addEventListener("click", () => showToast(btn.dataset.toast));
});

// ========= Contact Form Validation =========
const form = $("#contactForm");
const nameInput = $("#name");
const emailInput = $("#email");
const messageInput = $("#message");

const nameError = $("#nameError");
const emailError = $("#emailError");
const messageError = $("#messageError");
const formStatus = $("#formStatus");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // reset errors
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  formStatus.textContent = "";

  let ok = true;

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Please enter your name (at least 2 characters).";
    ok = false;
  }

  if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    ok = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message should be at least 10 characters.";
    ok = false;
  }

  if (!ok) {
    showToast("Please fix the errors.");
    return;
  }

  // Demo submit (no backend)
  form.reset();
  formStatus.textContent = "Message sent (demo). You can connect this to EmailJS or a backend later.";
  showToast("Message sent!");
});
