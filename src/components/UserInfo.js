export default class UserInfo {
  constructor(nameSelector, bioSelector) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
  }

  getUserInfo() {
    const userInfo = {name: this._nameSelector.textContent, bio: this._bioSelector.textContent};

    return userInfo;
  }

  setUserInfo(inputValues) {
    this._nameSelector.textContent = inputValues.name;
    this._bioSelector.textContent = inputValues.bio;
  }
}
