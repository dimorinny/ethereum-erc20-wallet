import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './account.css';

export default class Account extends Component {

    static propTypes = {
        account: PropTypes.shape({
            address: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired
        }),
        isPending: PropTypes.bool
    };

    render() {
        const {account, isPending} = this.props;

        let accountView;

        if (isPending) {
            accountView = Account.renderProgress();
        } else {
            accountView = Account.renderAccount(account);
        }

        return (
            <div>
                {accountView}
            </div>
        );
    };

    static renderProgress() {
        return (
            <h3>Progress...</h3>
        );
    };

    static renderAccount({address, balance}) {
        return (
            <div className='account_address'>
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
            </div>
        );
    };
}
