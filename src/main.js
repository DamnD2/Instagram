import Router from './utils/Router.js';

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

const hashMap = {
  '' : () => main,
  '#signin/' : () => signin,
  '#signup/' : () => signup,
}

const hashMainMap = {
  '#main/main1' : () => mainTest1,
  '#main/main2' : () => mainTest2,
  '#main/main3' : () => mainTest3,
}

const rootElement = document.getElementById('app');

const appRouter = new Router(rootElement, hashMap);
appRouter.init();
const rootMainElement = document.getElementById('mainroot')
const mainRouter = new Router(rootMainElement, hashMainMap);
mainRouter.init();


