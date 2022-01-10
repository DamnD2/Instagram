const domen = 'http://localhost:1111';
const usersURL = `${domen}/users`;
const authURL = `${domen}/auth`;

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
  return username ? await request(`${usersURL}/username=${username}`) : null;
}

export async function registration(newUser) {
  await request(`${authURL}/registration`, 'POST', newUser);
}

export async function login(email, password) {
  return await request(`${authURL}/login`, 'POST', { email, password });
}

export async function addNewUser(newUser) {
  await request(usersURL, 'POST', newUser);
}

export async function removeUser(id, token) {
  return await request(`${usersURL}/${id}`, 'DELETE', null, token);
}

export async function editUser(id, newUserData, token) {
  await request(`${usersURL}/${id}`, 'POST', newUserData, token);
}

async function request(url, method = 'GET', data = null, token = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    if (token) {
      headers['Authorization'] = token;
    }

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