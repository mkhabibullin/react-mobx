import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import logo from './logo.svg';
import './App.css';
import { observable } from 'mobx';

@observer
class App extends Component {
  @observable counter = 0;

  onIncrement = () => {
    this.counter++;
  }

  onDecrement = () => {
    this.counter--;
  }

  render() {
    return (
      <div>
        {this.counter}

        <button onClick={this.onIncrement} type="button">Increment</button>
        <button onClick={this.onDecrement} type="button">Decrement</button>
      </div>
    );
  }
}

export default App;
