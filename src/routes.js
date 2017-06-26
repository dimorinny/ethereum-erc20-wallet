import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Application from './containers/application';
import WalletPage from './containers/wallet/wallet';
import InputPage from './containers/input/Input';

export default (
    <Route path='/' component={ Application }>
        <IndexRoute component={ InputPage }/>
        <Route path='/:address' component={ WalletPage }/>
    </Route>
);
