import React, { Component } from 'react';
import { Provider } from 'mobx-react'
import './App.css';
import singeltone from './stores/BirdStore';
import Birds from './components/Birds'
import Chat from './components/Chat'

class App extends Component {
  render() {
    const bs = singeltone;
    return (
      <Provider BirdStore={bs}>
        <div><Birds/>
        <Chat/></div>
      </Provider>
    );
  }
}

export default App;
