const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonClose = document.querySelectorAll('.popup__close-button');
const buttonSubmit = document.querySelector('.form__submit-button');
const editFormElement = document.querySelector('.form_edit');
const addFormElement = document.querySelector('.form_add');
const nameInput = document.querySelector('.form__text_type_name');
const jobInput = document.querySelector('.form__text_type_bio');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const postsContainer = document.querySelector('.posts');
const postTemplate = document.querySelector('#post-template').content.querySelector('.post');
const postNameInput = document.querySelector('.form__text_type_post-name');
const linkInput = document.querySelector('.form__text_type_link');

function openPopup(el) {
  el.classList.add('popup_opened');
}

function closePopup(el) {
  el.classList.remove('popup_opened');
}



function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileBio.textContent = jobInput.value;
  profileName.textContent = nameInput.value;

  closePopup(popupEdit);
}

function createPostElement(name, link) {
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

function addPost(name, link) {
  const createdPost = createPostElement(name, link);
  postsContainer.prepend(createdPost);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  addPost(postNameInput.value, linkInput.value);
  closePopup(popupAdd);
}

addFormElement.addEventListener('submit', addFormSubmitHandler);
editFormElement.addEventListener('submit', editFormSubmitHandler);
buttonEdit.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileBio.textContent;
  openPopup(popupEdit);
});
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonClose.forEach(function (el, i) {
  buttonClose[i].addEventListener('click', function () {
    const closestPopup = buttonClose[i].closest('.popup');
    closePopup(closestPopup);
  });
});

initialPosts.forEach(function (element) {
  addPost(element.name, element.link);
});
