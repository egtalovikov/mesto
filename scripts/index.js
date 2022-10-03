import { initialPosts } from "./initial-cards.js"
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupImageContainer = document.querySelector('.popup_image');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const formEditElement = document.querySelector('.popup__form_edit');
const formAddElement = document.querySelector('.popup__form_add');
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
const formAddValidator = new FormValidator(settings, formAddElement);
const formEditValidator = new FormValidator(settings, formEditElement);

const formEditSubmitHandler = (evt) => {
  evt.preventDefault();
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
  postsContainer.prepend(createdPost);
}

const formAddSubmitHandler = (evt) => {
  evt.preventDefault();
  addPost({name: postNameInput.value, link: linkInput.value});
  closePopup(popupAdd);
  formAddElement.reset();
}



popupAdd.addEventListener('submit', formAddSubmitHandler);
formEditElement.addEventListener('submit', formEditSubmitHandler);
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  formEditValidator.resetValidation(settings);
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => {
  formAddValidator.resetValidation(settings);
  openPopup(popupAdd);
});


initialPosts.forEach((data) => {
  addPost(data);
});

formAddValidator.enableValidation();
formEditValidator.enableValidation();

export { popupImageContainer, popupImage, popupCaption, openPopup };
