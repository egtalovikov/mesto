export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.post')
      .cloneNode(true);

    return postElement;
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
    this._like.addEventListener('click', () => this._toggleLikeButton());
    this._handleCardClick(this._name, this._link);
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
