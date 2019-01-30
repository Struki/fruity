import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { thorify } from 'thorify'
import { extend } from 'thorify/dist/extend'
const Web3 = require("web3"); // Recommend using require() instead of import here

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

window.addEventListener('load', function() {
  var web3js;
  var thor;
  // Checking if Thor has been injected by the browser
  if (typeof thor !== 'undefined') {
    // Use thor provider
    web3js = new Web3(thor);
    // Extend web3 to connect to VeChain Blockchain
    extend(web3js)
  } else {
    // Fall back to default thorified construction
    web3js = thorify(new Web3(), "http://localhost:8669");
  }

ReactDOM.render(
    <App web3={web3js} />,
    document.getElementById('root')
  )                                                                                                                    
});
