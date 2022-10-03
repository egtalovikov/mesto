import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
  }

  _getInputValues() {
    this._inputList = this.document.querySelectorAll('.popup__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', formAddSubmitHandler);
    super.setEventListeners();
  }

  close() {
    this.document.querySelector('.popup__form').addEventListener('submit', () => {
      evt.preventDefault();
    })
    super.close();
  }
}
