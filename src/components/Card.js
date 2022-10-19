export default class Card {
  constructor(data, templateSelector, handleCardClick, handlePutLike, handleDeleteLike, userName) {
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._userName = userName;
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

  _getValue() {
    var i = this._likeCounter.length;
    while (i--) {
        if (this._likeCounter[i].name === this._userName) {
           return true;
        }
    }
    return false;
  }

  _toggleLikeButton() {
    this._like.classList.toggle('post__like_active');
  }

  _handleLikeButton() {
    if (this._like.classList.contains('post__like_active')) {
      this._handlePutLike();

    } else {
      this._handleDeleteLike();
    }
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.post__like');

    this._element.querySelector('.post__delete-button').addEventListener('click', () => this._removeCard());
    this._like.addEventListener('click', () => {
      this._toggleLikeButton();
      this._handleLikeButton();
    });
    this._handleCardClick(this._name, this._link);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._photo = this._element.querySelector('.post__photo');

    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._element.querySelector('.post__title').textContent = this._name;
    this._element.querySelector('.post__like-counter').textContent = this._likeCounter.length;
    this._setEventListeners();

    if (this._getValue()) {
      this._toggleLikeButton();
    }

    return this._element;
  }
}
