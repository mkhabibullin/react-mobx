import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, withRouter } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import BirdStore from '../src/services/stores/BirdStore';
import { Provider } from 'mobx-react';
import FilesStore from './services/stores/FilesStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const filesStore = new FilesStore();
const birdsStore = new BirdStore();

const stores = {
  routing: routingStore,
  birdsStore: birdsStore,
  filesStore: filesStore
};

const history = syncHistoryWithStore(browserHistory, routingStore);
    
const filesHubConnection = new HubConnectionBuilder()
    .withUrl('http://localhost:5000/files')
    .configureLogging(LogLevel.Information)
    .build()
    .start()
    .then(() => console.log('Connection with file hub started!'))
    .catch(err => console.log('Error while establishing connection with file hub'));

const hubs = {
    filesHub: filesHubConnection
};

const AppCmp = withRouter(App);

ReactDOM.render(
    <Provider {...stores} {...hubs}>
        <Router history={history}>
            <AppCmp />
        </Router>
    </Provider>
    , document.getElementById('root'));
