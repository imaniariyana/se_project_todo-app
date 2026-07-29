import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

import { initialTodos, validationConfig } from "../utils/constants.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm(
  "#add-todo-popup",
  (formData) => {
    const date = new Date(formData.date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const values = {
      id: uuidv4(),
      name: formData.name,
      date,
      completed: false,
    };

    todoSection.addItem(generateTodo(values));

    todoCounter.updateTotal(true);

    addTodoForm.reset();
    addTodoFormValidator.resetValidation();
    addTodoPopup.close();
  }
);

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",

    (completed) => {
      todoCounter.updateCompleted(completed);
    },

    (completed) => {
      if (completed) {
        todoCounter.updateCompleted(false);
      }

      todoCounter.updateTotal(false);
    }
  );

  return todo.getView();
};

const todoSection = new Section({
  items: initialTodos,
  renderer: (item) => {
    todoSection.addItem(generateTodo(item));
  },
  containerSelector: ".todos__list",
});

todoSection.renderItems();