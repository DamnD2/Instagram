function findUserInDB (email) {
  return users.getValue().find((user) => user.email === email);
}
const isUserNameMatch = (str) => users.getValue().find((user) => user.username === str);

const isNotEmpty = (str) => !!str;
const isEmpty = (str) => !str;
const isNumeric = (str) => /^\d+$/.test(str);
const isEmail = (str) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
const isPassword = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(str);
const isNoUserMatches = (str) => !findUserInDB(str);
const isNoUserNameMatches = (str) => !isUserNameMatch(str);

function signinValidation (email, password) {
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