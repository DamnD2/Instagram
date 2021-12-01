import { findUserInDB, clearInputs } from "./utils";
import { getErrorSignin } from "./validators";

export default class SigninForm {
  constructor(form, users) {
    this.form = form;
    this.users = users;
    this.emailField = this.form.querySelector('.email');
    this.passwordField = this.form.querySelector('.password');
    this.errorField = this.form.querySelector('.signin__error');
    this.isValid = false;
  }

  validate () {
    const errorMessage = getErrorSignin(this.emailField.value, this.passwordField.value, this.users);
    this.errorField.innerText = errorMessage;
    if (!errorMessage) this.isValid = true;
  }

  getUserData () {
    if (this.isValid) {
      return findUserInDB(this.users, this.emailField.value);
    }
  }

  clear () {
    clearInputs(this.emailField, this.passwordField);
  }
};