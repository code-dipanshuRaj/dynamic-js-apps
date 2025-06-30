let todoList = [
  {
    id : 1,
    task : "Learn JavaScript",
    completed : false,
  },
  {
    id : 2,
    task : "Learn React",
    completed : false,
  },
  {
    id : 3,
    task : "Learn Node.js",
    completed : false,
  },
]

if(!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify(todoList));
}
renderTodoList();

function addTodo(){
  const task = document.querySelector("#taskInput").value;
  if (task) {
    // Get the current todo list from local storage
    const todoList = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = {
      id: Date.now(),
      task: task,
      completed: false
    };
    todoList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(todoList));
    document.querySelector("#taskInput").value = "";
    renderTodoList();
  }
}

function renderTodoList() {
  const todoList = JSON.parse(localStorage.getItem("tasks")) || [];
  const todoContainer = document.getElementById("todoContainer");
  todoContainer.innerHTML = ""; // Clear the container
  todoList.forEach(task => {
    todoContainer.innerHTML += `
    <div class="grid grid-cols-[1fr_auto] items-center bg-white p-2 rounded shadow">
      <span class="text-center text-2xl break-words overflow-hidden">${task.task}</span>
      <button class="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded" onclick="deleteTask(${task.id})">Delete</button>
    </div>
    `;
  });
}

function deleteTask(id) {
  let todoList = JSON.parse(localStorage.getItem("tasks"));
  todoList = todoList.filter(task => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(todoList));
  renderTodoList();
}