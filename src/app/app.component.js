import { Component } from "framework";
import { addClassToRouterRoot } from "../utils/utils";
import './app.scss';

class AppComponent extends Component {
  constructor(config){
    super(config);
  }

  afterInit() {
    //
    addClassToRouterRoot('first-load');
  }
}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
    <div class="app">
      <app-header></app-header>
      <main class="main">
        <router-root animation="true"></router-root>
      </main>
      <app-footer></app-footer>
    </div>
`,
})