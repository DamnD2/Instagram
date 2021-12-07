import Form from "./Form";
import { signupFormConfig } from "./formConfigs";
import LocalStorageAdapter from "./LocalstorageAdapter";

const users = new LocalStorageAdapter('users', 'array');
const editUserModal = document.getElementById('edituser');
const editEmailField = editUserModal.querySelector('[name="email"]');
const editAgeField = editUserModal.querySelector('[name="age"]');
const editUsernameField = editUserModal.querySelector('[name="username"]');
const editPasswordField = editUserModal.querySelector('[name="password"]');
const editConfirmPasswordField = editUserModal.querySelector('[name="confirmpassword"]');


export function initModals() {
  const dismissButtons = [];
  const showButtons = [];
  const confirmButtons = [];

  document.querySelectorAll('button[data-show]').forEach((element) => showButtons.push(element));
  document.querySelectorAll('button[data-dismiss]').forEach((element) => dismissButtons.push(element));
  document.querySelectorAll('button[data-confirm]').forEach((element) => confirmButtons.push(element));

  dismissButtons.forEach((button) => {
    const modal = document.getElementById(button.dataset.dismiss);
    button.addEventListener('click', () => closeModal(modal));
  });

  showButtons.forEach((button) => {
    const modal = document.getElementById(button.dataset.show);
    button.addEventListener('click', ({ target }) => {
      openModal(modal);
    
      const userId = target.closest('.card').dataset.id;
      if (modal.id === 'edituser') fillEditModal(userId);
      if (modal.id === 'removeuser') modal.dataset.userid = userId;
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

function fillEditModal(userId) {
  const user = users.getValue().find((user) => user.username === userId);
  editUserModal.dataset.userid = userId;
  editEmailField.value = user.email;
  editAgeField.value = user.age;
  editUsernameField.value = user.username;
  editPasswordField.value = user.password;
  editConfirmPasswordField.value = user.password;
}

function handleEditUser({ target }) {
  const userId = target.closest('.modal').dataset.userid;
  const modal = new Form(editUserModal, signupFormConfig);
  
  modal.validate();
  if (modal.isValid) {
    users.setValue(modal.getFieldsData());
    modal.clear();
    closeModal(editUserModal);
    alert(`Данные ${userId} изменены успешно!`);
  }
};

function handleRemoveUser({ target }) {
  const userId = target.closest('.modal').dataset.userid;
  let index = null;
  console.log(users.getValue())
  users.getValue().forEach((user, i) => {
    console.log(userId);
    if (user.username === userId) index = i;
  });
  index && users.removeArrayElement(index);

  closeModal(target.closest('.modal'))
};

function openModal(modal) {
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
};

function closeModal(modal) {
  modal.classList.remove('show');
  if (modal.id === 'edituser') {
    const errorContainers = modal.querySelectorAll('.error-container');
    errorContainers.forEach((element) => element.innerText = '');
  }
  document.body.style.overflow = 'auto';
}