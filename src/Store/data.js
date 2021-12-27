import { observable } from '../storeManager/storeManager';

export default {
  data: observable({
    loggedInUsername: '',
    users: [],
  }),

  setLoggedInUsername(username) {
    this.data.loggedInUsername = username;
  },

  setUsers(data) {
    this.data.users = data;
  },
  addUser(newUser) {
    this.data.users.push(newUser);
  }
}