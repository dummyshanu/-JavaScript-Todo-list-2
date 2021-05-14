const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#list");
const todoTemplate = document.querySelector("#list-item-template");

const Prefix = "JS-TODO-LIST";
const todokey = `${Prefix}-todos`;
let todos = loadTodos() || [];

// Load Todos
todos.forEach((todo) => {
  showTodo(todo);
});

// Add Todo
form.addEventListener("submit", addTodo);

// Updateing Todos
list.addEventListener("change", (event) => {
  if (!event.target.matches("[data-list-item-checkbox]")) return;

  const currentTodo = event.target.closest(".list-item");
  const currentTodoId = currentTodo.dataset.todoId
//   const todoCheckbox = currentTodo.querySelector("[data-list-item-checkbox]")
//   console.log(todoCheckbox.checked)
  const UpadateTodo = todos.find(todo=> todo.id === currentTodoId) 
  UpadateTodo.complete = event.target.checked
  saveTodos()

});

// Delete todos
list.addEventListener("click", (event) => {
    if (!event.target.matches(".delete-btn")) return;
    
    
    const currentTodo = event.target.closest(".list-item");
    const currentTodoId = currentTodo.dataset.todoId
    currentTodo.remove()
    todos = todos.filter(todo=> todo.id !== currentTodoId) 
    saveTodos()
  
  });





function addTodo(event) {
  event.preventDefault();
  const todo = form.querySelector("#todo-input");

  if (todo.value == "") return;

  const newTodo = {
    name: todo.value,
    complete: false,
    id: `${new Date().valueOf()}`,
  };

  todos.push(newTodo);
  showTodo(newTodo);
  saveTodos();
  todo.value = "";
}

function showTodo(todo) {
  const templateClone = todoTemplate.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  const templateTodoInput = templateClone.querySelector(
    "[data-list-item-text]"
  );
  const templateTodoCheckbox = templateClone.querySelector("[data-list-item-checkbox]")
  templateTodoInput.innerHTML = todo.name;
  templateTodoCheckbox.checked = todo.complete
  list.appendChild(templateClone);
}

function saveTodos() {
  localStorage.setItem(todokey, JSON.stringify(todos));
}
function loadTodos() {
  const localTodos = localStorage.getItem(todokey);
  return JSON.parse(localTodos);
}

function deleteTodo() {}
