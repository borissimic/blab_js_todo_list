import { TODO_LOCAL_STORAGE_KEY } from "./todo.constants.js";
import { Todo } from "./todo.model.js";

const _getTodoTemplate = (text, i) => `
<input type="checkbox" name="checkbox-${i}" id="checkbox-${i}" />
<label for="checkbox-${i}">${text}</label>
<button>&#10005;</button>
`;

const _createTodoElement = (text) => {
  const divElement = document.createElement("div");
  divElement.classList.add("todo");
  divElement.innerHTML = _getTodoTemplate(text, getTodoElements().length || 0);
  return divElement;
};

const _getAllTodos = (todoElements) =>
  [...todoElements].reverse().map((todoElement) => {
    const text = todoElement.querySelector("label").innerText;
    const isDone = todoElement.querySelector("input").checked;
    return new Todo(text, isDone);
  });

export const getTodoElements = () => [...document.querySelectorAll(".todo")];

export function saveToLocalStorage() {
  const todos = _getAllTodos(getTodoElements());
  localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todos));
}

export function addNewTodo({ text, isDone }) {
  const todoElement = _createTodoElement(text);

  const inputElement = todoElement.querySelector("input");
  inputElement.checked = isDone;
  inputElement.addEventListener("change", () => saveToLocalStorage());

  todoElement.querySelector("button").addEventListener("click", () => {
    if (confirm("Jesi siguran?")) {
      todoElement.remove();
      saveToLocalStorage();
    }
  });

  document.querySelector("main").prepend(todoElement);

  saveToLocalStorage();
}
