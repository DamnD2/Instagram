_init () {
  this.config.forEach((control) => {
    const field = this.form.querySelector(`input[name=${control.name}]`);
    const errorField = this.form.querySelector(`div[name="${control.name}-error"`);
    const validators = control.validators;
    this.controls.push(new Control(field, errorField, validators));
  });
}

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
    } else {
      this.field.classList.remove('error');
      this.isValid = true;
    }
  }

  getValueObj() {
    return { [this.name]: this.field.value };
  }
}