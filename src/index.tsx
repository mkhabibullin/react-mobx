import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from "mobx";
import './index.css';
import './1457188778.woff';
import App from './App';
import buildHub from './services/signalR';
import { Router, withRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import BirdStore from '../src/services/stores/BirdStore';
import { Provider } from 'mobx-react';
import FilesStore from './services/stores/FilesStore';
import ReactGA from 'react-ga';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const filesStore = new FilesStore();
const birdsStore = new BirdStore();

ReactGA.initialize('UA-140001613-1');
ReactGA.pageview('/');

import { init as initApm } from '@elastic/apm-rum'
var apm = initApm({

  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: 'react app - test',

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: 'http://localhost:8200',

  // Set service version (required for sourcemap feature)
  serviceVersion: '1'
});
apm.captureError(new Error('Test error in index'));

const stores = {
  routing: routingStore,
  birdsStore: birdsStore,
  filesStore: filesStore
};

const logger = {
  logger: apm,
}

const history = syncHistoryWithStore(browserHistory, routingStore);

const hubs = {
    filesHub: buildHub('files'),
    chatHub: buildHub('chat')
};

configure({ enforceActions: "observed" });

const AppCmp = withRouter(App);

ReactDOM.render(
    <Provider {...stores} {...hubs} {...logger}>
        <Router history={history}>
            <AppCmp />
        </Router>
    </Provider>
    , document.getElementById('root'));
