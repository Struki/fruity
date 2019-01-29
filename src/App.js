import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from "immutable";
import { add, buy, inTheBlack, addItem, pouchEffectsLedger } from "merchant.js";
// ES6 style
import MetaCoin from './build/contracts/MetaCoin.json';
// Currencies
const bites = "bites";



// Items
const pouch = {
  machine: {
    type: "Machine",
    cost: () => {
      return Map({ [bites]: -100 });
    },
    effect: () => {
      return Map({ [bites]: 1 });
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: Map(),
      ledger: Map()
    };

    this.bite = this.bite.bind(this);
    this.buyMachine = this.buyMachine.bind(this);
    this.update = this.update.bind(this);
    setInterval(this.update, 200);
  }

  update() {
    this.setState({
      wallet: add(this.state.wallet, this.state.ledger)
    });
  }

  bite() {
    const wallet = add(this.state.wallet, Map({ [bites]: 1 }));
    this.setState({
      wallet
    });
  }

  buyMachine() {
    const walletWithCostsApplied = buy(pouch.machine, this.state.wallet);
    if (!inTheBlack(walletWithCostsApplied)) {
      return;
    }

    const wallet = addItem(pouch.machine, walletWithCostsApplied);
    const ledger = pouchEffectsLedger(Object.values(pouch), wallet);

    this.setState({
      wallet,
      ledger
    });
  }

  render() {
    return (
      <div>
<center>
         <h1> Bites {this.state.wallet.get(bites) || 0} </h1>
        <button onClick={this.bite}> Take a bite! </button>

        <h1> Chewing Machine: {this.state.wallet.get(pouch.machine.type) || 0} </h1>
        <button onClick={this.buyMachine}>Buy a Chewing machine</button>
 	<p>{(this.state.ledger.get(bites) || 0) / 5} Bites per second</p>

	<h1> Good Food Box </h1>
        <button onClick={this.bite}> Take a bite! </button>
	
}


        //Chew up a pet (Delete token for bites)

       
       
   </center>
   </div>

    );
  }
}

export default App;
