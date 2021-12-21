import { appModule } from "./app/app.module";
import { fillEditModal, editUserModal } from "./utils/initModals";
import store from './Store/data';
import { addUserLS, getLoggedInUserName, getUsersLS } from "./utils/localstorageAdapter";

appModule.start();

void function init() {
  store.setLoggedInUsername(getLoggedInUserName());
  if (location.search) {
    const userId = location.search.split('=')[1];
    fillEditModal(userId);
    setTimeout(() => {
      editUserModal.classList.add('show');
      editUserModal.classList.add('open');
      setTimeout(() => {
        editUserModal.classList.remove('hidden');
      });
    }, 0)
  }

  initDefaultUser();
}();

function initDefaultUser() {
  if (!getUsersLS().length) {
    addUserLS({
      email: 'god',
      username: 'God',
      password: 'admin',
      age: '12.6kkk',
      photo: 'https://media.discordapp.net/attachments/568141034345857129/635906494424023051/naaru.png?width=702&height=671',
    });
  }
}