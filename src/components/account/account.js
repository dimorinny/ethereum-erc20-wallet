import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import ErrorComponent from '../../components/error/error-component';
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
        const {error, isPending} = this.props;

        let accountView;

        if (isPending) {
            accountView = Account.renderProgress();
        } else if (error) {
            accountView = this.renderError();
        } else {
            accountView = this.renderAccount();
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

    renderError() {
        const {error} = this.props;

        return (
            <ErrorComponent
                payload={error}
            />
        );
    }

    renderAccount() {
        const {address, balance} = this.props.account;

        return (
            <div className='account_address'>
                <div>Address: {address}</div>
                <div>Balance: {balance}</div>
            </div>
        );
    };
}
