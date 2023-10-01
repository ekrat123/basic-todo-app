const formEl = document.querySelector("[data-form]");
const listEl = document.querySelector("[data-lists]");
const inputEL = document.querySelector("[data-input]");

class Storage {
  static addStorage(data) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  static getData() {
    return JSON.parse(localStorage.getItem("data"));
  }
}

let todos = Storage.getData() || [];

class Todo {
  constructor(todo, id) {
    this.id = id;
    this.todo = todo;
  }
}

class UI {
  static displayTodos() {
    let tasks = todos.map((item) => {
      return `<div class="todo"><p>
            ${item.todo}
          </p>
          <span class = "remove" data-id =${item.id}>🗑️</span> </div>`;
    });
    listEl.innerHTML = tasks.join(" ");
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (inputEL.value) {
    const newTodo = new Todo(inputEL.value, todos.length);
    todos.push(newTodo);
    Storage.addStorage(todos);
    UI.displayTodos();
    inputEL.value = "";
  }
});

function removeTodo(id) {
  todos = todos.filter((item) => item.id !== +id);
  Storage.addStorage(todos);
  UI.displayTodos();
}

listEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    removeTodo(e.target.dataset.id);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  UI.displayTodos();
});
