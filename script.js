let tasks = [];
const tableList = document.getElementById("table");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");
const buttonToAddInput = document.getElementById("add-task-button");

// Function to add task in a list DOM
function addTaskToDom(task) {
  // Created a row for table
  let row = document.createElement("tr");

  // Cells for a particular row
  let c1 = document.createElement("td");
  let c2 = document.createElement("td");
  let c3 = document.createElement("td");
  let c4 = document.createElement("td");

  // Insert data to cells
  c1.innerHTML = `
     <input type="checkbox" id="${task.id}" class="custom-checkbox">
  `;
  c2.innerText = task.text;
  c3.innerText = task.done;
  c4.innerHTML = `
    <img src="bin.png" class="delete" id="${task.id}"/>
  `;

  // Append cells to row
  row.appendChild(c1);
  row.appendChild(c2);
  row.appendChild(c3);
  row.appendChild(c4);

  // Append row to table
  tableList.appendChild(row);
}

// Function to render list
function renderList() {
  tableList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }
  tasksCounter.innerHTML = tasks.length;
}

// Function to toggle task
function toggleTask(taskId) {
  const task = tasks.filter((task) => task.id === taskId);
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();
    showNotification("Task toggled successfully");
    return;
  }

  showNotification("Could not toggle the task");
}

// Function to perfom delete task
function deleteTask(taskId) {
  const newTasks = tasks.filter((task) => task.id !== taskId);
  tasks = newTasks;
  renderList();
  showNotification("Task deleted successfully");
}

// Function to add task in tasks array
function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();
    showNotification("Task added successfully");
    return;
  }

  showNotification("Task cannot be added");
}

// Function create alerts
function showNotification(text) {
  alert(text);
}

// Function to implement functionality when someone clicks on add button
function handleInputKeypress() {
  const text = addTaskInput.value;
  if (!text) {
    showNotification("Task text cannot be empty");
    return;
  }

  const task = {
    text,
    id: Date.now().toString(),
    done: false,
  };

  addTaskInput.value = "";
  addTask(task);
}

// function to handle click listeners
function handleClickEventListener(e) {
  const target = e.target;

  if (target.className === "delete") {
    const taskId = target.id;
    deleteTask(taskId);
    return;
  } else if (target.className === "custom-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);
    return;
  }
}

document.addEventListener("click", handleClickEventListener);
