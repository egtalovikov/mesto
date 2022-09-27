import { initialPosts } from "./initial-cards.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const postsContainer = document.querySelector('.posts');
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
const addFormValidator = new FormValidator(settings, addFormElement);
const editFormValidator = new FormValidator(settings, editFormElement);

const openPopup = (el) => {
  if (el.classList.contains('popup_add')) {
    addFormValidator.resetValidation(settings);
  }
  else if (el.classList.contains('popup_edit')) {
    editFormValidator.resetValidation(settings);
  }
  el.classList.add('popup_opened');
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

const createPostElement = (data) => {
  const post = new Card(data, '.post-template')
  const postElement = post.generateCard();

  return postElement;
}

const addPost = (data) => {
  const createdPost = createPostElement(data);
  postsContainer.append(createdPost);
}

const addFormSubmitHandler = () => {
  addPost({name: postNameInput.value, link: linkInput.value});
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


initialPosts.forEach((data) => {
  addPost(data);
});

addFormValidator.enableValidation();
editFormValidator.enableValidation();

export { popupImage, popupCaption, openPopup };
