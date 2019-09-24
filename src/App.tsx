import React, { Component } from 'react';
import styles from './App.module.css';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import GlobalNavigation from './router/GlobalNavigation';

@inject('routing')
@observer
class App extends Component<any, any> {
  render() {
    return (
        <div className={styles.app}>
          <Link to='/' className={styles.link}>Home</Link>
          <GlobalNavigation></GlobalNavigation>
        </div>
    );
  }
}

export default App;
