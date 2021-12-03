import { initComponent } from '../component/init.component';
import { router } from './router'

export class RoutingModule {
  constructor(routes) {
    this.routes = routes;
  }

  init() {
    window.addEventListener('hashchange', initRoute.bind(this));
    initRoute.call(this);
  }
}

function initRoute() {
  const url = router.getUrl();
  let route = this.routes.find((route) => route.path === url);
  
  //not-found page
  if (!route){
    route = this.routes.find((route) => route.path === '**');
  }

  const tag = route.component.selector;

  document.querySelector('router-root').innerHTML = `<${tag}></${tag}>`;
  initComponent(route.component);
}