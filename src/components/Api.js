import { avatarLinkInput } from "../utils/constants";

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._getResponseData)
  }

  deleteCard(idNumber) {
    return fetch(`${this._baseUrl}/cards/${idNumber}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  addCard(postNameInput, linkInput) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: postNameInput.value,
        link: linkInput.value
      }),
    })
    .then(this._getResponseData)
  }

  editProfile(nameInput, aboutInput) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput.value,
        about: aboutInput.value
      })
    })
    .then(this._getResponseData)
  }

  changeAvatar(avatarLinkInput) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLinkInput.value
      })
    })
    .then(this._getResponseData)
  }
}
