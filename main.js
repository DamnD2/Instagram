const signinForm = document.querySelector('.signin-wrapper');
const signupForm = document.querySelector('.signup-wrapper');
let users = [];
let isLoggedInUser = JSON.parse(localStorage.getItem('isLoggedInUser'));

(function init () {
  const localStorageUsers = localStorage.getItem('users');
  if (localStorageUsers) {
    users = JSON.parse(localStorageUsers);
  }
  if(isLoggedInUser) {
    alert(`Hello ${isLoggedInUser.email}`);
  }
})();

document.addEventListener('click', (event) => {
  if (event.target.closest('.main__signin-link')) {
    switchToSignin();
  } else if (event.target.closest('.main__signup-link')) {
      switchToSignup();
  } else if (event.target.closest('.signup__submit')) {
      signupSubmit();
  } else if (event.target.closest('.signin__submit')) {
      signinSubmit();
  }
});

function signupSubmit () {
  const email = document.querySelector('.signup__field-email');
  const name = document.querySelector('.signup__field-name');
  const userName = document.querySelector('.signup__field-username');
  const password = document.querySelector('.signup__field-password');

  email.classList.remove('error');
  name.classList.remove('error');
  userName.classList.remove('error');
  password.classList.remove('error');

  if (emailValidation(email.value) === false) {
    const errorMessage = 'Вы ввели некорректный email.';
    addErrorClassAndSetSignupError(errorMessage, email);
  } else if (checkingEmailMatch(email.value)) {
      const errorMessage = 'На данный email уже зарегистрирован аккаунт.';
      addErrorClassAndSetSignupError(errorMessage, email);
  } else if (!name.value.length) {
      const errorMessage = 'Введите имя и фамилию.';
      addErrorClassAndSetSignupError(errorMessage, name);
  } else if (!userName.value.length) {
      const errorMessage = 'Введите имя пользователя.';
      addErrorClassAndSetSignupError(errorMessage, userName);
  } else if (checkingUsernameMatch(userName.value)) {
      const errorMessage = 'Это имя пользователя уже занято. Попробуйте другое.';
      addErrorClassAndSetSignupError(errorMessage, userName);
  } else if (passwordValidaton(password.value) === false) {
      const errorMessage = `Пароль должен содержать как минимум восемь символов, одну
      заглавную букву, одну строчную буква, одну цифру и один специальный символ.`;
      addErrorClassAndSetSignupError(errorMessage, password);
  } else {
    users.push({
      email: email.value,
      name: name.value,
      username: userName.value,
      password: password.value,
    });
    localStorage.setItem('users', JSON.stringify(users));
    addErrorClassAndSetSignupError('', null);
    email.value = '';
    name.value = '';
    userName.value = '';
    password.value = '';
    switchToSignin();
  }
}

function signinSubmit () {
  const email = document.querySelector('.signin__field-email');
  const password = document.querySelector('.signin__field-password');

  email.classList.remove('error');
  password.classList.remove('error');

  if (!email.value.length) {
    const errorMessage = 'Введите email.';
    addErrorClassAndSetSigninError(errorMessage, email);
  } else if (checkingEmailMatch(email.value) === false) {
    const errorMessage = 'Пользователь с таким email не найден. Пройдите регистрацию.';
    addErrorClassAndSetSigninError(errorMessage, email);
  } else if (userVerification(email.value, password.value) === false) {
    const errorMessage = 'Неверный пароль.';
    addErrorClassAndSetSigninError(errorMessage, password);
  } else {
    isLoggedInUser = {email: email.value};
    localStorage.setItem('isLoggedInUser', JSON.stringify(isLoggedInUser));
    addErrorClassAndSetSigninError('', null);
    email.value = '';
    password.value = '';
    alert(`Hello ${isLoggedInUser.email}`);
  }
}

function userVerification (email, password) {
  const user = users.find((user) => user.email === email);
  
  return user.password === password;
}

function switchToSignin () {
  signinForm.classList.add('active');
  signupForm.classList.remove('active');
}

function switchToSignup () {
  signupForm.classList.add('active');
  signinForm.classList.remove('active');
}

function addErrorClassAndSetSignupError (message, node) {
  const signupError = document.querySelector('.signup__error');
  signupError.innerText = message;
  if (node) {
    node.focus();
    node.classList.add('error');
  }
}

function addErrorClassAndSetSigninError (message, node) {
  const signinError = document.querySelector('.signin__error');
  signinError.innerText = message;
  if (node) {
    node.focus();
    node.classList.add('error');
  }
}

function emailValidation (email) {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email);
}

function passwordValidaton (password) {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
  return reg.test(password);
}

function checkingEmailMatch (email) {
  let match = false;

  users && users.forEach((user) => {
      if (user.email === email) {
        match = true;
      }
    });

  return match;
}

function checkingUsernameMatch (userName) {
  let match = false;

  users && users.forEach((user) => {
      if (user.username === userName) {
        match = true;
      }
    });

  return match;
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