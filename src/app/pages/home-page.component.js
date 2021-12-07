import { Component } from "framework";
import { getUsersLS } from "../../utils/localstorageAdapter";
class HomePageComponent extends Component {
  constructor(config) {
    super(config);
  }

  beforeInit() {
    this.setTemplate();
  }

  setTemplate() {
    const users = getUsersLS();
    if (!users.length) return;

    const template = users.reduce((resultTemplate, user) => {
      resultTemplate += `
        <div class="card" data-id="${user.username}">
          <img class="card__photo" src="https://st2.depositphotos.com/2927537/7025/i/950/depositphotos_70253417-stock-photo-funny-monkey-with-a-red.jpg" />
          <h1 class="card__username">${user.username}</h3>
          <h3 class="card__email">email: ${user.email}</h3>
          <h3 class="card__age">age: ${user.age}</h3>
          <button class="card__button" data-show="edituser" name="edit">Редактировать</button>
          <button class="card__button" data-show="removeuser" name="remove">Удалить</button>
        </div>
      `;
      return resultTemplate;
    }, '');

    this.template = `
      <div class="home">${template}</div>
    `;
  }
}

export const homePageComponent = new HomePageComponent({
  selector: 'app-home-page',
  template: `
    <div class="home">
    ...LOADING...
    </div>
  `
});