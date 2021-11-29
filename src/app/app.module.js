import { DefaultModule } from "../Framework/index.js";
import { appComponent } from "./app.component.js";
import { appRoutes } from "./app.routes.js";
import { footerComponent } from "./common/footer.component.js";

class AppModule extends DefaultModule {
  constructor(config){
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    appComponent,
    footerComponent,
  ],
  rootComponent: appComponent,
  routes: appRoutes
})