import { popupImage, popupCaption, openPopup } from "./index.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.post')
      .cloneNode(true);

    return postElement;
  }

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(document.querySelector('.popup_image'));
  }

  _setEventListeners() {
    this._element.querySelector('.post__delete-button').addEventListener('click', () => {
      this._element.remove();
    });
    this._element.querySelector('.post__photo').addEventListener('click', () => {
      this._handleOpenPopup();
    });
    this._element.querySelector('.post__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('post__like_active');
    })
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.post__photo').src = this._link;
    this._element.querySelector('.post__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
