function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function showError(el, message) {
  el.textContent = message;
}

function clearError(el) {
  el.textContent = "";
}

function validateRegister(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorEl = document.getElementById("registerError");

  if (!fullName || !email || !password || !confirmPassword) {
    showError(errorEl, "All fields are required.");
    return false;
  }

  if (!isValidEmail(email)) {
    showError(errorEl, "Please enter a valid email address.");
    return false;
  }

  if (password.length < 6) {
    showError(errorEl, "Password must be at least 6 characters.");
    return false;
  }

  if (password !== confirmPassword) {
    showError(errorEl, "Passwords do not match.");
    return false;
  }

  const user = { fullName, email, password };
  localStorage.setItem("authUser", JSON.stringify(user));
  console.log({ fullName, email, password });

  clearError(errorEl);

  
  
  

  
  showError(errorEl, "✔ Registered! You can now login.");
  errorEl.style.color = "#059669";
  return true;
}
function validateLogin(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  if (!email || !password) {
    showError(errorEl, "Please fill in both fields.");
    return false;
  }

  if (!isValidEmail(email)) {
    showError(errorEl, "Email format is incorrect.");
    return false;
  }

  const raw = localStorage.getItem("authUser");
  if (!raw) {
    showError(errorEl, "No user found. Please register first.");
    return false;
  }

  let user;
  try {
    user = JSON.parse(raw);
  } catch (e) {
    showError(errorEl, "Stored user is corrupted. Please register again.");
    return false;
  }showError

  if (email === user.email && password === user.password) {
    clearError(errorEl);
    alert("Login successful!");
    return true;
  } else {
    showError(errorEl, "Invalid email or password.");
    return false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", validateRegister);
  }
  if (loginForm) {
    loginForm.addEventListener("submit", validateLogin);
  }
});
