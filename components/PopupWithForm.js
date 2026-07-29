import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);

    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const values = {};

    const inputs = this._form.querySelectorAll(".form__input");

    inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleSubmit(this._getInputValues());
    });
  }
}