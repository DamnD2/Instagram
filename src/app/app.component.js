import { DefaultComponent } from "../Framework/DefaultComponent.js";
import './app.scss';

class AppComponent extends DefaultComponent {
  constructor(config){
    super(config);
  }
}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
    <div class="app">
      <main class="main">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
`,
})