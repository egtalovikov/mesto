import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationCallback) {
    super(popupSelector);
    this._confirmationCallback = confirmationCallback;
  }

  setEventListeners(idNumber, card) {
    this._popupSelector.querySelector('.popup__button').addEventListener('click', () => {
      this._confirmationCallback(idNumber, card)
    }, {once: true})
    super.setEventListeners();
  }
}
