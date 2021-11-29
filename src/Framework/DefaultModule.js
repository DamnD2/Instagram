import { router } from "../utils/router";

export class DefaultModule {
  constructor(config) {
    this.components = config.components;
    this.routes = config.routes;
    this.rootComponent = config.rootComponent;
  }

  start() {
    this.initComponents();
    if (this.routes) this.initRoutes();
  }

  initComponents() {
    this.rootComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  }

  initRoutes() {
    window.addEventListener('hashchange', () => {
      this.renderRoute.bind(this)();
    });
    this.renderRoute();
  }

  renderRoute() {
    const url = router.getUrl();
    let route = this.routes.find((route) => route.path === url);
    
    //not-found page
    if (typeof route === 'undefined'){
      route = this.routes.find((route) => route.path === '**');
    }

    const tag = route.component.selector;

    document.querySelector('router-outlet').innerHTML = `<${tag}></${tag}>`;
    this.renderComponent(route.component)
  }

  renderComponent(component) {
    component.render();
  }
}