export default class UserInfo {
  constructor(nameSelector, bioSelector, nameInput, jobInput) {
    this._nameSelector = nameSelector;
    this._bioSelector = bioSelector;
    this._nameInput = nameInput;
    this._jobInput = jobInput;
  }

  getUserInfo() {
    const UserInfo = {name: this._nameSelector.textContent, bio: this._bioSelector.textContent};

    return UserInfo;
  }

  setUserInfo() {
    this._nameSelector.textContent = this._nameInput.value;
    this._bioSelector.textContent = this._jobInput.value;
  }
}
