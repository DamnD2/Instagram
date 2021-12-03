import { Module } from "framework";
import { appComponent } from "./app.component.js";
import { appRoutes } from "./app.routes.js";
import { footerComponent } from "./common/footer.component.js";

class AppModule extends Module {
  constructor(config){
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    /* appComponent, */
    footerComponent,
  ],
  rootComponent: appComponent,
  routes: appRoutes,
})