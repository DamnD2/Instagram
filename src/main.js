import { appModule } from "./app/app.module";
import { fillEditModal, editUserModal } from "./utils/initModals";
import store from './Store/data';
import jwtDecode from 'jwt-decode';
import { getUserByUsername, getUsers, syncDataBaseandStore } from '../provider';
import { getCookieValue } from "./utils/cookies";

appModule.start();

void async function init() {
  const token = getCookieValue('jwt');
  if (token) {
    const currentUser = await getUserByUsername(await jwtDecode(token).username);
    if (currentUser) {
      store.setLoggedInUsername(currentUser.username);
    }
  }

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
  store.data.users = await getUsers();
}();