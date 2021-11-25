class LocalStorageAdapter {
  constructor(keyName, dataType) {
    this.keyName = keyName;
    this.dataType = dataType;
  }

  getValue() {
    const value = localStorage.getItem(this.keyName);
    const dataTypeMap = {
      array: [],
      object: {},
      string: '',
      boolean: false,
    };

    return (value !== null) ? JSON.parse(value) : dataTypeMap[this.dataType];
  };

  setValue(data) {
    const prevValue = this.getValue();
    const newValueFromTypeMap = {
      array: () => [...prevValue, data],
      object: () => ({...prevValue, ...data}),
      string: () => String(data),
      boolean: () => Boolean(data),
    };

    const newValue = newValueFromTypeMap[this.dataType]();

    localStorage.setItem(this.keyName, JSON.stringify(newValue));
  };

  removeKey() {
    localStorage.removeItem(this.keyName);
  };
};
