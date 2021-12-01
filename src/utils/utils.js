export const setHash = (hash) => location.hash = hash;

export const findUserInDB = (users, email) => users.getValue().find((user) => user.email === email);
