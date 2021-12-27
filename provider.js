import store from './src/Store/data';

const usersURL = 'http://localhost:1111/users';

export async function getUsers() {
  return await request(usersURL);
}

export async function syncDataBaseandStore() {
  store.data.users = await getUsers();
}

export async function addNewUser(newUser) {
  await request(usersURL, 'POST', newUser);
  store.data.users.push(newUser);
}

export async function removeUser(id) {
  await request(`${usersURL}/${id}`, 'DELETE');
  store.data.users = store.data.users.filter((user) => user.id !== id);
}

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
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