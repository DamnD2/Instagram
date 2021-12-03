import { Component } from "framework";
import './app.scss';

class AppComponent extends Component {
  constructor(config){
    super(config);
  }
}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
    <div class="app">
      <main class="main">
        <router-root></router-root>
      </main>
      <app-footer></app-footer>
    </div>
`,
})