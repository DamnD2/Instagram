/* import appTemplate from './App.html';

const main = 
`<h1>MAIN</h1>
<a href="#signin/">ПЕРЕЙТИ К SIGNIN</a>
<br />
<a href="#main/main1">ПЕРЕЙТИ К MAIN 1</a>
<a href="#main/main2">ПЕРЕЙТИ К MAIN 2</a>
<a href="#main/main3">ПЕРЕЙТИ К MAIN 3</a>
<div id='mainroot'></div>
`;

const mainTest1 = `<div>MAIN TEST 1</div>`;
const mainTest2 = `<div>MAIN TEST 2</div>`;
const mainTest3 = `<div>MAIN TEST 3</div>`;

const signin = '<h1>SIGNIN</h1> <a href="#signup/">ПЕРЕЙТИ К SIGNUP</a>';
const signup = '<h1>SIGNUP</h1> <a href="#">ПЕРЕЙТИ К MAIN</a>';

import Router from '../utils/Router.js';

export default class App {
  constructor() {
    this.app = document.getElementById('app');
  }
  hashResolver (hash) {
    const hashMap = {
      '' : () => main,
      '#signin/' : () => signin,
      '#signup/' : () => signup,
    }
    this.app.innerHTML = hashMap[hash]();
  }

  render() {
    window.addEventListener('load', () =>{
      const hash = location.hash;
      this.hashResolver(hash);
    });
    
    window.addEventListener('hashchange', () => {
      const hash = location.hash;
      this.hashResolver(hash);
    });
  }
} */