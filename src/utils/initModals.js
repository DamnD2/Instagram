import Form from "./Form";
import { editUserConfig } from "./formConfigs";
import { openSnackBar, redirectToSignIn, setUrlParams } from "./utils";
import { homePageComponentLink } from "../app/app.module";
import { initComponent } from "../Framework/component/init.component";
import { editUser, getUserByID, removeUser } from "../../provider";
import store from '../Store/data';
import { deleteCookie, getCookieValue } from "./cookies";

export const editUserModal = document.getElementById('edituser');

export function initModals() {
  const showButtons = getArrayBySelector('[data-show]');
  const dismissButtons = getArrayBySelector('[data-dismiss]');
  const modals = getArrayBySelector('.modal');

  modals.forEach((modal) => modal.addEventListener('submit', (event) => event.preventDefault()));
  modals.forEach((modal) => modal.addEventListener('submit', confirmHandlerMap[modal.id]));
  

  dismissButtons.forEach((button) => {
    const modal = document.getElementById(button.dataset.dismiss);
    button.addEventListener('click', () => {
      modal.reset();
      closeModal(modal)
    });
  });

  showButtons.forEach((button) => {
    const modal = document.getElementById(button.dataset.show);
    button.addEventListener('click', ({ target }) => {
      const userId = target.closest('.card').dataset.id;

      if (modal.id === 'edituser') fillEditModal(userId);
      modal.dataset.userid = userId;
      openModal(modal);
    });
  });
};

const confirmHandlerMap = {
  'edituser': handleEditUser,
  'removeuser': handleRemoveUser,
}

//
export async function fillEditModal(userId) {
  let user = store.data.users.find((user) => user._id === userId);
  if (!user) {
    user = await getUserByID(userId);
  };
  editUserModal.dataset.userid = userId;
  for(let key in user) {
    if (key === 'sex') {
      editUserModal.querySelectorAll(`[name=${key}]`).forEach((radio) => {
        if (radio.value === user[key])  radio.checked = true;
      })
    } else if (key !== 'password') {
      const field = editUserModal.querySelector(`[name=${key}]`);
      if (field) field.value = user[key];
    }
  }
}

//
function handleEditUser({ target }) {
  const userId = target.closest('.modal').dataset.userid;
  const modal = new Form(editUserModal, editUserConfig);
  
  modal.validate();
  if (modal.isValid) {
    const newUserData = { ...getSexAndColorData(), ...modal.getFieldsData(), ...getPhotoData() };
    editUser(userId, newUserData, getCookieValue('jwt'));

    const user = store.data.users.find((user) => user._id === userId);
    const index = store.data.users.findIndex((user) => user._id === userId);
    store.data.users[index] = { ...user, ...newUserData };
    store.data.users = [ ...store.data.users ];

    /* modal.dataset.userid = modal.getFieldsData().username; */
    editUserModal.reset();
    closeModal(editUserModal);
    initComponent(homePageComponentLink);
  }
};

function getPhotoData() {
  /* const $myphoto = editUserModal.querySelector(`[name='myphoto']`);
  const myphoto = Array.from($myphoto.files)[0];
  const reader = new FileReader();
  reader.readAsDataURL(myphoto);

  const result = {};

  if (!myphoto) return {};

  reader.onload = (event) => {
    result['photo'] = event.target.result;
  }

  return result; */
}

function getSexAndColorData() {
  const data = {};
  const select = document.querySelector('[name="color"]');
  const radios = document.querySelectorAll('[name="sex"]');

  if (select.value !== select.dataset.title) {
    data[select.name] = select.value;
  };

  radios.forEach((radio) => {
    if (radio.checked) {
      data[radio.name] = radio.value;
    }
  });

  

  return data;
}

function getArrayBySelector(selector) {
  const arrayOfElements = [];
  document.querySelectorAll(selector).forEach((element) => arrayOfElements.push(element));
  return arrayOfElements;
}

async function handleRemoveUser({ target }) {
  const id = target.closest('.modal').dataset.userid;
  const response = await removeUser(id, getCookieValue('jwt'));
  if (response.username) {
    openSnackBar(`Пользователь ${response.username} был успешно удалён`);
    store.data.users = store.data.users.filter((user) => user._id !== id);

    if (response.username === store.data.loggedInUsername) {
      store.setLoggedInUsername('');
      redirectToSignIn();
      deleteCookie('jwt');
    }
  }
  initComponent(homePageComponentLink);
  closeModal(target.closest('.modal'))
};

/* const disableScrollingBody = () => document.body.style.overflow = 'hidden';
const enableScrollingBody = () => document.body.style.overflow = 'auto'; */

function openModal(modal) {
  modal.classList.add('show');
  setTimeout(() => { modal.classList.remove('hidden') })
  setTimeout(() => { modal.classList.add('open') },300);
  if (modal.id === 'edituser') setUrlParams(`?modalUserId=${modal.dataset.userid}`);

  /* disableScrollingBody(); */
};

function closeModal(modal) {
  modal.classList.add('hidden');
  modal.classList.remove('open');
  setTimeout(() => modal.classList.remove('show'), 300);
  if (modal.id === 'edituser') {
    const errorContainers = modal.querySelectorAll('.error-container');
    setTimeout(() => {errorContainers.forEach((element) => element.innerText = '')}, 300);
    setUrlParams('');
  }
  const errorContainers = document.querySelectorAll('.error-container');
  errorContainers.forEach((element) => element.classList.remove('show'));

  /* enableScrollingBody(); */
}

