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
  profileName,
  profileBio,
  profileAvatar,
  nameInput,
  aboutInput,
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
    putLikeHandler,
    deleteLikeHandler,
    handleDeleteCardButton,
    profileId);
  return card.generateCard();
}

let profileId = '';

function renderCards(data) {
  cardList.addItem(createCard(data));
}

const cardList = new Section(renderCards, postsContainer);


function handleCardClick() {
  popupImageElement.open(this._name, this._link);
}

function handleDeleteCardButton() {
  popupConfirmationElement.open(this._id, this._element);
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

const handleFormAddSubmit = (inputValues, submitButton, initialButtonText) => {
  popupAddElement.renderLoading(true);
  api.addCard(postNameInput, linkInput)
    .then((result) => {
      cardList.addItem(createCard({ name: inputValues.postname, link: inputValues.link, likes: result.likes, _id: result._id, owner: result.owner }));

      popupAddElement.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      popupAddElement.renderLoading(false);
      submitButton.textContent = initialButtonText;
    })
}

const handleFormEditSubmit = (inputValues, submitButton, initialButtonText) => {
  popupEditElement.renderLoading(true);

  api.editProfile(nameInput, aboutInput)
    .then(() => {
      userInfoElement.setUserInfo(inputValues);
      popupEditElement.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditElement.renderLoading(false);
      submitButton.textContent = initialButtonText;
    })
}

const formChangeAvatarSubmitHandler = (inputValues, submitButton, initialButtonText) => {
  popupChangeAvatarElement.renderLoading(true);
  api.changeAvatar(avatarLinkInput).
    then(() => {
      profileAvatar.src = inputValues.avatar;
      popupChangeAvatarElement.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupChangeAvatarElement.renderLoading(false);
      submitButton.textContent = initialButtonText;
    })
}

function putLikeHandler(id, element) {
  api.putLike(id)
    .then((result) => {
      element.textContent = result.likes.length;
      this._toggleLikeButton();
    })
    .catch((err) => {
      console.log(err);
    })
}

function deleteLikeHandler(id, element) {
  api.deleteLike(id)
    .then(result => {
      element.textContent = result.likes.length;
      this._toggleLikeButton();
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
const popupConfirmationElement = new PopupWithConfirmation('.popup_confirmation', confirmationButtonHandler)
const popupChangeAvatarElement = new PopupWithForm('.popup_avatar', formChangeAvatarSubmitHandler);
const userInfoElement = new UserInfo(profileName, profileBio);



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

    profileName.textContent = values[0].name;
    profileBio.textContent = values[0].about;
    profileAvatar.src = values[0].avatar;
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
  aboutInput.value = userInfoArray.bio;
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
