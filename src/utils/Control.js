export default class Control {
  constructor(config, form) {
    this.name = config.name;
    this.field = null;
    this.errorField = null;
    this.validators = config.validators;
    this.isValid;

    this.form = form;
    this._init();
  }

  _init() {
    this.field = this.form.querySelector(`input[name=${this.name}]`);
    this.errorField = this.form.querySelector(`div[name="${this.name}-error"`);
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