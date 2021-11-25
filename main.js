const signupFormWrapper = document.getElementById('signup-wrapper');
const switchToSigninButton = signupFormWrapper.querySelector('.main__signin-link');

const signinFormWrapper = document.getElementById('signin-wrapper');
const signinForm = signinFormWrapper.querySelector('.signin');
const signinEmail = signinForm.querySelector('.email');
const signinPassword = signinForm.querySelector('.password');
const signinError = signinForm.querySelector('.signin__error');
const switchToSignupButton = signinFormWrapper.querySelector('.main__signup-link');

const users = new LocalStorageAdapter('users', 'array');
const loggedInUserData = new LocalStorageAdapter('loggedInUserData', 'object');

const signupForm = new Form('.signup', signupFormConfig);

void function init () {
  const loggedInUserName = loggedInUserData.getValue().username;
  if(loggedInUserName) {
    alert(`Hello ${loggedInUserName}`);
  }
}();

signinForm.addEventListener('submit', () => {
  signinSubmit(signinEmail.value, signinPassword.value);
});
signupForm.form.addEventListener('submit',() => {
  const isValid = signupForm.validateAndGetIsValid();

  if (isValid) {
    const newUser = signupForm.getFieldsData();
    users.setValue(newUser);
    signupForm.clear();
  }
});
switchToSigninButton.addEventListener('click', () => switchToSignin());
switchToSignupButton.addEventListener('click', () => switchToSignup());

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