import { initComponent } from "../component/init.component";
import { RoutingModule } from "../routing/RoutingModule";

export class Module {
  constructor(config) {
    this.components = config.components;
    this.routes = config.routes;
    this.rootComponent = config.rootComponent;
  }

  start() {
    initComponents(this.rootComponent, this.components);
    initRouting(this.routes);
  }
}

function initComponents(rootComponent, components) {
  initComponent(rootComponent);
  components.forEach(initComponent);
}

function initRouting(routes) {
  if(routes) {
    let routing = new RoutingModule(routes);
    routing.init();
  }
}