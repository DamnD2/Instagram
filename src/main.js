import { appModule } from "./app/app.module";
import { fillEditModal, editUserModal } from "./utils/initModals";
import store from './Store/data';
import { getLoggedInUserName } from "./utils/localstorageAdapter";
import { syncDataBaseandStore } from '../provider';

appModule.start();

void async function init() {
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
  await syncDataBaseandStore();
}();