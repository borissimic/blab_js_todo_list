import { Todo, addNewTodo } from "./todo/index.js";

// localStorage.setItem("TODOS", JSON.stringify(todos));
const localStorageTodos = JSON.parse(localStorage.getItem("TODOS"));
if (localStorageTodos) {
  [...localStorageTodos].forEach(addNewTodo);
}

const todoForm = document.forms.namedItem("todo-form");
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = todoForm.querySelector("input").value;
  const newTodo = new Todo(inputValue);
  addNewTodo(newTodo);
  todoForm.reset();
});
