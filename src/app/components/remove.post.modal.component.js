import { Component } from "framework";
import { deletePost, getPosts } from "../../../provider";
import { getCookieValue } from "../../utils/cookies";
import { closeModal, openSnackBar } from "../../utils/utils";
import store from '../../Store/data';

class RemovePostModalComponent extends Component {
  constructor(config) {
    super(config);
  }

  events() {
    return {
      'click #close-remove-post': 'handleClick',
      'click #cancel-remove-post': 'handleClick',
      'click #save-remove-post': 'handleSave',
    }
  }

  handleClick() {
    const modal = document.getElementById('remove-post');
    closeModal(modal);
  }
  async handleSave() {
    const $modal = document.getElementById('remove-post')
    const userId = location.hash.split('/')[1];
    const postId = $modal.dataset.post;
    const token = getCookieValue('jwt');
    
    await deletePost(postId, token);
    const posts = await getPosts(userId, token);
    store.setPosts(userId, posts && posts.posts);

    closeModal($modal)
    openSnackBar('Пост удалён!');
  }
}

export const removePostModalComponent = new RemovePostModalComponent({
  selector: 'app-remove-post',
  template: `
    <form class="modal hidden" id="remove-post">
      <div class="modal__dialog">
        <div class="modal__content">
          <div class="modal__header">
            <h5 class="modal__header-title">Добавить пост</h5>
            <button class="btn btn-secondary" id="close-remove-post" type="button">&#10006;</button>
          </div>
          <div class="modal__body">
            <p class="modal__text">Вы действительно хотиет удалить профиль? REMOVE DADADA</p>
          </div>
          <div class="modal__footer">
            <button class="btn btn-secondary mr" id="cancel-remove-post" type="button">Отмена</button>
            <button class="btn btn-primary" id="save-remove-post">Подтвердить</button>
          </div>
        </div>
      </div>
    </form>
  `
});