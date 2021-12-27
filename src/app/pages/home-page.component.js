import { Component } from "framework";
import { observer } from "../../storeManager/framework";
import store from '../../Store/data';

const colorMap = {
  'Красный': '#f00',
  'Желтый' : '#ff0',
  'Оранжевый' : '#ffa500',
  'Зеленый': '#0f0',
  'Голубой': '#4bb8f7',
  'Синий': '#00f',
  'Фиолетовый': '#9500eb',
}
class HomePageComponent extends Component {
  constructor(config) {
    super(config);
  }

  beforeInit() {
    this.setTemplate();
  }

  setTemplate() {
    const users = store.data.users;
    if (!users.length) return;

    const template = users.reduce((resultTemplate, user) => {
      resultTemplate += `
        <div class="card" data-id="${user.id}">
          <div class="card__body">
            <h1 class="card__username" name="username">${user.username}</h1>
            <img class="card__photo" src=${user.photo || 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg'} />
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
              ? `<p class="card__phone ${user.color}" name="phone"><b>Цвет: <span style="color:${colorMap[user.color]}">${user.color}</span></b></p>`
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

const observedComponent = observer(HomePageComponent);

export const homePageComponent = new observedComponent({
  selector: 'app-home-page',
  template: `
    <div class="home">
    <h2>Нет зарегистрированных пользователей</h2>
    </div>
  `
});