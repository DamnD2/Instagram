import { isNotEmpty, isEmail, isNoUserMatches, isNumeric, isNoUserNameMatches, isPassword, isPasswordsMatch, isNoUserMatchesEdit, isNoUserNameMatchesEdit } from "./validators";
import { getUsersLS } from "./localstorageAdapter";

export const signupFormConfig = [
  {
    name: 'email',
    validators: [
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
    validators: [
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
    validators: [
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
    validators: [
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
  {
    name: 'confirmpassword',
    validators: [
      {
        validator: isNotEmpty,
        errorMessage: 'Подтвердите пароль. ',
      },
      {
        validator: isPasswordsMatch.bind(null, 'password'),
        errorMessage: 'Пароли не совпадают.'
      }
    ],
  },
];

export const editUserConfig = [
  {
    name: 'email',
    validators: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите email. '
      },
      {
        validator: isEmail,
        errorMessage: 'Email должен содержать символ "@" и "." а так же от 2 до 4 символов после точки. '
      },
      {
        validator: isNoUserMatchesEdit,
        errorMessage: 'На данный email уже зарегистрирован аккаунт.'
      }
    ],
  },
  {
    name: 'age',
    validators: [
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
    validators: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите имя пользователя. '
      },
      {
        validator: isNoUserNameMatchesEdit,
        errorMessage: 'Это имя пользователя уже занято. Попробуйте другое.'
      }
    ],
  },
  {
    name: 'password',
    validators: [
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
  {
    name: 'confirmpassword',
    validators: [
      {
        validator: isNotEmpty,
        errorMessage: 'Подтвердите пароль. ',
      },
      {
        validator: isPasswordsMatch.bind(null, 'password'),
        errorMessage: 'Пароли не совпадают.'
      }
    ],
  },
  {
    name: 'phone',
  },
  {
    name: 'photo',
  },
  {
    name: 'description',
  },
];

export const addPostConfig = [
  {
    name: 'img',
    validators: [
      {
        validator: isNotEmpty,
        errorMessage: 'Введите фото url'
      }
    ],
  },
  {
    name: 'description'
  }
]