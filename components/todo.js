export default class Todo {
  constructor(data, selector) {
    this._name = data.name;
    this._completed = data.completed;
    this._date = data.date;
    this._id = data.id;
    this._selector = selector;
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    this._todoCheckboxEl.addEventListener("change", () => {
      this._completed = this._todoCheckboxEl.checked;
    });
  }

  _formatDate() {
    const dueDate = new Date(this._date);

    if (!isNaN(dueDate)) {
      return `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    return "";
  }

  getView() {
    this._element = this._getTemplate();

    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoDate = this._element.querySelector(".todo__date");
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._name;
    this._todoCheckboxEl.checked = this._completed;

    this._todoCheckboxEl.id = `todo-${this._id}`;
    this._todoLabel.setAttribute("for", `todo-${this._id}`);

    this._todoDate.textContent = this._formatDate();

    this._setEventListeners();

    return this._element;
  }
}
