import { Component } from "framework";

class NotFoundComponent extends Component {
  constructor(config) {
    super(config);
  }
}

export const notFoundComponent = new NotFoundComponent({
  selector: 'app-not-found',
  template: `
    <div class="not-found">
      <h2 class="not-found__title">Страница не найдена</h2>
      <a href="#" class="not-found__link">Перейти на главную</a>
    </div>
  `
});