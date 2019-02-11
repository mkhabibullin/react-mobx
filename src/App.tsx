import React, { Component } from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import GlobalNavigation from './router/GlobalNavigation';

@inject('routing')
@observer
class App extends Component<any, any> {
  render() {
    return (
        <div className="App">
          <Link to='/' className="App-link">Home</Link>
          <Link to='/birds' className="App-link">Birds</Link>
          <Link to='/files' className="App-link">Files</Link>
          <GlobalNavigation></GlobalNavigation>
        </div>
    );
  }
}

export default App;
