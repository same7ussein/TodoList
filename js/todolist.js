// Selecting HTML elements
let userNameTag = document.getElementById("userName");
let logoutBtn = document.getElementById("logout");
let inputBx = document.getElementById("inputBx");
let list = document.getElementById("list");
let userName = localStorage.getItem("userName");


// Redirect to the login page if not logged in
if (!userName) {
  location.href = "index.html";
}

// Displaying the username in the UI
userNameTag.textContent = userName;

// Function to load tasks from local storage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks_" + userName)) || [];
  // to do auto focus on input 
  inputBx.focus();
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].text) {
      addItem(tasks[i].text, tasks[i].completed);
    }
  }

  initializeSortable();
}

loadTasks();

// Function to save tasks to local storage
function saveTasks() {
  let tasks = [];
  let taskItems = list.getElementsByTagName("li");
  for (let i = 0; i < taskItems.length; i++) {
    tasks.push({
      text: taskItems[i].innerText.trim(),
      completed: taskItems[i].classList.contains("done"),
    });
  }
  localStorage.setItem("tasks_" + userName, JSON.stringify(tasks));
}

// Function to handle user logout
function userLogout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("loggedIn");
  location.href = "index.html";
}

// Event listener for logout button click
logoutBtn.addEventListener("click", function () {
  userLogout();
});

// Event listener for input box keyup event
inputBx.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    addItem(this.value);
    this.value = "";
    saveTasks();
  }
});

// Function to add a new item to the task list
function addItem(inputBxValue, completed = false) {
  if (inputBxValue.trim() !== "") {
    let listItem = document.createElement("li");
    if (completed) {
      listItem.classList.add("done");
    }
    listItem.innerHTML = `
        <i class="list-icon fa-solid fa-check"></i>
        ${inputBxValue} 
        <i id="closeIconBtn" class="fa-solid fa-xmark"></i>
        `;

    listItem.addEventListener("click", function () {
      this.classList.toggle("done");
      saveTasks();
    });

    listItem
      .querySelector("#closeIconBtn")
      .addEventListener("click", function (e) {
        // it solve problem when click on this button and click cancel it do task as completed or if task completed it do uncompleted
        // Stop event propagation to the parent li element
        e.stopPropagation();
        Swal.fire({
          title: "Are you sure?",
          text: "You want to delete this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            listItem.remove();
            saveTasks();
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      });

    list.appendChild(listItem);
  }
}

// Function to initialize Sortable for the task list
function initializeSortable() {
  new Sortable(list, {
    animation: 150,
    onEnd: saveTasks,
  });
}
