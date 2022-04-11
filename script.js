import {
  Todo,
  addNewTodo,
  TODO_LOCAL_STORAGE_KEY,
  getTodoElements,
  saveToLocalStorage,
} from "./todo/index.js";

const localStorageTodos = JSON.parse(
  localStorage.getItem(TODO_LOCAL_STORAGE_KEY)
);
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

const _getAllDoneTodoElements = () =>
  getTodoElements().filter(
    (todoElement) => todoElement.querySelector("input").checked
  );

const deleteDoneButton = document.getElementById("remove-done");
deleteDoneButton.addEventListener("click", () => {
  _getAllDoneTodoElements().forEach((todoElement) => todoElement.remove());
  saveToLocalStorage(getTodoElements());
});
