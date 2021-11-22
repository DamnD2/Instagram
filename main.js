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


void function init () {
  const loggedInUserName = loggedInUserData.getValue().username;
  if(loggedInUserName) {
    alert(`Hello ${loggedInUserName}`);
  }
}();

signupForm.addEventListener('submit', () => {
  signupSubmit(signupEmail.value, signupAge.value, signupUserName.value, signupPassword.value);
});
signinForm.addEventListener('submit', () => {
  signinSubmit(signinEmail.value, signinPassword.value);
});
switchToSigninButton.addEventListener('click', () => switchToSignin());
switchToSignupButton.addEventListener('click', () => switchToSignup());

function signupSubmit (email, age, username, password) {
  const fields = [signupEmail, signupAge, signupUserName, signupPassword];
  const emailErrorMessage = emailValidation(email);
  const ageErrorMessage = ageValidation(age);
  const userNameErrorMessage = userNameValidation(username);
  const passwordErrorMessage = passwordValidaton(password);

  const successfully = !emailErrorMessage && !ageErrorMessage && !userNameErrorMessage && !passwordErrorMessage;

  removeErrorClassFromFields(...fields);
  setError(signupEmailError, emailErrorMessage, signupEmail);
  setError(signupAgeError, ageErrorMessage, signupAge);
  setError(signupUserNameError, userNameErrorMessage, signupUserName);
  setError(signupPasswordError, passwordErrorMessage, signupPassword);

  if (successfully) {
    users.setValue({ email, age, username, password });
    clearFields(...fields);
  }
}

function signinSubmit (email, password) {
  const errorMessage = signinValidation(email, password);

  if (errorMessage) {
    signinError.innerText = errorMessage;
  } else {
    const userData = findUserInDB(email);
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

function clearFields (...fields) {
  fields.forEach((field) => field.value = '');
}

function removeErrorClassFromFields (...fields) {
  fields.forEach((field) => field.classList.remove('error'));
}

function setError (errorElement, errorMessage, field) {
  errorElement.innerText = errorMessage;
  errorMessage && field.classList.add('error');
}

function findUserInDB (email) {
  return users.getValue().find((user) => user.email === email);
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