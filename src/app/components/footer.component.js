import { Component } from "framework";

class FooterComponent extends Component {
  constructor(config) {
    super(config);
  }
}

export const footerComponent = new FooterComponent({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <h4 class="footer__title">Developed by Daineko Vitaly © 2021</h1>
    </footer>
  `
});