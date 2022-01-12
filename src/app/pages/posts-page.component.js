import { Component } from "framework";
import { observer } from "../../storeManager/framework";
import store from '../../Store/data';
import { openModal } from "../../utils/utils";

const defaultTemplate = `
<div class="not-found">
  <h2 class="not-found__title">У пользователя нет постов :(</h2>
    <button class='posts__add-button'>Создать новый пост</button>
</div>
`

class PostsPageComponent extends Component {
  constructor(config) {
    super(config);
  }

  beforeInit() {
    this.setTemplate();
  }

  setTemplate() {
    const userId = location.hash.split('/')[1];
    let user = null;
    if (!store.data.users) {
      return
    }
    user = store.data.users.find((user) => user._id === userId);
    const posts = store.data.posts;
    if (!posts[userId] || !posts[userId].length) {
      this.template = defaultTemplate
      return;
    }
    const template = posts[userId].reduce((resultTemplate, post) => {
      resultTemplate += `
        <div class="post" data-post=${post._id}>
        <button class="btn btn-secondary remove-post" type="button">&#10006;</button>
          <img src=${post.img} alt="image" width="280" height="280">
          <p class="post__description">Описание: ${post.description}</p>
        </div>
      `;
      return resultTemplate;
    }, '');

    this.template = `
    <div class="posts-wrapper">
      <h2 class="posts__header">Посты пользователя ${user ? user.username : 'DEFAULT'}!</h2>
      <button class='posts__add-button'>Создать новый пост</button>
      <div class="posts">${template}</div>
      </div>
    `;
  }

  events() {
    return {
      'click .posts__add-button': 'handleClick',
      'click .remove-post': 'handleRemove',
    }
  }

  handleClick() {
    const modal = document.getElementById('add-post');
    openModal(modal);
  }
  handleRemove() {
    const modal = document.getElementById('remove-post');
    modal.dataset.post = event.target.closest('[data-post]').dataset.post;
    openModal(modal);
  }
}

const observedComponent = observer(PostsPageComponent);

export const postsPageComponent = new observedComponent({
  selector: 'app-posts',
  template: defaultTemplate
});