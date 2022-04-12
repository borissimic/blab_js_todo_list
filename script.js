import {
  addNewTodo,
  getTodoElements,
  getTodos,
  postTodo,
  deleteTodo,
} from "./todo/index.js";

const todos = await getTodos();

if (todos) {
  [...todos].forEach(addNewTodo);
}
// dodavanje novog todo-a
const todoForm = document.forms.namedItem("todo-form");
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = todoForm.querySelector("input").value;

  postTodo(title).then(addNewTodo);
  todoForm.reset();
});
//klikom na button "obrisi sve odabrane bi se trebali ukloniti svi todo-vi koji su "gotovi"i update local storage
const _getAllDoneTodoElements = () =>
  getTodoElements().filter(
    (todoElement) => todoElement.querySelector("input").checked
  );

document.getElementById("remove-done").addEventListener("click", async () => {
  const todos = await getTodos();

  todos.forEach(({ id }) => deleteTodo(id));

  _getAllDoneTodoElements().forEach((todoElement) => todoElement.remove());
});
///Editanje teksta/title-a  todo-a
