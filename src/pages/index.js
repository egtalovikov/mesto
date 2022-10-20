import '../pages/index.css';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  settings,
  formAddElement,
  formEditElement,
  formChangeAvatarElement,
  profileName,
  profileBio,
  profileAvatar,
  nameInput,
  jobInput,
  postsContainer,
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  postNameInput,
  linkInput,
  avatarLinkInput
} from "../utils/constants.js"
import { data } from 'autoprefixer';

function createCard(data) {
  const card = new Card(
    data,
    '.post-template',
    handleCardClick,
    api.putLike,
    api.deleteLike,
    handleDeleteCardButton);
  return card.generateCard();
}

export let profileId = '';

const cardList = new Section({
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, postsContainer);


function handleCardClick() {
  this._element.querySelector('.post__photo').addEventListener('click', () => popupImageElement.open(this._name, this._link));
}

function handleDeleteCardButton() {
  popupConfirmationElement.open();

  popupConfirmationElement.setEventListeners(this._id, this._element);
}

function confirmationButtonHandler(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.remove();
      card = null;
    })
    .catch((err) => {
      console.log(err)
    })

  popupConfirmationElement.close();
}

const formAddSubmitHandler = () => {
  popupAddElement.renderLoading(true);
  api.addCard()
    .then((result) => {
      cardList.addItem(createCard(result));
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAddElement.renderLoading(false);
    })


  popupAddElement.close();

  formAddElement.reset();
}

const formEditSubmitHandler = () => {
  popupEditElement.renderLoading(true);

  userInfoElement.setUserInfo();

  api.editProfile()
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupEditElement.renderLoading(false);
  })

  popupEditElement.close();
}

const formChangeAvatarSubmitHandler = () => {
  popupChangeAvatarElement.renderLoading(true);
  api.changeAvatar()
  .then((res) => {
    profileAvatar.src = res.avatar;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    popupChangeAvatarElement.renderLoading(false);
  })

  popupChangeAvatarElement.close();
}

const formAddValidator = new FormValidator(settings, formAddElement);
const formEditValidator = new FormValidator(settings, formEditElement);
const formAvatarValidator = new FormValidator(settings, formChangeAvatarElement);
const popupAddElement = new PopupWithForm('.popup_add', formAddSubmitHandler);
const popupEditElement = new PopupWithForm('.popup_edit', formEditSubmitHandler);
const popupImageElement = new PopupWithImage('.popup_image');
const popupConfirmationElement = new PopupWithConfirmation('.popup_confirmation', confirmationButtonHandler)
const popupChangeAvatarElement = new PopupWithForm('.popup_avatar', formChangeAvatarSubmitHandler);
const userInfoElement = new UserInfo(profileName, profileBio, nameInput, jobInput);

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  loadUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  putLike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${this._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteLike() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${this._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  deleteCard(idNumber) {
    return fetch(`${this._baseUrl}/cards/${idNumber}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`)
      }
      )
  }

  addCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: postNameInput.value,
        link: linkInput.value
      }),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  editProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userInfoElement.getUserInfo().name,
        about: userInfoElement.getUserInfo().bio
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  changeAvatar() {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLinkInput.value
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
    'Content-Type': 'application/json'
  }
});

api.loadUserInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileBio.textContent = result.about;
    profileAvatar.src = result.avatar;
    profileId = result._id;
  })
  .catch((err) => {
    console.log(err)
  })

api.getInitialCards()
  .then((result) => {
    result.reverse();
    result.forEach((item) => {
      cardList.addItem(createCard({ name: item.name, link: item.link, likes: item.likes, _id: item._id, owner: item.owner }));
    })
  })
  .catch((err) => {
    console.log(err)
  })

buttonEdit.addEventListener('click', () => {
  const userInfoArray = userInfoElement.getUserInfo();
  nameInput.value = userInfoArray.name;
  jobInput.value = userInfoArray.bio;
  formEditValidator.resetValidation();
  popupEditElement.open();
});
buttonAdd.addEventListener('click', () => {
  formAddValidator.resetValidation();
  popupAddElement.open();
});
buttonChangeAvatar.addEventListener('click', () => {
  formAvatarValidator.resetValidation();
  popupChangeAvatarElement.open();
})

popupAddElement.setEventListeners();
popupEditElement.setEventListeners();
popupImageElement.setEventListeners();
popupConfirmationElement.setEventListeners();
popupChangeAvatarElement.setEventListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();
