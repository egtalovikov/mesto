let popups = document.querySelectorAll('.popup');
let popupEdit = document.querySelector('.popup_edit');
let popupAdd = document.querySelector('.popup_add');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButtons = document.querySelectorAll('.popup__close-button');
let submitButton = document.querySelector('.form__submit-button');
let editFormElement = document.querySelector('.form_edit');
let addFormElement = document.querySelector('.form_add');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_bio');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');
const postsContainer = document.querySelector('.posts');
const initialPosts = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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

function editFormSubmitHandler (evt) {
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
  postElement.querySelector('.post__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('post__like_active');
  })

  postsContainer.prepend(postElement);
}

function addFormSubmitHandler (evt) {
  evt.preventDefault();

  const postName = document.querySelector('.form__text_type_post-name');
  const link = document.querySelector('.form__text_type_link');

  addPost(postName.value, link.value);

  closePopup();
}

addFormElement.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closeButtons.forEach(function(el, i) {
  closeButtons[i].addEventListener('click', closePopup);
});

initialPosts.forEach(function(element) {
  addPost(element.name, element.link);
});
