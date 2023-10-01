const DomElements = (function () {
  const formEl = document.querySelector("[data-form]");
  const listEl = document.querySelector("[data-lists]");
  const inputEL = document.querySelector("[data-input]");
  return { formEl, listEl, inputEL };
})();

class Storage {
  static addStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
}

class Todo {
  constructor(todo, id) {
    this.id = id;
    this.todo = todo;
  }
}

class Project {
  constructor() {
    this.todos = Storage.getData("data");
  }

  addTask(todo, id = this.todos.length) {
    const newTodo = new Todo(todo, id);
    this.todos.push(newTodo);
    Storage.addStorage("data", this.todos);
    UI.displayTodos(this.todos);
  }

  removeTodo(id) {
    this.todos = this.todos.filter((item) => item.id !== +id);
    Storage.addStorage("data", this.todos);
    UI.displayTodos(this.todos);
  }
}

class UI {
  static displayTodos(todos) {
    const tasks = todos.map((item) => {
      return `<div class="todo"><p>
            ${item.todo}
          </p>
          <span class = "remove" data-id =${item.id}>🗑️</span> </div>`;
    });
    DomElements.listEl.innerHTML = tasks.join(" ");
  }
}

const allTodos = new Project();

DomElements.formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (DomElements.inputEL.value) {
    allTodos.addTask(DomElements.inputEL.value);
    DomElements.inputEL.value = "";
  }
});

DomElements.listEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    allTodos.removeTodo(e.target.dataset.id);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  UI.displayTodos(allTodos.todos);
});
