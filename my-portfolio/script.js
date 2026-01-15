const themeBtn = document.getElementById("themeBtn");
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

// Dark mode (saved)
const saved = localStorage.getItem("theme");
if (saved === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
});

// Simple form validation
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const status = document.getElementById("status");

function validEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  status.textContent = "";

  let ok = true;

  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Enter your name.";
    ok = false;
  }

  if (!validEmail(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid email.";
    ok = false;
  }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    ok = false;
  }

  if (!ok) return;

  form.reset();
  status.textContent = "Message sent (demo).";
});
