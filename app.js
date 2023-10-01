const DomElements = (function () {
  const formEl = document.querySelector("[data-form]");
  const listEl = document.querySelector("[data-lists]");
  const inputEL = document.querySelector("[data-input]");
  const deleteEl = document.querySelector("[data-deleteAll]");
  return { formEl, listEl, inputEL, deleteEl };
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

  updateDataBaseAndDisplay() {
    Storage.addStorage("data", this.todos);
    UI.displayTodos(this.todos);
  }

  addTask(todo, id = this.todos.length) {
    const newTodo = new Todo(todo, id);
    this.todos.push(newTodo);
    this.updateDataBaseAndDisplay();
  }

  removeTodo(id) {
    this.todos = this.todos.filter((item) => item.id !== +id);
    this.updateDataBaseAndDisplay();
  }

  deleteAll() {
    this.todos = [];
    this.updateDataBaseAndDisplay();
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

DomElements.deleteEl.addEventListener("click", () => {
  allTodos.deleteAll();
});

window.addEventListener("DOMContentLoaded", () => {
  UI.displayTodos(allTodos.todos);
});
