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
          <Link to='/birds' className={styles.link}>Birds</Link>
          <Link to='/files' className={styles.link}>Files</Link>
          <Link to='/GA' className={styles.link}>GA</Link>
          <GlobalNavigation></GlobalNavigation>
        </div>
    );
  }
}

export default App;
