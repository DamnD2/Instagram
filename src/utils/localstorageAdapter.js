export default class LocalStorageAdapter {
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

  removeKey() {
    localStorage.removeItem(this.keyName);
  };
};