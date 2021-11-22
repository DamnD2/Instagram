const signupFormWrapper = document.querySelector('.signup-wrapper');
const signupForm = document.querySelector('.signup');
const signupEmail = signupForm.querySelector('.email');
const signupAge = signupForm.querySelector('.age');
const signupUserName = signupForm.querySelector('.username');
const signupPassword = signupForm.querySelector('.password');
const signupEmailError = signupForm.querySelector('.email-error');
const signupAgeError = signupForm.querySelector('.age-error');
const signupUserNameError = signupForm.querySelector('.username-error');
const signupPasswordError = signupForm.querySelector('.password-error');
const switchToSigninButton = document.querySelector('.main__signin-link');

const signinFormWrapper = document.querySelector('.signin-wrapper');
const signinForm = document.querySelector('.signin');
const signinEmail = signinForm.querySelector('.email');
const signinPassword = signinForm.querySelector('.password');
const signinError = signinForm.querySelector('.signin__error');
const switchToSignupButton = document.querySelector('.main__signup-link');

const users = new LocalStorageAdapter('users', 'array');
const loggedInUserData = new LocalStorageAdapter('loggedInUserData', 'object');


(function init () {
  const loggedInUserName = loggedInUserData.getValue().username;
  if(loggedInUserName) {
    alert(`Hello ${loggedInUserName}`);
  }
})();

signupForm.addEventListener('submit', () => signupSubmit());
signinForm.addEventListener('submit', () => signinSubmit());
switchToSigninButton.addEventListener('click', () => switchToSignin());
switchToSignupButton.addEventListener('click', () => switchToSignup());

function signupSubmit () {
  const emailErrorMessage = emailValidation(signupEmail.value);
  const ageErrorMessage = ageValidation(signupAge.value);
  const userNameErrorMessage = userNameValidation(signupUserName.value);
  const passwordErrorMessage = passwordValidaton(signupPassword.value);

  const successfully = !emailErrorMessage && !ageErrorMessage && !userNameErrorMessage && !passwordErrorMessage;
  removeErrorClassFromFields();

  setError(signupEmailError, emailErrorMessage, signupEmail);
  setError(signupAgeError, ageErrorMessage, signupAge);
  setError(signupUserNameError, userNameErrorMessage, signupUserName);
  setError(signupPasswordError, passwordErrorMessage, signupPassword);

  if (successfully) {
    users.setValue({
      email: signupEmail.value,
      age: signupAge.value,
      username: signupUserName.value,
      password: signupPassword.value,
    });
    clearSignupForm();
  }
}

function signinSubmit () {
  const errorMessage = signinValidation(signinEmail.value, signinPassword.value);

  if (errorMessage) {
    signinError.innerText = errorMessage;
  } else {
    const userData = findUserInDB(signinEmail.value);
    delete userData.password;
    loggedInUserData.setValue(userData);
    signinError.innerText = '';
    signinEmail.value = '';
    signinPassword.value = '';

    alert(`Hello`);
  }
}

function switchToSignin () {
  signinFormWrapper.classList.add('active');
  signupFormWrapper.classList.remove('active');
}

function switchToSignup () {
  signupFormWrapper.classList.add('active');
  signinFormWrapper.classList.remove('active');
}

function clearSignupForm () {
  const clearField = (element) => element.value = '';
  clearField(signupEmail);
  clearField(signupAge);
  clearField(signupUserName);
  clearField(signupPassword);
}

function removeErrorClassFromFields () {
  const removeErrorClass = (element) => element.classList.remove('error');
  removeErrorClass(signupEmail);
  removeErrorClass(signupAge);
  removeErrorClass(signupUserName);
  removeErrorClass(signupPassword);
}

function setError (errorElement, errorMessage, field) {
  errorElement.innerText = errorMessage;
  errorMessage && field.classList.add('error');
}

function emailValidation (emailValue) {
  let errorMessage = '';
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  errorMessage += emailValue ? '' : 'Введите email.';
  errorMessage += reg.test(emailValue) ? '' : ' Email должен содержать символ "@" и "." а так же от 2 до 4 символов после точки.';
  errorMessage += findUserInDB(emailValue) ? 'На данный email уже зарегистрирован аккаунт.' : '';

  return errorMessage;
}

function ageValidation (ageValue) {
  let errorMessage = '';
  const reg = /^\d+$/;

  errorMessage += ageValue ? '' : 'Введите возраст.';
  errorMessage += reg.test(ageValue) ? '' : ' Допустимы только цифры.';

  return errorMessage;
}

function userNameValidation (userNameValue) {
  let errorMessage = '';
  const isUserNameMatch = users.getValue().find((user) => user.username === userNameValue);

  errorMessage += userNameValue ? '' : 'Введите имя пользователя';
  errorMessage += isUserNameMatch ? 'Это имя пользователя уже занято. Попробуйте другое.' : '';

  return errorMessage;
}

function passwordValidaton (passwordValue) {
  let errorMessage = '';
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;

  errorMessage += passwordValue ? '' : 'Введите пароль.';
  errorMessage += reg.test(passwordValue) ? '' : ` Пароль должен содержать как минимум восемь символов, заглавную букву, строчную букву, цифру и специальный символ "!$%@#£€*?&".`;

  return errorMessage;
}

function signinValidation (emailValue, passwordValue) {
  if (!emailValue) {
    return 'Введите Email и пароль.';
  };

  const user = findUserInDB(emailValue);
  if (!user) {
    return 'Пользователь с таким email не найден. Пройдите регистрацию.';
  };

  if (user.password !== passwordValue) {
    return 'Неверный пароль';
  } else {
    return false;
  }
}

function findUserInDB (emailValue) {
  return users.getValue().find((user) => user.email === emailValue);
}

//  reset focus when the mouse is clicked on the element, so that the outline is not displayed
document.addEventListener('mousedown', (event) => {
  if (event.target.closest('.signup__submit')) {
    event.preventDefault();
  } else if (event.target.closest('.signin__submit')) {
      event.preventDefault();
  } else if (event.target.closest('.main__signin-link')) {
      event.preventDefault();
  } else if (event.target.closest('.main__signup-link')) {
      event.preventDefault();
  }
});