import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Route, Switch} from 'react-router-dom';
import WalletPage from './wallet/wallet';
import InputPage from './input/input';

export default class Application extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={ InputPage }/>
                    <Route path='/:address' component={ WalletPage }/>
                </Switch>
            </div>
        );
    };
}
