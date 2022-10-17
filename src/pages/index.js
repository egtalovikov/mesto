import '../pages/index.css';
import { initialPosts } from "../utils/initial-cards.js";
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
  const card = new Card(data, '.post-template', handleCardClick);
  return card.generateCard();
}

function handleCardClick() {
  this._element.querySelector('.post__photo').addEventListener('click', () => popupImageElement.open(this._name, this._link));
}

const cardList = new Section({
  items: initialPosts,
  renderer: (data) => {
    cardList.addItem(createCard(data));
  }
}, postsContainer);

const formAddSubmitHandler = () => {
  cardList.addItem(createCard({ name: postNameInput.value, link: linkInput.value }));

  popupAddElement.close();

  formAddElement.reset();
}

const formEditSubmitHandler = () => {
  userInfoElement.setUserInfo();

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

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
    'Content-Type': 'application/json'
  }
});

api.loadUserInfo();

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

cardList.renderItems();
