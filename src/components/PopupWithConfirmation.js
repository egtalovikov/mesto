import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationCallback) {
    super(popupSelector);
    this._confirmationCallback = confirmationCallback;
  }

  open(card) {
    this._card= card;
    super.open();
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button').addEventListener('click', () => {
      this._confirmationCallback(this._card)
    })
    super.setEventListeners();
  }
}
