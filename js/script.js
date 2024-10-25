let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    isCompleted: false,
    isEditing: false
  };

  tasks.push(task);
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    if (task.isEditing) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task.text;
      editInput.classList.add("form-control", "edit-input");
      editInput.onblur = () => saveTaskEdit(task.id, editInput.value);
      taskItem.appendChild(editInput);
      editInput.focus();
    } else {
      taskItem.innerHTML = `
        <span class="${task.isCompleted ? "completed-task" : ""}">${task.text}</span>
        <div>
          <button class="btn btn-success btn-sm" onclick="toggleTaskCompletion(${task.id})">${task.isCompleted ? "Undo" : "Complete"}</button>
          <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
        </div>
      `;
    }

    taskList.appendChild(taskItem);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  task.isCompleted = !task.isCompleted;
  renderTasks();
}

function editTask(taskId) {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, isEditing: true } : { ...task, isEditing: false }
  );
  renderTasks();
}

function saveTaskEdit(taskId, newText) {
  if (newText.trim() === "") {
    alert("Task text cannot be empty.");
    return;
  }

  const task = tasks.find((task) => task.id === taskId);
  task.text = newText;
  task.isEditing = false;
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}
