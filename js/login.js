// Selecting HTML elements
let userEmail = document.getElementById("userEmail");
let userPass = document.getElementById("password");
let rememberMe = document.getElementById("rememberMe");
let signInBtn = document.getElementById("signInBtn");
let userName = localStorage.getItem("userName");

// Retrieving users from local storage or initializing an empty array
let allusers = JSON.parse(localStorage.getItem("users")) || [];

// Function to handle user sign-in
function signIn() {
  var user = {
    email: userEmail.value,
    pass: userPass.value,
  };

  // Checking user credentials against stored users
  for (var i = 0; i < allusers.length; i++) {
    if (allusers[i].email == user.email) {
      if (allusers[i].pass == user.pass) {
        // Displaying success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.setItem("userName", allusers[i].name);
          location.href = "todolist.html";
        });
        return;
      } else {
        // Displaying error message for incorrect password
        Swal.fire({
          icon: "error",
          title: "Password Not Correct",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    }
  }
  // Displaying error message for email not found
  Swal.fire({
    icon: "error",
    title: "Email Not Found",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Event listener for sign-in button click
signInBtn.addEventListener("click", function () {
  signIn();
});

// Redirect to the to-do list page if already logged in
if (userName) {
  location.href = "todolist.html";
}

// Disable copy and paste events for the password input field
userPass.addEventListener("copy", function (e) {
  e.preventDefault();
});

userPass.addEventListener("cut", function (e) {
  e.preventDefault();
});

userPass.addEventListener("paste", function (e) {
  e.preventDefault();
});