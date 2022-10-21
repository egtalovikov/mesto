import '../pages/index.css';
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import {
  settings,
  formAddElement,
  formEditElement,
  formChangeAvatarElement,
  nameInput,
  aboutInput,
  profileabout,
  profileName,
  postsContainer,
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  userSettings
} from "../utils/constants.js"
import { data } from 'autoprefixer';

function createCard(data) {
  const card = new Card(
    data,
    '.post-template',
    handleCardClick,
    handlePutLike,
    handleDeleteLike,
    handleDeleteCardButton,
    profileId);
  return card.generateCard();
}

let profileId = '';

function renderCards(data) {
  cardList.addItem(createCard(data));
}

const cardList = new Section(renderCards, postsContainer);


function handleCardClick(name, link) {
  popupImageElement.open(name, link);
}

function handleDeleteCardButton(card) {
  popupConfirmationElement.open(card);
}

function handleConfirmationButton(card) {
  api.deleteCard(card.getId())
    .then(() => {
      card.removeCard();
    })
    .catch((err) => {
      console.log(err)
    })

  popupConfirmationElement.close();
}

const handleFormAddSubmit = (inputValues) => {
  popupAddElement.renderLoading(true);
  api.addCard(inputValues)
    .then((result) => {
      cardList.addItem(createCard(result));

      popupAddElement.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAddElement.renderLoading(false);
    })
}

const handleFormEditSubmit = (inputValues) => {
  popupEditElement.renderLoading(true);

  api.editProfile(inputValues)
    .then((result) => {
      userInfoElement.setUserInfo(result);
      popupEditElement.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditElement.renderLoading(false);
    })
}

const handleFormAvatarChangeSubmit = (inputValues) => {
  popupChangeAvatarElement.renderLoading(true);
  api.changeAvatar(inputValues)
    .then((result) => {
      userInfoElement.setUserAvatar(result);
      popupChangeAvatarElement.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatarElement.renderLoading(false);
    })
}

function handlePutLike(card) {
  api.putLike(card.getId())
    .then((result) => {
      card.putLike(result);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleDeleteLike(card) {
  api.deleteLike(card.getId())
    .then((result) => {
      card.deleteLike(result);
    })
    .catch((err) => {
      console.log(err);
    })
}

const formAddValidator = new FormValidator(settings, formAddElement);
const formEditValidator = new FormValidator(settings, formEditElement);
const formAvatarValidator = new FormValidator(settings, formChangeAvatarElement);
const popupAddElement = new PopupWithForm('.popup_add', handleFormAddSubmit);
const popupEditElement = new PopupWithForm('.popup_edit', handleFormEditSubmit);
const popupImageElement = new PopupWithImage('.popup_image');
const popupConfirmationElement = new PopupWithConfirmation('.popup_confirmation', handleConfirmationButton)
const popupChangeAvatarElement = new PopupWithForm('.popup_avatar', handleFormAvatarChangeSubmit);
const userInfoElement = new UserInfo(userSettings);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '35259131-c8d7-40ff-a93d-21891efd60f1',
    'Content-Type': 'application/json'
  }
});

Promise.all([

  api.loadUserInfo(),

  api.getInitialCards()

])

  .then((values) => {

    userInfoElement.setUserInfo({ name: values[0].name, about: values[0].about });

    userInfoElement.setUserAvatar({ avatar: values[0].avatar });

    profileId = values[0]._id;

    values[1].reverse();
    cardList.renderItems(values[1]);

  })

  .catch((err) => {

    console.log(err);

  })

buttonEdit.addEventListener('click', () => {
  const userInfoArray = userInfoElement.getUserInfo();
  nameInput.value = userInfoArray.name;
  aboutInput.value = userInfoArray.about;
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
