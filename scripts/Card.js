import { popupImageContainer, popupImage, popupCaption, openPopup } from "./index.js";

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
    openPopup(popupImageContainer);
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _toggleLikeButton() {
    this._like.classList.toggle('post__like_active');
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.post__like');

    this._element.querySelector('.post__delete-button').addEventListener('click', () => this._removeCard());
    this._element.querySelector('.post__photo').addEventListener('click', () => this._handleOpenPopup());
    this._like.addEventListener('click', () => this._toggleLikeButton());
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.post__photo').src = this._link;
    this._element.querySelector('.post__photo').alt = this._name;
    this._element.querySelector('.post__title').textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}
