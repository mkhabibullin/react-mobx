import React, { Component } from 'react';
import { Router, Route, withRouter } from 'react-router';
import './App.css';
import Birds from './components/Birds'
import Chat from './components/Chat'
import FileUploader from './components/FileUploader'
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('routing')
@observer
class App extends Component<any, any> {
  render() {
    const { push, goBack } = this.props.routing;
    return (
        <div>
          <Link to='/birds'>Birds</Link>
          <button onClick={() => push('/birds')}>Change url</button>
          <button onClick={() => goBack()}>Go Back</button>
          <Route exact path="/" component={Chat} />
          <Route exact path="/birds" component={Birds} />
          <Route path="/files" component={FileUploader} />
        </div>
    );
  }
}

export default App;
