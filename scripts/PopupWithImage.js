import { popupImage, popupCaption } from "./index.js";
import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }
}
