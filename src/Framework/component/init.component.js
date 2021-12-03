import { initModals } from "../../utils/initBootstrapModals";

export function initComponent(component) {
  if (component.beforeInit) component.beforeInit();
  component.init();
  initModals();
  if (component.afterInit) component.afterInit();
}