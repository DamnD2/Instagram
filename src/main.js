import { appModule } from "./app/app.module";

appModule.start();



import LocalstorageAdapter from './utils/LocalstorageAdapter';
import { setHash } from "./utils/utils";

const users = new LocalstorageAdapter('users', 'array');
export const loggedInUserData = new LocalstorageAdapter('loggedInUserData', 'object');

void function init () {
  const loggedInUserName = loggedInUserData.getValue().username;
  if(!loggedInUserName) {
    setHash('signin');
  }
}();

/* window.addEventListener('hashchange', () => {
  console.log(true);
  const isLoggedIn = loggedInUserData.getValue().username;
  if (!isLoggedIn) location.hash = '#signin';
}) */