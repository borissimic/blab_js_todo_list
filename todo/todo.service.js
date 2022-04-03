import { TODO_LOCAL_STORAGE_KEY } from "./todo.constants.js";
import { Todo } from "./todo.model.js";

export const getTodoElements = () => [...document.querySelectorAll(".todo")];

const _getTodoTemplate = (text, i) => `
<input type="checkbox" name="checkbox-${i}" id="checkbox-${i}" />
<label for="checkbox-${i}">${text}</label>
<button>&#10005;</button>
`;

export function saveToLocalStorage(todoElements) {
  const todoInstances = _getAllTodos(todoElements);
  localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todoInstances));
}

const _getAllTodos = (todoElements) =>
  [...todoElements].reverse().map((todoElement) => {
    const text = todoElement.querySelector("label").innerText;
    const isDone = todoElement.querySelector("input").checked;
    return new Todo(text, isDone);
  });

export function addNewTodo({ text, isDone }) {
  const i = getTodoElements().length || 0;

  const divElement = document.createElement("div");
  divElement.classList.add("todo");
  divElement.innerHTML = _getTodoTemplate(text, i);

  const inputElement = divElement.querySelector("input");
  inputElement.checked = isDone;
  inputElement.addEventListener("change", () =>
    saveToLocalStorage(getTodoElements())
  );
  const buttonElement = divElement.querySelector("button");
  buttonElement.addEventListener("click", () => {
    if (confirm("jesi li siguran?")) {
      divElement.remove();
      saveToLocalStorage(getTodoElements());
    }
  });

  document.querySelector("main").prepend(divElement);

  // dodaj u local storage nakon kreiranja novog todo-a
  saveToLocalStorage(getTodoElements());
}
