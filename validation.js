const isEmpty = (str) => !str;
const isNumeric = (str) => /^\d+$/.test(str);
const isEmail = (str) => /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str);
const isPassword = (str) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/.test(str);

function emailValidation (email) {
  let errorMessage = '';
  errorMessage += isEmpty(email) ? 'Введите email.' : '';
  errorMessage += isEmail(email) ? '' : ' Email должен содержать символ "@" и "." а так же от 2 до 4 символов после точки.';
  errorMessage += findUserInDB(email) ? 'На данный email уже зарегистрирован аккаунт.' : '';

  return errorMessage;
}

function ageValidation (age) {
  let errorMessage = '';
  errorMessage += isEmpty(age) ? 'Введите возраст.' : '';
  errorMessage += isNumeric(age) ? '' : ' Допустимы только цифры.';

  return errorMessage;
}

function userNameValidation (username) {
  let errorMessage = '';
  const isUserNameMatch = users.getValue().find((user) => user.username === username);
  errorMessage += isEmpty(username) ? 'Введите имя пользователя' : '';
  errorMessage += isUserNameMatch ? 'Это имя пользователя уже занято. Попробуйте другое.' : '';

  return errorMessage;
}

function passwordValidaton (password) {
  let errorMessage = '';
  errorMessage += isEmpty(password) ? 'Введите пароль.' : '';
  errorMessage += isPassword(password) ? '' : ` Пароль должен содержать как минимум восемь символов, заглавную букву, строчную букву, цифру и специальный символ "!$%@#£€*?&".`;

  return errorMessage;
}

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