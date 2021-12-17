import { Component } from "framework";
import { removeLoggedInUserLS } from '../../utils/localstorageAdapter';
import store from '../../Store/data';
import { observer } from "../../storeManager/framework";

class HeaderComponent extends Component {
  constructor(config) {
    super(config);
    this.user = null;
    this.data = { isLoggedInUserTemplate: null }
  }

  beforeInit() {
    const loggedInUserName = store.data.loggedInUsername;
    
    if (loggedInUserName) {
      this.data.isLoggedInUserTemplate = `
        <span class="nav__user">${loggedInUserName}</span>
        <a href="#signin" class="nav__signout" style="font-size: 20px">Выйти</a>
      ` 
    } else {
      this.data.isLoggedInUserTemplate = `
        <a href="#signin" class="nav__signin" style="font-size: 20px; margin-right: 20px">Вход</a>
        <a href="#signup" class="nav__signup" style="font-size: 20px">Регистрация</a>
      `
    }
  }

  events() {
    return { 'click .nav__signout': 'handleClick', }
  }

  handleClick() {
    removeLoggedInUserLS();
    store.setLoggedInUsername('');
  }
}

const observedComponent = observer(HeaderComponent);

export default new observedComponent({
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