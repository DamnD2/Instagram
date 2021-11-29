import { DefaultComponent } from "../../Framework";

class HomePageComponent extends DefaultComponent {
  constructor(config) {
    super(config);
  }
}

export const homePageComponent = new HomePageComponent({
  selector: 'app-home-page',
  template: `
    <h1 style="margin-bottom: 20px">Home Page</h1>
    <a href="#signin" style="font-size: 20px; margin-right: 20px">Вход</a>
    <a href="#signup" style="font-size: 20px">Регистрация</a>
  `
});