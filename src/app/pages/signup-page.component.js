import { DefaultComponent } from "../../Framework";
import facebookIcon from '../../assets/signup-facebook-icon.svg';
import LocalStorageAdapter from '../../utils/localstorageAdapter';
import Form from '../../utils/Form';
import { signupFormConfig } from "../../utils/formConfigs";

class SignupPageComponent extends DefaultComponent {
  constructor(config) {
    super(config);
    this.form = null;
    this.users = new LocalStorageAdapter('users', 'array');
    this.loggedInUserData = new LocalStorageAdapter('loggedInUserData', 'object');
  }

  events() {
    return {
      'submit .signup': 'onSubmit',
      'mousedown .main__signin-link': 'onMousedown',
      'mousedown .signup__submit': 'onMousedown',
      'mousedown .signup__facebook': 'onMousedown',
    }
  }

  onSubmit() {
    //initializing the form after rendering
    if (!this.form) {
      this.form = new Form(this.el, signupFormConfig);
    }
    const { form, users, loggedInUserData} = this;

    form.validate();
    if (form.isValid) {
      const newUser = form.getFieldsData();
      users.setValue(newUser);
      loggedInUserData.setValue(newUser);
      form.clear();
    }
  }

  // reset focus when the mouse is clicked on the element, so that the outline is not displayed
  onMousedown(event) {
    event.preventDefault();
  }
}

export const signupPageComponent = new SignupPageComponent({
  selector: 'app-signup-page',
  template: `
    <div class="signup-wrapper" id="signup-wrapper">
      <form class="signup">
        <h2 class="signup__title">Instagram</h2>
        <p class="signup__title-text">Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</p>
        <div class="signup__facebook" tabindex="0">
          <img class="signup__facebook-icon" src=${facebookIcon} alt="facebook">
          <p class="signup__facebook-text">Войти через Facebook</p>
        </div>
        <div class="signup__text-wrapper">
          <div class="signup__text-line"></div>
          <p class=" signup__text">ИЛИ</p>
          <div class="signup__text-line"></div>
        </div>
        <input type="text" class="signup__field email" placeholder="Электронный адрес">
        <div class="email-error"></div>
        <input type="text" class="signup__field age" placeholder="Возраст">
        <div class="age-error"></div>
        <input type="text" class="signup__field username" placeholder="Имя пользователя">
        <div class="username-error"></div>
        <input type="password" class="signup__field password" placeholder="Пароль">
        <div class="password-error"></div>
        <button type="submit" class="signup__submit">Регистрация</button>
        <p class="signup__info">Регистрируясь, вы принимаете наши Условия, Политику использования данных и Политику в
          отношении файлов cookie.</p>
      </form>
      <div class="main__signin">
        <p class="main__signin-text">Есть аккаунт?</p>
        <a href="#signin" class="main__signin-link">Вход</a>
      </div>
    </div>
  `
});