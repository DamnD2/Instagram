import store from '../Store/data';

export const isUserNameMatch = (username) => store.data.users.find((user) => user.username === username);
export const isNotEmpty = (str) => !!str;
export const isEmpty = (str) => !str;
export const isNumeric = (str) => /^\d+$/.test(str);
export const isEmail = (str) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
export const isPassword = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(str);
export const isNoUserMatches = (email) => !store.data.users.find((user) => user.email === email);
export const isNoUserNameMatches = (username) => !isUserNameMatch(username);

export const isNoUserMatchesEdit = (email) => {
  const userId = document.getElementById('edituser').dataset.userid;
  const currentUser = store.data.users.find((user) => user._id === userId);
  const user = store.data.users.find((user) => user.email === email);
  return !user || currentUser.email === user.email;
};

export const isNoUserNameMatchesEdit = (username) => {
  const idEditetedUser = document.getElementById('edituser').dataset.userid;
  const user = store.data.users.find((user) => user._id === idEditetedUser);
  return !isUserNameMatch(username) || username === user.username;
}

export const isPasswordsMatch = (prevPasswordFieldName, password) => {
  const prevPassword = document.querySelector(`input[name=${prevPasswordFieldName}`).value;
  return prevPassword === password;
}

export function getErrorSignin(email, password, users) {
  if (isEmpty(email)) {
    return 'Введите Email и пароль.';
  };

  const currentUser = users.find((user) => user.email === email);
  if (!currentUser) {
    return 'Пользователь с таким email не найден. Пройдите регистрацию.';
  };

  /* if (currentUser.password !== password) {
    return 'Неверный пароль';
  } */

  return '';
}