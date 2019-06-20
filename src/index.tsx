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

const stores = {
  routing: routingStore,
  birdsStore: birdsStore,
  filesStore: filesStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);

const hubs = {
    filesHub: buildHub('files'),
    chatHub: buildHub('chat')
};

configure({ enforceActions: "observed" });

const AppCmp = withRouter(App);

ReactDOM.render(
    <Provider {...stores} {...hubs}>
        <Router history={history}>
            <AppCmp />
        </Router>
    </Provider>
    , document.getElementById('root'));
