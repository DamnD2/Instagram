class LocalStorageAdapter {
  constructor(keyName, dataType) {
    this.keyName = keyName;
    this.dataType = dataType;
    this.dataTypeMap = { array: [], object: {}, string: '', boolean: false };
    this.newValueFromTypeMap = {
      array: (data, prevValue) => [...prevValue, data],
      object: (data, prevValue) => ({...prevValue, ...data}),
      string: (data) => String(data),
      boolean: (data) => Boolean(data),
    };
  }

  getValue() {
    const value = localStorage.getItem(this.keyName);

    return (value !== null) ? JSON.parse(value) : this.dataTypeMap[this.dataType];
  };

  setValue(data) {
    const prevValue = this.getValue();

    const newValue = this.newValueFromTypeMap[this.dataType](data, prevValue);

    localStorage.setItem(this.keyName, JSON.stringify(newValue));
  };

  removeArrayElement(index) {
    if (this.dataType === 'array') {
      const newArray = this.getValue();
      newArray.splice(index, 1);
      this.removeKey();
      localStorage.setItem(this.keyName, JSON.stringify(newArray));
    }
  }

  removeKey() {
    localStorage.removeItem(this.keyName);
  };
};

const users = new LocalStorageAdapter('users', 'array');

export const getUsersLS = () => users.getValue();
export const addUserLS = (data) => users.setValue(data);
export const removeUserLS = (index) => users.removeArrayElement(index);
export const removeAllUsersLS = () => users.removeKey();
export const findUserInLS = (email) => getUsersLS().find((user) => user.email === email);
export const editUserLS = (userID, newUserData) => {
  const users = getUsersLS();
  const user = users.find((user) => user.username === userID);
  for (let key in newUserData) user[key] = newUserData[key];
  removeAllUsersLS();
  users.forEach(user => addUserLS(user));
};

const loggedInUser = new LocalStorageAdapter('loggedInUser', 'object');

export const getLoggedInUserLS = () => loggedInUser.getValue();
export const setLoggedInUserLS = (data) => loggedInUser.setValue(data);
export const removeLoggedInUserLS = () => loggedInUser.removeKey();
export const isLoggedInUser = () => getLoggedInUserLS().username;





