import { Module } from "framework";
import { appComponent } from "./app.component.js";
import { appRoutes } from "./app.routes.js";
import { footerComponent } from "./components/footer.component";
import headerComponent from "./components/header.component";
import { homePageComponent } from "./pages/home-page.component.js";

export const homePageComponentLink = homePageComponent;
export const headerComponentLink = headerComponent;

class AppModule extends Module {
  constructor(config){
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    /* appComponent, */
    headerComponent,
    footerComponent,
  ],
  rootComponent: appComponent,
  routes: appRoutes,
})