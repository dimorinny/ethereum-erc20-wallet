import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/token';
import Account from '../../components/account/account';
import ErrorComponent from '../../components/error/error-component';
import './wallet.css';

@connect(mapStateToProps, mapDispatchToProps)
export default class WalletPage extends Component {

    static propTypes = {
        actions: PropTypes.object.isRequired,
        accountState: PropTypes.object.isRequired,
        params: PropTypes.shape({
            address: PropTypes.string.isRequired
        }).isRequired
    };

    componentDidMount() {
        const {actions, params} = this.props;
        const {address} = params;

        actions.loadAccount(address);
    };

    render() {
        const {error, isPending} = this.props.accountState;

        let walletView;

        if (isPending) {
            walletView = WalletPage.renderProgress();
        } else if (error) {
            walletView = this.renderError();
        } else {
            walletView = this.renderWallet();
        }

        return (
            <div>
                {walletView}
            </div>
        );
    };

    static renderProgress() {
        return (
            <h3>Progress...</h3>
        );
    };

    renderError() {
        const {error} = this.props.accountState;

        return (
            <ErrorComponent
                payload={error}
            />
        );
    };

    renderWallet() {
        const {account} = this.props.accountState;

        return (
            <Account
                account={account}
            />
        );
    };
}

function mapStateToProps(state) {
    return {
        accountState: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}
