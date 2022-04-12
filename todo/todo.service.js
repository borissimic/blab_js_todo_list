import { deleteTodo, updateTodoCompleted } from "./index.js";

const _getTodoTemplate = (text, i) => `
<input type="checkbox" name="checkbox-${i}" id="checkbox-${i}" />
<label for="checkbox-${i}">${text}</label>
<button>&#10005;</button>
<button id = "edit_button">Edit me</button>
`;

const _createTodoElement = (text) => {
  const divElement = document.createElement("div");
  divElement.classList.add("todo");
  divElement.innerHTML = _getTodoTemplate(text, getTodoElements().length || 0);
  return divElement;
};

export const getTodoElements = () => [...document.querySelectorAll(".todo")];

export function addNewTodo({ id, text, isDone }) {
  const todoElement = _createTodoElement(text);

  const inputElement = todoElement.querySelector("input");
  inputElement.checked = isDone;
  inputElement.addEventListener("change", () =>
    updateTodoCompleted(id, inputElement.checked)
  );

  todoElement.querySelector("button").addEventListener("click", () => {
    if (confirm("Jesi siguran?")) {
      todoElement.remove();
      deleteTodo(id);
    }
  });

  document.querySelector("main").prepend(todoElement);
}
