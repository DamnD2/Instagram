import { appModule } from "./app/app.module";
import LocalstorageAdapter from './utils/LocalstorageAdapter';
import { setHash } from "./utils/utils";

const users = new LocalstorageAdapter('users', 'array');
const loggedInUserData = new LocalstorageAdapter('loggedInUserData', 'object');

void function init () {
  const loggedInUserName = loggedInUserData.getValue().username;
  if(loggedInUserName) {
    setHash('');
  } else {
    setHash('signin');
  }
}();

appModule.start();

