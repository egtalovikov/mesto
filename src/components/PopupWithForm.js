import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._submitButton = this._popup.querySelector('.popup__button');
    this._initialButtonText = this._submitButton.textContent;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;

  }

  renderLoading(isLoading) {
      if (isLoading) {
        this._submitButton.textContent = 'Сохранение...';
      }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues(), this._submitButton, this._initialButtonText);
    })
    super.setEventListeners();
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    super.close();
  }
}
