import store from './src/Store/data';
import jwtDecode from 'jwt-decode';
import { setCookie } from "./src/utils/cookies";

//
const usersURL = 'http://localhost:1111/users';
const authURL = 'http://localhost:1111/auth';

export async function getUsers() {
  return await request(usersURL);
}

export async function getUserByID(id) {
  return await request(`${usersURL}/id=${id}`);
}

export async function getUserByEmail(email) {
  return email ? await request(`${usersURL}/email=${email}`) : null;
}

export async function getUserByUsername(username) {
  return username ? await request(`${usersURL}/username=${username}`) : 'null';
}

export async function registration(newUser) {
  await request(`${authURL}/registration`, 'POST', newUser);
  store.data.users.push(newUser);
}

export async function login(email, password) {
  const response = await request(`${authURL}/login`, 'POST', { email, password });
  const username = jwtDecode(response.token).username;
  setCookie('jwt', response.token);
  store.setLoggedInUsername(username);
}

export async function syncDataBaseandStore() {
  store.data.users = await getUsers();
}

export async function addNewUser(newUser) {
  await request(usersURL, 'POST', newUser);
  //
  store.data.users.push(newUser);
}

export async function removeUser(id) {
  await request(`${usersURL}/${id}`, 'DELETE');
  //
  store.data.users = store.data.users.filter((user) => user.id !== id);
}

export async function editUser(id, newUserData) {
  await request(`${usersURL}/${id}`, 'PUT', newUserData);
  //
  const user = store.data.users.find((user) => user.id === id);
  const index = store.data.users.findIndex((user) => user.id === id);
  store.data.users[index] = { ...user, ...newUserData };
  store.data.users = [ ...store.data.users ];
}

async function request(url, method = 'GET', data = null, headersData) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    if (headersData) headers = { ...headers, ...headersData }

    const responce = await fetch(url, {
      method,
      headers,
      body
    });

    return responce.json()
  } catch(e) {
    console.warn(e.message);
  }
}

// const user = await api.posts.getList();

// api
//   posts.js
//   users.js
//   endpoints.js : 
//   index.js