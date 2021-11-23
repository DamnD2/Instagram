const signupFormWrapper = document.getElementById('signup-wrapper');
const signupForm = signupFormWrapper.querySelector('.signup');
const switchToSigninButton = signupFormWrapper.querySelector('.main__signin-link');

const signinFormWrapper = document.getElementById('signin-wrapper');
const signinForm = signinFormWrapper.querySelector('.signin');
const signinEmail = signinForm.querySelector('.email');
const signinPassword = signinForm.querySelector('.password');
const signinError = signinForm.querySelector('.signin__error');
const switchToSignupButton = signinFormWrapper.querySelector('.main__signup-link');

const users = new LocalStorageAdapter('users', 'array');
const loggedInUserData = new LocalStorageAdapter('loggedInUserData', 'object');

signupFormConfig = [
  {
    name: 'email',
    field: signupForm.querySelector('.email'),
    errorField: signupForm.querySelector('.email-error'),
    validationConfig: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите email. '
      },
      {
        validator: isEmail,
        errorMessage: 'Email должен содержать символ "@" и "." а так же от 2 до 4 символов после точки. '
      },
      {
        validator: isNoUserMatches,
        errorMessage: 'На данный email уже зарегистрирован аккаунт.'
      }
    ],
  },
  {
    name: 'age',
    field: signupForm.querySelector('.age'),
    errorField: signupForm.querySelector('.age-error'),
    validationConfig: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите возраст. '
      },
      {
        validator: isNumeric,
        errorMessage: 'Допустимы только цифры.'
      }
    ],
  },
  {
    name: 'username',
    field: signupForm.querySelector('.username'),
    errorField: signupForm.querySelector('.username-error'),
    validationConfig: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите имя пользователя. '
      },
      {
        validator: isNoUserNameMatches,
        errorMessage: 'Это имя пользователя уже занято. Попробуйте другое.'
      }
    ],
  },
  {
    name: 'password',
    field: signupForm.querySelector('.password'),
    errorField: signupForm.querySelector('.password-error'),
    validationConfig: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите пароль. ',
      },
      {
        validator: isPassword,
        errorMessage: 'Пароль должен содержать как минимум восемь символов, заглавную букву, строчную букву, цифру и специальный символ "!$%@#£€*?&".'
      }
    ],
  },
];

void function init () {
  const loggedInUserName = loggedInUserData.getValue().username;
  if(loggedInUserName) {
    alert(`Hello ${loggedInUserName}`);
  }
}();

signinForm.addEventListener('submit', () => {
  signinSubmit(signinEmail.value, signinPassword.value);
});
signupForm.addEventListener('submit',() => handleSignupSubmit(signupFormConfig));
switchToSigninButton.addEventListener('click', () => switchToSignin());
switchToSignupButton.addEventListener('click', () => switchToSignup());

function handleSignupSubmit(formConfig) {
  let successfully = true;

  formConfig.forEach(({ field, errorField, validationConfig }) => {
    const fieldValue = field.value;
    const errors = validationConfig.reduce((accum, currentValidator) => {
      const { errorMessage, validator } = currentValidator;
      accum += validator(fieldValue) ? '' : errorMessage;

      return accum;
    }, '');

    errorField.innerText = errors;

    if (errors) {
      field.classList.add('error');
      successfully = false;
    } else {
      field.classList.remove('error');
    }
  });

  if (successfully) {
    const newUser = formConfig.reduce((accum, { name, field }) => {
      accum[name] = field.value;
      return accum;
    }, {});
    const fields = formConfig.reduce((accum, { field }) => {
      accum.push(field);
      return accum;
    }, [])

    users.setValue(newUser);
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