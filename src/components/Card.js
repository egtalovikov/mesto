export default class Card {
  constructor(data, templateSelector, handleCardClick, handlePutLike, handleDeleteLike, handleDeleteCardButton, profileId) {
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes;
    this._id = data._id;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteCardButton = handleDeleteCardButton;
    this._profileId = profileId;
  }

  _getTemplate() {
    const postElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.post')
      .cloneNode(true);

    return postElement;
  }

  _getValue() {
    return this._likeCounter.some((like) => like._id === this._profileId)
  }

  _toggleLikeButton() {
    this._like.classList.toggle('post__like_active');
  }

  _handleLikeButton() {
    this._likeCounterElement = this._element.querySelector('.post__like-counter');
    if (this._like.classList.contains('post__like_active')) {
      this._handleDeleteLike(this._id, this._likeCounterElement)
    } else {
      this._handlePutLike(this._id, this._likeCounterElement);
    }
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.post__like');

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCardButton.bind(this);
      this._handleDeleteCardButton(this._id);
    });
    this._like.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.post__photo').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  putLike(result) {
    this._likeCounterElement.textContent = result.likes.length;
    this._toggleLikeButton();
  }

  deleteLike(result) {
    this._likeCounterElement.textContent = result.likes.length;
    this._toggleLikeButton();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.post__delete-button');
    this._photo = this._element.querySelector('.post__photo');

    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._element.querySelector('.post__title').textContent = this._name;
    this._element.querySelector('.post__like-counter').textContent = this._likeCounter.length;
    this._setEventListeners();

    if (this._getValue()) {
      this._toggleLikeButton();
    }


    if (this._profileId === this._owner._id) {
      this._deleteButton.classList.add('post__delete-button_visible');
    }

    return this._element;
  }
}
