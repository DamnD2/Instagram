import { Component } from "framework";
import facebookIcon from '../../assets/signup-facebook-icon.svg';
import { addUserLS, setLoggedInUserLS } from '../../utils/localstorageAdapter';
import Form from '../../utils/Form';
import { signupFormConfig } from "../../utils/formConfigs";
import { redirectToMainPage } from "../../utils/utils";
import store from '../../Store/data';

class SignupPageComponent extends Component {
  constructor(config) {
    super(config);
    this.form = null;
  }

  afterInit() {
    this.form = new Form(this.el, signupFormConfig);
  }

  events() {
    return {
      'submit .signup': 'onSubmit',
      'mousedown .main__signin-link': 'onMousedown',
      'mousedown .signup__submit': 'onMousedown',
      'mousedown .signup__facebook': 'onMousedown',
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.form.validate();

    if (this.form.isValid) {
      const newUser = this.form.getFieldsData();
      addUserLS(newUser);
      setLoggedInUserLS(newUser);
      store.setLoggedInUsername(newUser.username);
      this.form.clear();
      redirectToMainPage();
    }
  }

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

        <div class="form-item">
          <input type="text" name="email" class="signup__field" id="signupemail" placeholder="Электронный адрес">
          <label for="signupemail">Электронный адрес</label>
          <div name="email-error" class="error-container"></div>
        </div>
        <div class="form-item">
          <input type="text" name="age" class="signup__field" id="signupage" placeholder="Возраст">
          <label for="signupage">Возраст</label>
          <div name="age-error" class="error-container"></div>
        </div>
        <div class="form-item">
          <input type="text" name="username" class="signup__field" id="signupusername" placeholder="Имя пользователя">
          <label for="signupusername">Имя пользователя</label>
          <div name="username-error" class="error-container"></div>
        </div>
        <div class="form-item">
          <input type="password" name="password" class="signup__field" id="signuppass" placeholder="Пароль">
          <label for="signuppass">Пароль</label>
          <div name="password-error" class="error-container"></div>
        </div>
        <div class="form-item">
          <input type="password" name="confirmpassword" class="signup__field" id="signupconfpass" placeholder="Подтвердить пароль">
          <label for="signupconfpass">Подтвердить пароль</label>
          <div name="confirmpassword-error" class="error-container"></div>
        </div>
        
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