let passwordInput = document.getElementById("password");
let eyeIcon = document.getElementById("eyeIcon");


function togglePasswordVisibility() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
}

eyeIcon.addEventListener("click", function () {
  togglePasswordVisibility();
});

