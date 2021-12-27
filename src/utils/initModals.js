import Form from "./Form";
import { editUserConfig } from "./formConfigs";
import { getUsersLS, removeUserLS, editUserLS, findUserInLsForUsername } from "./localstorageAdapter";
import { setUrlParams } from "./utils";
import { homePageComponentLink } from "../app/app.module";
import { initComponent } from "../Framework/component/init.component";
import { removeUser } from "../../provider";
import store from '../Store/data';

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

      if (userId === 'God') return;

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

export function fillEditModal(userId) {
  const user = getUsersLS().find((user) => user.username === userId);
  editUserModal.dataset.userid = userId;
  for(let key in user) {
    if (key === 'sex') {
      editUserModal.querySelectorAll(`[name=${key}]`).forEach((radio) => {
        if (radio.value === user[key])  radio.checked = true;
      })
    } else {
      editUserModal.querySelector(`[name=${key}]`).value = user[key];
    }
  }
  editUserModal.querySelector(`[name="confirmpassword"]`).value = user.password;
}


function handleEditUser({ target }) {
  const userId = target.closest('.modal').dataset.userid;
  const modal = new Form(editUserModal, editUserConfig);
  
  modal.validate();
  if (modal.isValid) {
    const newUserData = { ...getSexAndColorData(), ...modal.getFieldsData()}
    editUserLS(userId, newUserData);
    addUserPhotoInLS(userId);
    /* modal.dataset.userid = modal.getFieldsData().username; */
    editUserModal.reset();
    closeModal(editUserModal);
    initComponent(homePageComponentLink);
  }
};

function addUserPhotoInLS(userId) {
  const $myphoto = editUserModal.querySelector(`[name='myphoto']`);
  const myphoto = Array.from($myphoto.files)[0];
  const reader = new FileReader();

  if (!myphoto) return;

  reader.onload = (event) => {
    const photoBase64 = event.target.result;
    const user = findUserInLsForUsername(userId);

    user.photo = photoBase64;
    editUserLS(userId, user);
    initComponent(homePageComponentLink);
  }
  reader.readAsDataURL(myphoto);
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

function handleRemoveUser({ target }) {
  const id = target.closest('.modal').dataset.userid;
  removeUser(id);
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

