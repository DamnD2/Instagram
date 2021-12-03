import { Component } from "framework";

class HeaderComponent extends Component {
  constructor(config) {
    super(config);
  }
}

export const headerComponent = new HeaderComponent({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <h4 class="footer__title">Developed by Daineko Vitaly © 2021</h1>
    </footer>
  `
});