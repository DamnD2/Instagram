import { getUsersLS } from "./localstorageAdapter";

export const setHash = (hash) => location.hash = hash;

export const findUserInDB = (email) => getUsersLS().find((user) => user.email === email);

export const clearInputs = (...inputs) => inputs.forEach((input) => input.value = '');

export const redirectToMainPage = () => setHash('#main');
