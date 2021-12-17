import Form from "./Form";
import { editUserConfig } from "./formConfigs";
import { getUsersLS, removeUserLS, editUserLS } from "./localstorageAdapter";
import { setUrlParams } from "./utils";
import { homePageComponentLink } from "../app/app.module";
import { initComponent } from "../Framework/component/init.component";

export function initModals() {
  const showButtons = getArrayBySelector('[data-show]');
  const dismissButtons = getArrayBySelector('[data-dismiss]');
  const confirmButtons = getArrayBySelector('[data-confirm]');

  dismissButtons.forEach((button) => {
    const modal = document.getElementById(button.dataset.dismiss);
    button.addEventListener('click', () => closeModal(modal));
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

  confirmButtons.forEach((button) => {
    const handlerName = button.dataset.confirm;
    button.addEventListener('click', confirmHandlerMap[handlerName]);
  });
};



const confirmHandlerMap = {
  'edituser': handleEditUser,
  'removeuser': handleRemoveUser,
}

export const editUserModal = document.getElementById('edituser');

export function fillEditModal(userId) {
  const user = getUsersLS().find((user) => user.username === userId);
  editUserModal.dataset.userid = userId;
  for(let key in user) {
    editUserModal.querySelector(`[name=${key}]`).value = user[key];
  }
  editUserModal.querySelector(`[name="confirmpassword"]`).value = user.password;
}

function fillEditUserCard(newUserData, userId) {
  const card = document.querySelector(`[data-id="${userId}"]`);
  const cardUsername = card.querySelector('[name="username"]');
  const cardEmail = card.querySelector('[name="email"]');
  const cardAge = card.querySelector('[name="age"]');
  cardUsername.innerHTML = newUserData.username;
  cardEmail.innerHTML = `email: ${newUserData.email}`;
  cardAge.innerHTML = `age: ${newUserData.age}`;
}

function handleEditUser({ target }) {
  const userId = target.closest('.modal').dataset.userid;
  const modal = new Form(editUserModal, editUserConfig);
  
  modal.validate();
  if (modal.isValid) {
    editUserLS(userId, modal.getFieldsData());
    fillEditUserCard(modal.getFieldsData(), userId);
    /* modal.dataset.userid = modal.getFieldsData().username; */
    modal.clear();
    closeModal(editUserModal);
    initComponent(homePageComponentLink);
  }
};

function getArrayBySelector(selector) {
  const arrayOfElements = [];
  document.querySelectorAll(selector).forEach((element) => arrayOfElements.push(element));
  return arrayOfElements;
}

function handleRemoveUser({ target }) {
  const userId = target.closest('.modal').dataset.userid;
  let index = null;
  getUsersLS().forEach((user, i) => {
    if (user.username === userId) index = i;
  });
  index && removeUserLS(index);
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

