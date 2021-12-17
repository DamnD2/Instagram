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
          <div class="card__body">
            <h1 class="card__username" name="username">${user.username}</h1>
            <img class="card__photo" src=${user.photoUrl || 'https://st2.depositphotos.com/2927537/7025/i/950/depositphotos_70253417-stock-photo-funny-monkey-with-a-red.jpg'} />
            <p class="card__email" name="email"><b>Email:</b> ${user.email}</p>
            <p class="card__age" name="age"><b>Возраст:</b> ${user.age}</p>
            ${ user.phone
              ? `<p class="card__phone" name="phone"><b>Телефон:</b> ${user.phone}</p>`
              : ""
            }
            ${ user.sex
              ? `<p class="card__phone" name="phone"><b>Пол:</b> ${user.sex}</p>`
              : ""
            }
            ${ user.color
              ? `<p class="card__phone ${user.color}" name="phone"><b>Телефон:</b> ${user.color}</p>`
              : ""
            }
          </div>
          <div class="card__footer">
            <button class="card__button" data-show="edituser" name="edit">Редактировать</button>
            <button class="card__button" data-show="removeuser" name="remove">Удалить</button>
          </div>
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