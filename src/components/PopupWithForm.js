import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._submitButton = this._popupSelector.querySelector('.popup__button');
    this._initialButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  renderLoading(isLoading) {
      if (isLoading) {
        this._submitButton.textContent = 'Сохранение...';
      } else {
        this._submitButton.textContent = 'Сохранено';
      }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback();
    })
    super.setEventListeners();
  }

  open() {
    this._submitButton.textContent = this._initialButtonText;
    super.open();
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset();
    super.close();
  }
}
