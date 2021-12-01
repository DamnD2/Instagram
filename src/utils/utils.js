export const setHash = (hash) => location.hash = hash;

export const findUserInDB = (users, email) => users.getValue().find((user) => user.email === email);

export const clearInputs = (...inputs) => inputs.forEach((input) => input.value = '');
