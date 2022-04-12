import { TODO_SERVER_URL, Todo } from "./index.js";

const url = (url) => `${TODO_SERVER_URL}${url}`;

export function getTodos() {
  return fetch(url("/todos"))
    .then((res) => res.json())
    .then((todos) => todos.map((todo) => new Todo(todo)));
}

export function postTodo(title) {
  return fetch(url("/todos"), {
    method: "POST",
    body: JSON.stringify({
      title,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((todo) => new Todo(todo));
}

export function updateTodoCompleted(id, completed) {
  return fetch(url(`/todos/${id}`), {
    method: "PATCH",
    body: JSON.stringify({
      completed,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((todo) => new Todo(todo));
}

export function deleteTodo(id) {
  return fetch(url(`/todos/${id}`), { method: "DELETE" });
}

// export function updateTodoTitle(id, title) {
//   return fetch(url(`/todos/${id}`), {
//     method: "PATCH",
//     body: JSON.stringify({
//       title,
//     }),
//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   })
//     .then((res) => res.json())
//     .then((todo) => new Todo(todo));
// }
