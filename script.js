// declare variable dom
let btnSubmitDOM = document.querySelector("#btnSubmit");
let newTaskDOM = document.querySelector("#newTask");
let ListContainerDOM = document.querySelector("#ListContainer");
let importantCheckboxDOM = document.querySelector("#importantCheckbox");

// On web/app load, get all tasks from localStorage
window.onload = LoadTasksOnPageReload;

// Declare functions

// 1.
// Load all Tasks on page reload
function LoadTasksOnPageReload() {
  // Get the tasks from localStorage and convert it to an array
  let allTasks = JSON.parse(localStorage.getItem("allTasks"));

  // Loop through the tasks and add them to the list
  for (let i = 0; i < allTasks.length; i++) {
    let taskText = allTasks[i].text;
    let marked = allTasks[i].marked;
    let isImportant = allTasks[i].isImportant;
    loadTask(taskText, marked, isImportant);
  }
}

// 2.
// Load one task
function loadTask(taskText, marked, isImportant) {
  // create new li
  let newLiDOM = document.createElement("li");
  ListContainerDOM.appendChild(newLiDOM);

  // create new div checkbox
  let newDivCheckboxDOM = document.createElement("div");
  newDivCheckboxDOM.className = "checkbox";
  newLiDOM.appendChild(newDivCheckboxDOM);

  //  create new input checkbox
  let newInputDOM = document.createElement("input");
  newInputDOM.type = "checkbox";
  newInputDOM.name = "doneCheckbox";
  newDivCheckboxDOM.appendChild(newInputDOM);

  newInputDOM.addEventListener("change", () => {
    if (newInputDOM.checked) {
      markTask(newInputDOM);
    } else {
      unmarkTask(newInputDOM);
    }
  });

  if (marked) {
    newInputDOM.checked = true;
  }

  // create new p for task items
  let newpDOM = document.createElement("p");
  newpDOM.classList = "task-items";
  newLiDOM.appendChild(newpDOM);
  newpDOM.innerText = taskText;

  if (marked) {
    newpDOM.style.textDecoration = "Line-through";
  }

  // create new div button groups
  let newDivButtonGroupDOM = document.createElement("div");
  newDivButtonGroupDOM.className = "button-groups";
  newLiDOM.appendChild(newDivButtonGroupDOM);

  // create new edit button
  // create button for edit button
  let newEditBtnDOM = document.createElement("button");
  newEditBtnDOM.classList = "edit-btn";
  // edit task when pressing button "pencil";
  newEditBtnDOM.addEventListener("click", (btn) => {
    editTask(btn);
  });
  newDivButtonGroupDOM.appendChild(newEditBtnDOM);
  // create svg
  let newEditSVGDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  newEditSVGDOM.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  newEditSVGDOM.setAttribute("fill", "none");
  newEditSVGDOM.setAttribute("viewBox", "0 0 24 24");
  newEditSVGDOM.setAttribute("stroke-width", "1.5");
  newEditSVGDOM.setAttribute("stroke", "currentColor");
  newEditSVGDOM.setAttribute("class", "w-6 h-6");
  newEditSVGDOM.setAttribute("width", "20px");
  newEditSVGDOM.setAttribute("display", "inline-block");
  // create path
  let newEditPathDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  newEditPathDOM.setAttribute("stroker-linecap", "round");
  newEditPathDOM.setAttribute("stroker-linejoin", "round");
  newEditPathDOM.setAttribute(
    "d",
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
  );
  newEditSVGDOM.appendChild(newEditPathDOM);
  newEditBtnDOM.appendChild(newEditSVGDOM);

  // create new delete button
  // create button for delete button
  let newDeleteBtnDOM = document.createElement("button");
  newDeleteBtnDOM.classList = "delete-btn";
  newDivButtonGroupDOM.appendChild(newDeleteBtnDOM);
  // delete task when pressing button "x";
  newDeleteBtnDOM.addEventListener("click", (btn) => {
    deleteTask(btn);
  });
  // create svg
  let newDeleteSVGDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  newDeleteSVGDOM.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  newDeleteSVGDOM.setAttribute("fill", "none");
  newDeleteSVGDOM.setAttribute("viewBox", "0 0 24 24");
  newDeleteSVGDOM.setAttribute("stroke-width", "1.5");
  newDeleteSVGDOM.setAttribute("stroke", "currentColor");
  newDeleteSVGDOM.setAttribute("class", "w-6 h-6");
  newDeleteSVGDOM.setAttribute("width", "20px");
  // create path
  let newDeletePathDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  newDeletePathDOM.setAttribute("stroker-linecap", "round");
  newDeletePathDOM.setAttribute("stroker-linejoin", "round");
  newDeletePathDOM.setAttribute(
    "d",
    "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  );
  newDeleteSVGDOM.appendChild(newDeletePathDOM);
  newDeleteBtnDOM.appendChild(newDeleteSVGDOM);

  //Check and Highlight the important task with yellow
  if (isImportant) {
    // add style to newLiTask = color:red
    newpDOM.style.backgroundColor = "yellow";
  }
}

// add new task when press button "+"
btnSubmitDOM.addEventListener("click", newTask);
document.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    newTask();
  }
});

// 3.
// Create a new task
function newTask() {
  // safe guard, condition
  if (newTaskDOM.value === "") return;

  // create new li
  let newLiDOM = document.createElement("li");
  ListContainerDOM.appendChild(newLiDOM);

  // create new div checkbox
  let newDivCheckboxDOM = document.createElement("div");
  newDivCheckboxDOM.className = "checkbox";
  newLiDOM.appendChild(newDivCheckboxDOM);

  //  create new input checkbox
  let newInputDOM = document.createElement("input");
  newInputDOM.type = "checkbox";
  newInputDOM.name = "doneCheckbox";
  newDivCheckboxDOM.appendChild(newInputDOM);
  newInputDOM.addEventListener("change", () => {
    if (newInputDOM.checked) {
      markTask(newInputDOM);
    } else {
      unmarkTask(newInputDOM);
    }
  });

  // create new p for task items
  let newpDOM = document.createElement("p");
  newpDOM.classList = "task-items";
  newLiDOM.appendChild(newpDOM);
  newpDOM.innerText = newTaskDOM.value;

  // create new div button groups
  let newDivButtonGroupDOM = document.createElement("div");
  newDivButtonGroupDOM.className = "button-groups";
  newLiDOM.appendChild(newDivButtonGroupDOM);

  // create new edit button
  // create button for edit button
  let newEditBtnDOM = document.createElement("button");
  newEditBtnDOM.classList = "edit-btn";
  // edit task when pressing button "pencil";
  newEditBtnDOM.addEventListener("click", (btn) => {
    editTask(btn);
  });
  newDivButtonGroupDOM.appendChild(newEditBtnDOM);
  // create svg
  let newEditSVGDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  newEditSVGDOM.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  newEditSVGDOM.setAttribute("fill", "none");
  newEditSVGDOM.setAttribute("viewBox", "0 0 24 24");
  newEditSVGDOM.setAttribute("stroke-width", "1.5");
  newEditSVGDOM.setAttribute("stroke", "currentColor");
  newEditSVGDOM.setAttribute("class", "w-6 h-6");
  newEditSVGDOM.setAttribute("width", "20px");
  newEditSVGDOM.setAttribute("display", "inline-block");
  // create path
  let newEditPathDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  newEditPathDOM.setAttribute("stroker-linecap", "round");
  newEditPathDOM.setAttribute("stroker-linejoin", "round");
  newEditPathDOM.setAttribute(
    "d",
    "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
  );
  newEditSVGDOM.appendChild(newEditPathDOM);
  newEditBtnDOM.appendChild(newEditSVGDOM);

  // create new delete button
  // create button for delete button
  let newDeleteBtnDOM = document.createElement("button");
  newDeleteBtnDOM.classList = "delete-btn";
  newDivButtonGroupDOM.appendChild(newDeleteBtnDOM);
  // delete task when pressing button "x";
  newDeleteBtnDOM.addEventListener("click", (btn) => {
    deleteTask(btn);
  });
  // create svg
  let newDeleteSVGDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  newDeleteSVGDOM.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  newDeleteSVGDOM.setAttribute("fill", "none");
  newDeleteSVGDOM.setAttribute("viewBox", "0 0 24 24");
  newDeleteSVGDOM.setAttribute("stroke-width", "1.5");
  newDeleteSVGDOM.setAttribute("stroke", "currentColor");
  newDeleteSVGDOM.setAttribute("class", "w-6 h-6");
  newDeleteSVGDOM.setAttribute("width", "20px");
  // create path
  let newDeletePathDOM = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  newDeletePathDOM.setAttribute("stroker-linecap", "round");
  newDeletePathDOM.setAttribute("stroker-linejoin", "round");
  newDeletePathDOM.setAttribute(
    "d",
    "M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  );
  newDeleteSVGDOM.appendChild(newDeletePathDOM);
  newDeleteBtnDOM.appendChild(newDeleteSVGDOM);

  //Highlight the important task with yellow
  let isImportant = importantCheckboxDOM.checked;
  if (isImportant) {
    // add style to newLiTask = color:red
    newpDOM.style.backgroundColor = "yellow";
  }

  // Update local storage
  appendTaskToStorage(newTaskDOM.value, isImportant);

  // Reset input
  resetForm();
}

// 4.
// Reset the input of form to add a new task
function resetForm() {
  // empty the form
  newTaskDOM.value = "";
  //   reset value of check box unchecked
  importantCheckboxDOM.checked = false;
}

// 5.
// Delete a task
function deleteTask(e) {
  parent = e.currentTarget.parentElement.parentElement;
  parent.remove();
  // update local storage
  taskTextDOM = parent.querySelector(".task-items");
  taskText = taskTextDOM.innerText;
  removeTaskFromStorage(taskText);
}

// 6.
// Edit a task
function editTask(e) {
  parent = e.currentTarget.parentElement.parentElement;
  taskTextDOM = parent.querySelector(".task-items");
  taskText = taskTextDOM.innerText;
  editedText = prompt("Edit your task here", taskText);

  if (!editedText) return;
  else {
    if (editedText != "") {
      taskTextDOM.innerText = editedText;
      // update local storage
      saveChangeTaskLocalStorage(taskText, editedText);
    }
  }
}

// 7.
// Mark task completed
function markTask(checkboxDOM) {
  parent = checkboxDOM.parentElement.parentElement;
  taskTextDOM = parent.querySelector(".task-items");
  taskTextDOM.style.textDecoration = "Line-through";
  // update local storage
  saveMarkedLocalStorage(taskTextDOM.innerText, checkboxDOM.checked);
}

// 8.
// Unmark task completed
function unmarkTask(checkboxDOM) {
  parent = checkboxDOM.parentElement.parentElement;
  taskTextDOM = parent.querySelector(".task-items");
  taskTextDOM.style.textDecoration = "none";
  saveMarkedLocalStorage(taskTextDOM.innerText, checkboxDOM.checked);
}

// Declare functions to update local storage
// 1.
// Append new task to local storage
function appendTaskToStorage(taskText, isImportant) {
  // Parse any JSON previously stored in allTasks
  var existingTasks = JSON.parse(localStorage.getItem("allTasks"));
  if (existingTasks == null) existingTasks = [];

  var task = {
    text: taskText,
    marked: false,
    isImportant: isImportant,
  };

  localStorage.setItem("task", JSON.stringify(task));
  existingTasks.push(task);

  // Save allTasks back to local storage
  localStorage.setItem("allTasks", JSON.stringify(existingTasks));
}

// 2.
// Update Marked(Completed) in local storage
function saveMarkedLocalStorage(taskText, checked) {
  // Parse any JSON previously stored in allTasks
  var existingTasks = JSON.parse(localStorage.getItem("allTasks"));
  if (existingTasks == null) existingTasks = [];

  let text = JSON.parse(localStorage.getItem("text"));
  for (let i = 0; i < existingTasks.length; i++) {
    if (existingTasks[i].text === taskText) {
      existingTasks[i].marked = checked;
    }
  }
  // Save allTasks back to local storage
  localStorage.setItem("allTasks", JSON.stringify(existingTasks));
}

// 3.
// Remove task from local storage
function removeTaskFromStorage(taskText) {
  // Parse any JSON previously stored in allTasks
  var existingTasks = JSON.parse(localStorage.getItem("allTasks"));
  if (existingTasks == null) existingTasks = [];

  for (let i = 0; i < existingTasks.length; i++) {
    if (existingTasks[i].text === taskText) {
      // remove item from array
      existingTasks.splice(i, 1);
    }
  }

  // Save allTasks back to local storage
  localStorage.setItem("allTasks", JSON.stringify(existingTasks));
}

// 4.
// Save change of the task text in local storage
function saveChangeTaskLocalStorage(taskText, newtaskText) {
  // Parse any JSON previously stored in allTasks
  var existingTasks = JSON.parse(localStorage.getItem("allTasks"));
  if (existingTasks == null) existingTasks = [];
  let text = JSON.parse(localStorage.getItem("text"));

  for (let i = 0; i < existingTasks.length; i++) {
    if (existingTasks[i].text === taskText) {
      existingTasks[i].text = newtaskText;
    }
  }

  // Save allTasks back to local storage
  localStorage.setItem("allTasks", JSON.stringify(existingTasks));
}

// Reset storage variables (to use for testing & debugging)
// existingTasks = [];
// localStorage.setItem("allTasks", JSON.stringify(existingTasks));
