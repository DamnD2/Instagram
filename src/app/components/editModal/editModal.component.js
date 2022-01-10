import { Component } from "framework";
import template from './editModal.template.html';

class EditModalComponent extends Component {
  constructor(config) {
    super(config);
  }
}

export const editModalComponent = new EditModalComponent({
  selector: 'app-modal',
  template: template
});