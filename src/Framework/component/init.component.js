import { initModals } from "../../utils/initModals";

export function initComponent(component) {
  if (component.beforeInit) component.beforeInit();
  component.init();
  initModals();
  if (component.afterInit) component.afterInit();
}