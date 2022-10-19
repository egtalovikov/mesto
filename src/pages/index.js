import '../pages/index.css';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  settings,
  formAddElement,
  formEditElement,
  profileName,
  profileBio,
  profileAvatar,
  nameInput,
  jobInput,
  postsContainer,
  buttonEdit,
  buttonAdd,
  postNameInput,
  linkInput
} from "../utils/constants.js"
import { data } from 'autoprefixer';

function createCard(data) {
  const card = new Card(data, '.post-template', handleCardClick, api.putLike, api.deleteLike, profileName.textContent);
  return card.generateCard();
}

const initialCards = {};

const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, postsContainer);


function handleCardClick() {
  this._element.querySelector('.post__photo').addEventListener('click', () => popupImageElement.open(this._name, this._link));
}

const formAddSubmitHandler = () => {
  api.addCard();

  popupAddElement.close();

  formAddElement.reset();
}

const formEditSubmitHandler = () => {
  userInfoElement.setUserInfo();

  api.editProfile();

  popupEditElement.close();
}

const formAddValidator = new FormValidator(settings, formAddElement);
const formEditValidator = new FormValidator(settings, formEditElement);
const popupAddElement = new PopupWithForm('.popup_add', formAddSubmitHandler);
const popupEditElement = new PopupWithForm('.popup_edit', formEditSubmitHandler);
const popupImageElement = new PopupWithImage('.popup_image');
const userInfoElement = new UserInfo(profileName, profileBio, nameInput, jobInput);

class Api {
  constructor(options) {
    // тело конструктора
  }

  loadUserInfo() {
    fetch('https://nomoreparties.co/v1/cohort-52/users/me', {
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1'
      }
    })
      .then(res => res.json())
      .then((result) => {
        profileName.textContent = result.name;
        profileBio.textContent = result.about;
        profileAvatar.src = result.avatar;
      });
  }

  putLike() {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${this._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        this._element.querySelector('.post__like-counter').textContent = result.likes.length;
      })
  }

  deleteLike() {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${this._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        this._element.querySelector('.post__like-counter').textContent = result.likes.length;
      })
  }

  getInitialCards() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1'
      }
    })
      .then(res => res.json())
      .then((result) => {
        result.reverse();
        result.forEach((item) => {
          cardList.addItem(createCard({ name: item.name, link: item.link, likes: item.likes, _id: item._id }));
        })
      })
  }

  addCard() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-52/cards', {
      method: 'POST',
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        name: postNameInput.value,
        link: linkInput.value
      }),
    })
      .then(res => res.json())
    cardList.addItem(createCard({ name: postNameInput.value, link: linkInput.value, likes: []}));
  }

  editProfile() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-52/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userInfoElement.getUserInfo().name,
        about: userInfoElement.getUserInfo().bio
      })
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

api.loadUserInfo();
api.getInitialCards();

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

popupAddElement.setEventListeners();
popupEditElement.setEventListeners();
popupImageElement.setEventListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();
