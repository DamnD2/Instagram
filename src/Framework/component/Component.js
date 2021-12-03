export class Component {
  constructor(config) {
    this.selector = config.selector;
    this.template = config.template;
    this.el = null;
  }

  init() {
    this.el = document.querySelector(this.selector);
    this.el.innerHTML = this.template;

    initEvents.call(this);
  }
}

function initEvents() {
  if (typeof this.events === 'undefined') return;

  const events = this.events()

  Object.keys(events).forEach((key) => {
    const listener = key.split(" ");
    
    this.el
      .querySelector(listener[1])
      .addEventListener(listener[0], this[events[key]].bind(this))
  })
}