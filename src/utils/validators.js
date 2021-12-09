import { findUserInLS } from "./localstorageAdapter";

export const isUserNameMatch = (getUsersLS, str) => getUsersLS().find((user) => user.username === str);
export const isNotEmpty = (str) => !!str;
export const isEmpty = (str) => !str;
export const isNumeric = (str) => /^\d+$/.test(str);
export const isEmail = (str) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
export const isPassword = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(str);
export const isNoUserMatches = (str) => !findUserInLS(str);
export const isNoUserNameMatches = (getUsersLS, str) => !isUserNameMatch(getUsersLS, str);
export const isPasswordsMatch = (prevPasswordFieldName, password) => {
  const prevPassword = document.querySelector(`input[name=${prevPasswordFieldName}`).value;
  return prevPassword === password;
}

export function getErrorSignin(email, password, users) {
  if (isEmpty(email)) {
    return 'Введите Email и пароль.';
  };

  const user = findUserInLS(email);
  if (!user) {
    return 'Пользователь с таким email не найден. Пройдите регистрацию.';
  };

  if (user.password !== password) {
    return 'Неверный пароль';
  }

  return '';
}