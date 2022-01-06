import { Component } from "framework";
import facebookIcon from '../../assets/signin-facebook-icon.svg';
import { login } from "../../../provider";
import SigninForm from '../../utils/SigninForm';
import store from '../../Store/data';
import { redirectToMainPage } from "../../utils/utils";
import { observer } from "../../storeManager/framework";

class SigninPageComponent extends Component {
  constructor(config) {
    super(config);
    this.form = null;
  }

  afterInit() {
    if (this.el) {
      this.form = new SigninForm(this.el, store.data.users);
    }
  }

  events() {
    return {
      'submit .signin': 'onSubmit',
      'mousedown .main__signup-link': 'onMousedown',
      'mousedown .signin__submit': 'onMousedown',
      'mousedown .signin__facebook': 'onMousedown',
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { form } = this;

    form.validate();
    if (form.isValid) {
      login(signinemail.value, signinpass.value);
      form.clear();
      redirectToMainPage();
    }
  }

  onMousedown(event) {
    event.preventDefault();
  }
}

const observedComponent = observer(SigninPageComponent);

export const signinPageComponent = new observedComponent({
  selector: 'app-signin-page',
  template: `
    <div class="signin-wrapper" id="signin-wrapper">
      <form class="signin" (mousedown)="asdasd()">
        <h2 class="signin__title">Instagram</h2>
        <div class="form-item">
          <input type="text" class="signin__field email" id="signinemail" placeholder="Электронный адрес">
          <label for="signinemail" class="field-label">Электронный адрес</label>
        </div>
        <div class="form-item">
          <input type="password" class="signin__field password" id="signinpass" placeholder="Пароль">
          <label for="signinpass" class="field-label">Пароль</label>
        </div>
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