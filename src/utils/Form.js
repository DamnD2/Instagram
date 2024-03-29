import Control from "./Control";
import { clearInputs } from "./utils";
export default class Form {
  constructor(form, validationConfig) {
    this.form = form;
    this.config = validationConfig;
    this.controls = [];
    this.isValid = false;
    this._init();
  }

  _init () {
    this.config.forEach((control) => {
      const field = this.form.querySelector(`[name=${control.name}]`);
      const errorField = this.form.querySelector(`div[name="${control.name}-error"`);
      const validators = control.validators;
      this.controls.push(new Control(field, errorField, validators));
    });
  }

  validate () {
    const isvalid = this.controls.reduce((accum, control) => {
      control.validate();
      if (!control.isValid) return false;
      return accum;
    }, true);
    this.isValid = isvalid;
  }

  getFieldsData () {
    const result = this.controls.reduce((accum, control) => {
      accum = { ...accum, ...control.getValueObj() }
      return accum;
    }, {});
    delete result['confirmpassword'];
    return result;
  }

  clear () {
    const inputs = this.controls.map((control) => control.field);
    clearInputs(...inputs);
  }
};
