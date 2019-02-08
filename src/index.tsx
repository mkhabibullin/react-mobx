import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, withRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import birdsStoreSingleton from '../src/services/stores/BirdStore';
import { Provider } from 'mobx-react';
import filesStoreSingleton from './services/stores/FilesStore';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  routing: routingStore,
  birdsStore: birdsStoreSingleton,
  filesStore: filesStoreSingleton
};

const history = syncHistoryWithStore(browserHistory, routingStore);

const AppCmp = withRouter(App);

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <AppCmp />
        </Router>
    </Provider>
    , document.getElementById('root'));
