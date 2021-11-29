import { DefaultComponent } from "../../Framework";

class FooterComponent extends DefaultComponent {
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