import { Component } from "framework";
import { initComponent } from "framework";
import { getLoggedInUserLS, removeLoggedInUserLS } from '../../utils/localstorageAdapter';

class HeaderComponent extends Component {
  constructor(config) {
    super(config);
    this.user = null;
    this.data = { isLoggedInUserTemplate: null }
  }

  beforeInit() {
    const loggedInUser = getLoggedInUserLS().username;
    
    if (loggedInUser) {
      this.data.isLoggedInUserTemplate = `
        <span class="nav__user">${loggedInUser}</span>
        <a href="#signin" class="nav__signin" style="font-size: 20px">Выйти</a>
      ` 
    } else {
      this.data.isLoggedInUserTemplate = `
        <a href="#signin" class="nav__signin" style="font-size: 20px; margin-right: 20px">Вход</a>
        <a href="#signup" class="nav__signup" style="font-size: 20px">Регистрация</a>
      `
    }
  }

  events() {
    return { 'click .nav__signin': 'handleClick', }
  }

  handleClick() {
    removeLoggedInUserLS();
    this.beforeInit();
    document.querySelector('.nav').innerHTML = this.data.isLoggedInUserTemplate;
  }
}

export const headerComponent = new HeaderComponent({
  selector: 'app-header',
  template: `
    <header class="header">
      <a href="#main" class="logo">Instagram</a>
      <div class="nav">
      {{ isLoggedInUserTemplate }}
      </div>
    </header>
  `
});

export default headerComponent;