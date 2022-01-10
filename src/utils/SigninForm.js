import { clearInputs } from "./utils";
import { getErrorSignin } from "./validators";
import store from '../Store/data'
export default class SigninForm {
  constructor(form) {
    this.form = form;
    this.emailField = this.form.querySelector('.email');
    this.passwordField = this.form.querySelector('.password');
    this.errorField = this.form.querySelector('.signin__error');
    this.isValid = false;
  }

  validate () {
    const errorMessage = getErrorSignin(this.emailField.value, this.passwordField.value, store.data.users);
    if (errorMessage) this.errorField.innerText = errorMessage;
    this.errorField.classList.add('show');
    if (!errorMessage) {
      this.isValid = true;
    }
  }

  getUserData () {
    if (this.isValid) {
      const curUser = store.data.users.find((user) => this.emailField.value === user.email);
      return curUser;
    }
  }

  clear () {
    clearInputs(this.emailField, this.passwordField);
  }
};