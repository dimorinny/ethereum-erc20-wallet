import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Route, BrowserRouter} from 'react-router-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import configureStore from './store/configure-store';
import Application from './containers/application';
import '../static/font/roboto/Roboto-Regular.ttf';
import '../static/font/roboto/Roboto-Thin.ttf';
import './index.css';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={ store }>
        <BrowserRouter basename={__BASE__}>
            <Route path='/' component={ Application }/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
