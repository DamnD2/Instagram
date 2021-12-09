import { clearInputs } from "./utils";
import { findUserInLS } from './localstorageAdapter';
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
    this.errorField.classList.add('show');
    if (!errorMessage) {
      this.isValid = true;
      this.errorField.classList.remove('show');
    }
  }

  getUserData () {
    if (this.isValid) {
      return findUserInLS(this.emailField.value);
    }
  }

  clear () {
    clearInputs(this.emailField, this.passwordField);
  }
};