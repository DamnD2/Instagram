export default class Form {
  constructor(form, validationConfig) {
    this.form = form;
    this.config = validationConfig;
    this.fields = {};
    this._init();
  }

  _init () {
    const { form, config, fields } = this;

    config.forEach(({name}) => {
      const field = form.querySelector(`.${name}`);
      const errorField = form.querySelector(`.${name}-error`);

      fields[name] = field;
      fields[`${name}-error`] = errorField;
    });
  }
  validate () {
    let successfull = true;
    const { config, fields } = this;

    config.forEach(({ name, validators }) => {
      const field = fields[name];
      const errorField = fields[`${name}-error`];
      const fieldValue = field.value;
      const errors = validators.reduce((accum, currentValidator) => {
        const { errorMessage, validator } = currentValidator;
        accum += validator(fieldValue) ? '' : errorMessage;

        return accum;
      }, '');

      errorField.innerText = errors;

      if (errors) {
        field.classList.add('error');
        successfull = false;
      } else {
        field.classList.remove('error');
      }
    });

    this.isValid = successfull;
  }

  getFieldsData () {
    const { config, form } = this;

    return config.reduce((accum, { name }) => {
      const field = form.querySelector(`.${name}`);
      accum[name] = field.value;
      return accum;
    }, {});
  }

  clear () {
    Object.values(this.fields).forEach((element) => element.value = '');
  }
};
