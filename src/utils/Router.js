export const router = {
  getUrl () {
    return location.hash.slice(1);
  },
  /* init() {
    window.addEventListener('load', () =>{
      this.hashResolver(location.hash);
    });
    
    window.addEventListener('hashchange', () => {
      this.hashResolver(location.hash);
    });
  } */
}
