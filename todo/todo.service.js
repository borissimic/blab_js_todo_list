import { Todo } from "./todo.model.js";

export function addNewTodo({ text, isDone }) {
  const todoElements = document.querySelectorAll("main > div");
  const i = todoElements.length || 0;

  const divElement = document.createElement("div");
  divElement.classList.add("todo");
  divElement.innerHTML = _getTodoTemplate(text, i);

  const inputElement = divElement.querySelector("input");
  inputElement.checked = isDone;

  document.querySelector("main").prepend(divElement);
  // dodaj u local storage nakon kreiranja novog todo-a
  const todosElements = document.querySelectorAll(".todo");
  const realTodos = [...todosElements].reverse().map((todoElement) => {
    const text = todoElement.querySelector("label").innerText;
    const isDone = todoElement.querySelector("input").checked;
    return new Todo(text, isDone);
  });

  localStorage.setItem("TODOS", JSON.stringify(realTodos));
}

const _getTodoTemplate = (text, i) => `
<input type="checkbox" name="checkbox-${i}" id="checkbox-${i}" />
<label for="checkbox-${i}">${text}</label>
`;
