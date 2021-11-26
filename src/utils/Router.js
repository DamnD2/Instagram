export default class Router {
  constructor(rootElement, hashMap) {
    this.rootElement = rootElement;
    this.hashMap = hashMap;
  }
  hashResolver (hash) {
    console.log(this.hashMap);
    const hashMatchingComponent = this.hashMap[hash];

    console.log(this.rootElement , this.hashMap);

    if (hashMatchingComponent) {
      this.rootElement.innerHTML = hashMatchingComponent();
    }
  }

  init() {
    window.addEventListener('load', () =>{
      const hash = location.hash;
      this.hashResolver(hash);
    });
    
    window.addEventListener('hashchange', () => {
      const hash = location.hash;
      this.hashResolver(hash);
    });
  }
}