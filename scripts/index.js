import Card from "./Card.js";
import { initialPosts } from "./initial-cards.js"

const popups = document.querySelectorAll('.popup');
const popupContainer = document.querySelectorAll('.popup__container');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonSubmit = document.querySelector('.popup__button');
const editFormElement = document.querySelector('.popup__form_edit');
const addFormElement = document.querySelector('.popup__form_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const postNameInput = document.querySelector('.popup__input_type_post-name');
const linkInput = document.querySelector('.popup__input_type_link');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__image-caption');
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const openPopup = (el) => {
  el.classList.add('popup_opened');
  resetValidation(settings);
  document.addEventListener('keydown', keyHandler);
}

const closePopup = (el) => {
  el.classList.remove('popup_opened');
  document.removeEventListener('keydown', keyHandler);
}

const editFormSubmitHandler = () => {
  profileBio.textContent = jobInput.value;
  profileName.textContent = nameInput.value;

  closePopup(popupEdit);
}

const addFormSubmitHandler = () => {
  const card = new Card({name: postNameInput.value, link: linkInput.value}, '.post-template')
  const cardElement = card.generateCard();
  document.querySelector('.posts').append(cardElement);
  closePopup(popupAdd);
  addFormElement.reset();
}

const closePopupByClickingOverlay = (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closePopup(evt.currentTarget);
  }
};

const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

popupAdd.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => openPopup(popupAdd));

popups.forEach((el) => {
  el.addEventListener('click', closePopupByClickingOverlay);
});


initialPosts.forEach((item) => {
  const card = new Card(item, '.post-template')
  const cardElement = card.generateCard();

  document.querySelector('.posts').append(cardElement);
});

enableValidation(settings);

export { popupImage, popupCaption, openPopup };
