import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './account.css';

export default class Account extends Component {

    static propTypes = {
        account: PropTypes.shape({
            address: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired
        }),
    };

    render() {
        const {address, balance} = this.props.account;

        return (
            <div className='account_address'>
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
            </div>
        );
    };
}
