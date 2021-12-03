import { Component } from "framework";

class HomePageComponent extends Component {
  constructor(config) {
    super(config);
  }
}

export const homePageComponent = new HomePageComponent({
  selector: 'app-home-page',
  template: `
    <div class="home">
      <div class="home__header">
        
      </div>
      <div class="home__content>
        <h1 style="margin-bottom: 20px">Home Page</h1>
        <a href="#signin" style="font-size: 20px; margin-right: 20px">Вход</a>
        <a href="#signup" style="font-size: 20px">Регистрация</a>
      </div>
    </div>
  `
});