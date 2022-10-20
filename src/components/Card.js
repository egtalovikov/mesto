import { profileId } from "../pages/index.js";

export default class Card {
  constructor(data, templateSelector, handleCardClick, handlePutLike, handleDeleteLike, handleDeleteCardButton) {
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
    for (let i = 0; i < this._likeCounter.length; i++) {
        if (this._likeCounter[i]._id === profileId) {
           return true;
        }
        return false;
      }
  }

  _toggleLikeButton() {
    this._like.classList.toggle('post__like_active');
  }

  _handleLikeButton() {
    if (this._like.classList.contains('post__like_active')) {
      this._handlePutLike()
      .then(result => {
        this._element.querySelector('.post__like-counter').textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })

    } else {
      this._handleDeleteLike()
      .then(result => {
        this._element.querySelector('.post__like-counter').textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  _setEventListeners() {
    this._like = this._element.querySelector('.post__like');

    this._deleteButton.addEventListener('click', () => this._handleDeleteCardButton());
    this._like.addEventListener('click', () => {
      this._toggleLikeButton();
      this._handleLikeButton();
    });
    this._handleCardClick(this._name, this._link);
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


    if (profileId === this._owner._id) {
      this._deleteButton.classList.add('post__delete-button_visible');
    }

    return this._element;
  }
}
