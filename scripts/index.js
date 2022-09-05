const popups = document.querySelectorAll('.popup');
const popupContainer = document.querySelectorAll('.popup__container');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close-button');
const buttonSubmit = document.querySelector('.popup__button');
const editFormElement = document.querySelector('.popup__form_edit');
const addFormElement = document.querySelector('.popup_add');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const postsContainer = document.querySelector('.posts');
const postTemplate = document.querySelector('#post-template').content.querySelector('.post');
const postNameInput = document.querySelector('.popup__input_type_post-name');
const linkInput = document.querySelector('.popup__input_type_link');

const openPopup = (el) => {
  el.classList.add('popup_opened');
  resetValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  document.addEventListener('keydown', keyHandler);
}

const closePopup = (el) => {
  el.classList.remove('popup_opened');
}



const editFormSubmitHandler = (evt) => {
  evt.preventDefault();

  profileBio.textContent = jobInput.value;
  profileName.textContent = nameInput.value;

  closePopup(popupEdit);
}

const createPostElement = (name, link) => {
  const postElement = postTemplate.cloneNode(true);

  const photo = postElement.querySelector('.post__photo');
  postElement.querySelector('.post__delete-button').addEventListener('click', function () {
    postElement.remove();
  })
  photo.setAttribute('src', link);
  photo.setAttribute('alt', name);
  photo.addEventListener('click', function () {
    const popupImageItem = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__image-caption');
    popupImageItem.setAttribute('src', link);
    popupImageItem.setAttribute('alt', name);
    popupCaption.textContent = name;
    document.querySelector('.popup_image').classList.add('popup_opened');
  });
  postElement.querySelector('.post__title').textContent = name;
  postElement.querySelector('.post__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('post__like_active');
  })
  return postElement;
}

const addPost = (name, link) => {
  const createdPost = createPostElement(name, link);
  postsContainer.prepend(createdPost);
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();

  addPost(postNameInput.value, linkInput.value);
  closePopup(popupAdd);
}

const closePopupByClickingOverlay = (evt) => {
  if (evt.target !== ('.popup')) {
    closePopup(evt.target);
  }
};

const keyHandler = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

addFormElement.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
buttonEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonClose.forEach((el) => {
  el.addEventListener('click', () => {
    const closestPopup = el.closest('.popup');
    closePopup(closestPopup);
  });
});

popups.forEach((el) => {
  el.style.transition = "visibility .5s linear, opacity .5s linear";
  el.addEventListener('click', closePopupByClickingOverlay);
});

initialPosts.forEach((el) => {
  addPost(el.name, el.link);
});
