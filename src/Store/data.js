import { observable } from '../storeManager/storeManager';

export default {
  data: observable({
    loggedInUsername: '',
    users: [],
    posts: {
      
    }
  }),

  setLoggedInUsername(username) {
    this.data.loggedInUsername = username;
  },

  setUsers(data) {
    this.data.users = data;
  },

  addUser(newUser) {
    this.data.users.push(newUser);
  },

  setPosts(userId, userPosts) {
    this.data.posts[userId] = userPosts;
    this.data.posts = {...this.data.posts}
  }
}