let popups = document.querySelectorAll('.popup');
let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtons = document.querySelectorAll('.popup__close-button');
let submitButton = document.querySelector('.form__submit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_bio');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
const postsContainer = document.querySelector('.posts');
const initialPosts = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function openPopupEdit() {
  nameInput.value= profileName.textContent;
  jobInput.value = profileBio.textContent;
  popupEdit.classList.add('popup_opened');
}


function closePopup() {
  popups.forEach(function(el, i) {
    popups[i].classList.remove('popup_opened');
  });
};

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileBio.textContent = jobInput.value;
    profileName.textContent = nameInput.value;

    closePopup();
}

function addPost(name, link) {
  const postTemplate = document.querySelector('#post-template').content;
  const postElement = postTemplate.querySelector('.post').cloneNode(true);

  const photo = postElement.querySelector('.post__photo');
  photo.setAttribute('src', link);
  postElement.querySelector('.post__title').textContent = name;

  postsContainer.append(postElement);
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButtons.forEach(function(el, i) {
  closeButtons[i].addEventListener('click', closePopup);
});

initialPosts.forEach(function(element) {
  addPost(element.name, element.link);
});
