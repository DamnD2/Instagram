import { findUserInDB } from "./utils";

export const isUserNameMatch = (users, str) => users.getValue().find((user) => user.username === str);
export const isNotEmpty = (str) => !!str;
export const isEmpty = (str) => !str;
export const isNumeric = (str) => /^\d+$/.test(str);
export const isEmail = (str) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
export const isPassword = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(str);
export const isNoUserMatches = (users, str) => !findUserInDB(users, str);
export const isNoUserNameMatches = (users, str) => !isUserNameMatch(users, str);
export const isPasswordsMatch = (prevPasswordFieldName, password) => {
  const prevPassword = document.querySelector(`input[name=${prevPasswordFieldName}`).value;
  console.log(`prevPassword: ${prevPassword}`);
  console.log(`password: ${password}`);
  return prevPassword === password;
}

export function getErrorSignin(email, password, users) {
  if (isEmpty(email)) {
    return 'Введите Email и пароль.';
  };

  const user = findUserInDB(users, email);
  if (!user) {
    return 'Пользователь с таким email не найден. Пройдите регистрацию.';
  };

  if (user.password !== password) {
    return 'Неверный пароль';
  }

  return '';
}