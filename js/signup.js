// Selecting HTML elements
let userNameInput = document.getElementById("userName");
let userEmailInput = document.getElementById("userEmail");
let userPasswordInput = document.getElementById("password");
let nameMessage = document.getElementById("nameMessage");
let emailMessage = document.getElementById("emailMessage");
let passMessage = document.getElementById("passMessage");
let signUpBtn = document.getElementById("signUpBtn");

// Retrieving users from local storage or initializing an empty array
allUsers = JSON.parse(localStorage.getItem("users")) || [];

// Regular expressions for validation
let regexName = /^(\w){3,20}$/;
let regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
let regexPass =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Event listeners for input fields on blur
userNameInput.addEventListener("blur", function () {
  validationName(regexName, userNameInput, nameMessage);
});

userEmailInput.addEventListener("blur", function () {
  validationName(regexEmail, userEmailInput, emailMessage);
});

userPasswordInput.addEventListener("blur", function () {
  validationName(regexPass, userPasswordInput, passMessage);
});

// Function for name validation
function validationName(regex, userInput, message) {
  if (regex.test(userInput.value)) {
    userInput.classList.add("is-valid");
    userInput.classList.remove("is-invalid");
    message.classList.add("d-none");
    message.classList.remove("d-block");
    return true;
  } else {
    userInput.classList.add("is-invalid");
    userInput.classList.remove("is-valid");
    message.classList.add("d-block");
    message.classList.remove("d-none");
    return false;
  }
}

// Function to handle user sign-up
function signUp() {
  var user = {
    name: userNameInput.value,
    email: userEmailInput.value,
    pass: userPasswordInput.value,
  };
  if (
    validationName(regexName, userNameInput, nameMessage) &&
    validationName(regexEmail, userEmailInput, emailMessage) &&
    validationName(regexPass, userPasswordInput, passMessage)
  ) {
    // Checking if the email already exists
    for (var i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email == userEmailInput.value) {
        // Displaying an error message for existing email
        Swal.fire({
          icon: "error",
          title: "Email Already Exist!",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
    }
    // Adding a new user and storing it in local storage
    allUsers.push(user);
    localStorage.setItem("users", JSON.stringify(allUsers));
    // Displaying success message and redirecting to the login page
    Swal.fire({
      icon: "success",
      title: "Sign UP Successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      location.href = "index.html";
    });
  }
}

// Disable copy and paste events for the password input field
userPasswordInput.addEventListener("copy", function (e) {
  e.preventDefault();
});

userPasswordInput.addEventListener("cut", function (e) {
  e.preventDefault();
});

userPasswordInput.addEventListener("paste", function (e) {
  e.preventDefault();
});

// Event listener for sign-up button click
signUpBtn.addEventListener("click", function (event) {
  signUp();
});
