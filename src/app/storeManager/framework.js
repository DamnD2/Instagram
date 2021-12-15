import { onUpdate } from "./storeManager";
import { initComponent } from "../Framework/component/init.component";

const observedComponents = [];

onUpdate(() => {
  observedComponents.forEach((component) => initComponent(component));
})

function observer(component) {
  class supervisedComponent extends component{
    constructor(props){
      super(props);
      observedComponents.push(this);
      console.log(observedComponents)
    }
  }

  return supervisedComponent;
}

export { observer };