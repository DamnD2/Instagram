import { appModule } from "./app/app.module";
import { fillEditModal, editUserModal } from "./utils/initModals";
import store from './Store/data';
import jwtDecode from 'jwt-decode';
import { getPosts, getUserByUsername, getUsers, syncDataBaseandStore } from '../provider';
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

  if (location.hash !== '#posts' && location.search) {
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

  if (location.hash.split('/')[0] === '#posts') {
    const userId = location.hash.split('/')[1];
    const posts = await getPosts(userId, getCookieValue('jwt'));
    store.setPosts(userId, posts.posts);
  }
  store.data.users = await getUsers();
}();