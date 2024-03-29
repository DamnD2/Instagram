import { initComponent } from '../component/init.component';
import { router } from './router';
import { addClassToRouterRoot, removeClassToRouterRoot } from '../../utils/utils';
import { getCookieValue } from '../../utils/cookies';

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
  if (!route) route = this.routes.find((route) => route.path === '**');

  if (route.isLoggedIn && !getCookieValue('jwt')) {
    location.hash = '#signin';
    return;
  };

  const tag = route.component.selector;

  const rootElement = document.querySelector('router-root');

  if (rootElement.classList.contains('first-load')) {
    rootElement.innerHTML = `<${tag}></${tag}>`;
    setTimeout(() => {
      initComponent(route.component)
      addClassToRouterRoot('show');
    });
    rootElement.classList.remove('first-load');
  } else {
    removeClassToRouterRoot('show');
    setTimeout(() => {
      rootElement.innerHTML = `<${tag}></${tag}>`;
      initComponent(route.component);
      addClassToRouterRoot('show');
    }, 300);
  }
  
}