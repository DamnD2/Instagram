import { Component } from "framework";

class HeaderComponent extends Component {
  constructor(config) {
    super(config);
  }

  /* beforeInit() {
    const isLoggedIn = this.loggedIn.getValue().username;
    if (isLoggedIn) this.data.logoLinkHash = "#";
  } */
}

export const headerComponent = new HeaderComponent({
  selector: 'app-header',
  template: `
    <header class="header">
      <a href="#main" class="logo">Instagram</a>
      <div class="nav">
        <a href="#signin" class="nav__signin" style="font-size: 20px; margin-right: 20px">Вход</a>
        <a href="#signup" class="nav__signup" style="font-size: 20px">Регистрация</a>
      </div>
    </header>
  `
});