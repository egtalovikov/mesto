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
  nameInput,
  jobInput,
  postsContainer,
  buttonEdit,
  buttonAdd,
  postNameInput,
  linkInput
} from "../utils/constants.js"

const formAddSubmitHandler = () => {
  const addPost = new Section({
    items: ([{name: postNameInput.value, link: linkInput.value}]),
    renderer: (data) => {
      const post = new Card(data, '.post-template', handleCardClick)
      const postElement = post.generateCard();

      addPost.addItem(postElement);
    }
  }, postsContainer);

  addPost.renderItems();

  popupAddElement.close();

  formAddElement.reset();
}

const formEditSubmitHandler = () => {
  UserInfoElement.setUserInfo();

  popupEditElement.close();
}

const formAddValidator = new FormValidator(settings, formAddElement);
const formEditValidator = new FormValidator(settings, formEditElement);
const popupAddElement = new PopupWithForm('.popup_add', formAddSubmitHandler);
const popupEditElement = new PopupWithForm('.popup_edit', formEditSubmitHandler);
const popupImageElement = new PopupWithImage('.popup_image');
const UserInfoElement = new UserInfo(profileName, profileBio, nameInput, jobInput);

function handleCardClick() {
  this._element.querySelector('.post__photo').addEventListener('click', () => popupImageElement.open(this._name, this._link));
}

const cardList = new Section({
  items: initialPosts,
  renderer: (data) => {
    const post = new Card(data, '.post-template', handleCardClick)
    const postElement = post.generateCard();

    cardList.addItem(postElement);
  }
}, postsContainer);

buttonEdit.addEventListener('click', () => {
  const UserInfoArray = UserInfoElement.getUserInfo();
  nameInput.value = UserInfoArray.name;
  jobInput.value = UserInfoArray.bio;
  formEditValidator.resetValidation(settings);
  popupEditElement.open();
});
buttonAdd.addEventListener('click', () => {
  formAddValidator.resetValidation(settings);
  popupAddElement.open();
});

popupAddElement.setEventListeners();
popupEditElement.setEventListeners();
popupImageElement.setEventListeners();

formAddValidator.enableValidation();
formEditValidator.enableValidation();

cardList.renderItems();