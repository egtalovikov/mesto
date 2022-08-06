let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let submitButton = document.querySelector('.form__submit-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_bio');
let profileName = document.querySelector('.profile__name');
let profileBio = document.querySelector('.profile__bio');

function openPopup() {
  nameInput.value= profileName.textContent;
  jobInput.value = profileBio.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let jobInputValue = jobInput.value;
    let nameInputValue = nameInput.value;
    profileBio.textContent = jobInputValue;
    profileName.textContent = nameInputValue;

    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
