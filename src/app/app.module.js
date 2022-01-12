import { Module } from "framework";
import { appComponent } from "./app.component.js";
import { appRoutes } from "./app.routes.js";
import { addPostModalComponent } from "./components/add.post.modal.component.js";
import { footerComponent } from "./components/footer.component";
import headerComponent from "./components/header.component";
import { removePostModalComponent } from "./components/remove.post.modal.component.js";
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
    addPostModalComponent,
    removePostModalComponent,
  ],
  rootComponent: appComponent,
  routes: appRoutes,
})