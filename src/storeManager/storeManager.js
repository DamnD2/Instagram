const listeners = [];

export function onUpdate(func) {
  listeners.push(func);
}

function runUpdaters() {
  setTimeout(() => listeners.forEach((func) => func(), 0));
}

export function observable(obj) {
  return new Proxy(obj,{
    set(target, name, value){
      target[name] = value;
      runUpdaters();
      return true;
    }
  });
}