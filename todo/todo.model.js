export class Todo {
  constructor({ id, title, completed = false }) {
    this.id = id;
    this.text = title;
    this.isDone = completed;
  }
}
