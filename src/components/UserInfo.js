export default class UserInfo {
  constructor(settings) {
    this._nameSelector = settings.nameSelector;
    this._aboutSelector = settings.aboutSelector;
    this._avatarSelector = settings.avatarSelector;
    this._nameElement = document.querySelector(this._nameSelector);
    this._aboutElement = document.querySelector(this._aboutSelector);
    this._avatarElement = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    const userInfo = {name: this._nameElement.textContent, about: this._aboutElement.textContent, avatar: this._avatarElement.src};

    return userInfo;
  }

  setUserInfo(inputValues) {
    this._nameElement.textContent = inputValues.name;
    this._aboutElement.textContent = inputValues.about;
  }

  setUserAvatar(inputValues) {
    this._avatarElement.src = inputValues.avatar;
  }
}
