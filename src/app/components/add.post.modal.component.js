import { Component } from "framework";
import { addPost, getPosts } from "../../../provider";
import { getCookieValue } from "../../utils/cookies";
import Form from "../../utils/Form";
import { addPostConfig } from "../../utils/formConfigs";
import { closeModal, openSnackBar } from "../../utils/utils";
import store from '../../Store/data'

class AddPostModalComponent extends Component {
  constructor(config) {
    super(config);
  }

  events() {
    return {
      'click #close-modal': 'handleClick',
      'click #cancel-button': 'handleClick',
      'click #save-button': 'handleSave',
    }
  }

  handleClick() {
    const modal = document.getElementById('add-post');
    closeModal(modal);
  }
  async handleSave() {
    const $modal = document.getElementById('add-post');
    const modal = new Form($modal, addPostConfig);
    modal.validate();
    if (modal.isValid) {
      const data = modal.getFieldsData();
      const userId = location.hash.split('/')[1];
      const token = getCookieValue('jwt');
      await addPost(userId, data, token);

      const posts = await getPosts(userId, getCookieValue('jwt'));
      store.setPosts(userId, posts && posts.posts);

      openSnackBar('Пост опубликован!');
      closeModal($modal);
      $modal.reset();
    }
  }
}

export const addPostModalComponent = new AddPostModalComponent({
  selector: 'app-add-post',
  template: `
    <form class="modal hidden" id="add-post">
      <div class="modal__dialog">
        <div class="modal__content">
          <div class="modal__header">
            <h5 class="modal__header-title">Добавить пост</h5>
            <button class="btn btn-secondary" id="close-modal" type="button">&#10006;</button>
          </div>
          <div class="modal__body">
            <div class="form-item">
              <input type="text" name="img" id="img" class="modal__field" placeholder="Фото url">
              <label for="img" class="field-label">Фото url</label>
              <div name="img-error" class="error-container"></div>
            </div>
            <div class="form-item">
              <input type="text" name="description" id="description" class="modal__field" placeholder="Описание">
              <label for="description" class="field-label">Описание</label>
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-secondary mr" id="cancel-button" type="button">Отмена</button>
            <button class="btn btn-primary" id="save-button">Подтвердить</button>
          </div>
        </div>
      </div>
    </form>
  `
});