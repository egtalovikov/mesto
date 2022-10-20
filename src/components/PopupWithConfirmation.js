import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, confirmationCallback) {
    super(popupSelector);
    this._confirmationCallback = confirmationCallback;
  }

  open(id, card) {
    this._id = id;
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button').addEventListener('click', () => {
      this._confirmationCallback(this._id, this._card)
    })
    super.setEventListeners();
  }
}
