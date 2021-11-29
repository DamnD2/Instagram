import LocalStorageAdapter from "./localstorageAdapter";
const users = new LocalStorageAdapter('users', 'array');
export function findUserInDB (email) {
  return users.getValue().find((user) => user.email === email);
}
export const isUserNameMatch = (str) => users.getValue().find((user) => user.username === str);

export const isNotEmpty = (str) => !!str;
export const isEmpty = (str) => !str;
export const isNumeric = (str) => /^\d+$/.test(str);
export const isEmail = (str) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
export const isPassword = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(str);
export const isNoUserMatches = (str) => !findUserInDB(str);
export const isNoUserNameMatches = (str) => !isUserNameMatch(str);

export function signinValidation (email, password) {
  if (isEmpty(email)) {
    return 'Введите Email и пароль.';
  };

  const user = findUserInDB(email);
  if (!user) {
    return 'Пользователь с таким email не найден. Пройдите регистрацию.';
  };

  if (user.password !== password) {
    return 'Неверный пароль';
  } else {
    return false;
  }
}