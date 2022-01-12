import { Component } from "framework";
import { observer } from "../../storeManager/framework";
import store from '../../Store/data';
import { getPosts } from "../../../provider";
import { getCookieValue } from "../../utils/cookies";

//дизайн-система
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
    const defaultUserPhotoURL = 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg';
    const users = store.data.users;
    if (!users.length) return;

    const template = users.reduce((resultTemplate, user) => {
      resultTemplate += `
        <div class="card" data-id="${user._id}">
          <div class="card__body">
            <h1 class="card__username" name="username">${user.username}</h1>
            <img class="card__photo" src=${user.photo || defaultUserPhotoURL} width="188" height="188" />
            <p class="card__email" name="email"><b>Email:</b> ${user.email}</p>
            ${ user.age
              ? `<p class="card__age" name="age"><b>Возраст:</b> ${user.age}</p>`
              : ""
            }
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
          <button class="card__button show-posts">Просмотреть посты</button>
        </div>
      `;
      return resultTemplate;
    }, '');

    this.template = `
      <div class="home">${template}</div>
    `;
  }

  events() {
    return { 'click .show-posts': 'handleClick', }
  }

  async handleClick() {
    const userId = event.target.closest('.card').dataset.id;
    location.hash= `posts/${userId}`;
    const posts = await getPosts(userId, getCookieValue('jwt'));
    store.setPosts(userId, posts && posts.posts);
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