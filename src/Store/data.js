import { observable } from '../storeManager/storeManager';

export default {
  data: observable({
    loggedInUsername: '',
  }),

  setLoggedInUsername(username) {
    this.data.loggedInUsername = username;
  }
}