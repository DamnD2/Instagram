export default class Control {
  constructor(field, errorField, validators) {
    this.field = field;
    this.errorField = errorField;
    this.validators = validators;
    this.isValid;
  }

  validate() {
    const errors = this.validators.reduce((accum, {validator, errorMessage}) => {
      accum += validator(this.field.value) ? '' : errorMessage;
      return accum;
    }, '');
    this.errorField.innerText = errors;

    if (errors) {
      this.field.classList.add('error');
      this.isValid = false;
      this.errorField.classList.add('show');
    } else {
      this.field.classList.remove('error');
      this.isValid = true;
      this.errorField.classList.remove('show');
    }
  }

  getValueObj() {
    return { [this.field.name]: this.field.value };
  }
}