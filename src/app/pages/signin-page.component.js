import { DefaultComponent } from "../../Framework";
import facebookIcon from '../../assets/signin-facebook-icon.svg';
import { signinValidation, findUserInDB } from '../../utils/validators';
import LocalStorageAdapter from '../../utils/localstorageAdapter'

class SigninPageComponent extends DefaultComponent {
  constructor(config) {
    super(config);
    this.loggedInUserData = new LocalStorageAdapter('loggedInUserData', 'object');
  }

  events() {
    return {
      'submit .signin': 'onSubmit',
      'mousedown .main__signup-link': 'onMousedown',
      'mousedown .signin__submit': 'onMousedown',
      'mousedown .signin__facebook': 'onMousedown',
    }
  }

  onSubmit() {
    const emailField = this.el.querySelector('.email');
    const passwordField = this.el.querySelector('.password');
    const errorField = this.el.querySelector('.signin__error');
    const errorMessage = signinValidation(emailField.value, passwordField.value);

    if (errorMessage) {
      errorField.innerText = errorMessage;
    } else {
      const userData = findUserInDB(emailField.value);
      delete userData.password;
      this.loggedInUserData.setValue(userData);
      errorField.innerText = '';
      emailField.value = '';
      passwordField.value = '';

      alert(`Hello`);
    }
  }

  // reset focus when the mouse is clicked on the element, so that the outline is not displayed
  onMousedown(event) {
    event.preventDefault();
  }
}

export const signinPageComponent = new SigninPageComponent({
  selector: 'app-signin-page',
  template: `
    <div class="signin-wrapper" id="signin-wrapper">
      <form class="signin">
        <h2 class="signin__title">Instagram</h2>
        <input type="text" class="signin__field email" placeholder="Электронный адрес">
        <input type="password" class="signin__field password" placeholder="Пароль">
        <button type='submit' class="signin__submit">Войти</button>
        <p class="signin__error"></p>
        <div class="signin__text-wrapper">
          <div class="signin__text-line"></div>
          <p class=" signin__text">ИЛИ</p>
          <div class="signin__text-line"></div>
        </div>
        <div class="signin__facebook" tabindex="0">
          <img class="signin__facebook-icon" src=${facebookIcon} alt="facebook">
          <p class="signin__facebook-text">Войти через Facebook</p>
        </div>
      </form>
      <div class="main__signup">
        <p class="main__signup-text">У вас ещё нет аккаунта?</p>
        <a href="#signup" class="main__signup-link">Зарегистрироваться</a>
      </div>
    </div>
  `
});