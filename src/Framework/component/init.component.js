export function initComponent(component) {
  if (component.beforeInit) component.beforeInit();
  component.init();
  if (component.afterInit) component.afterInit();
}