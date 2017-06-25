import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {Link, IndexLink} from 'react-router';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/token';
import Account from '../components/account';
import './application.css';

@connect(mapStateToProps, mapDispatchToProps)
export default class Application extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
        accountState: PropTypes.object.isRequired
    };

    componentDidMount() {
        const {actions} = this.props;
        actions.loadAccount();
    };

    render() {
        const {children, accountState} = this.props;
        const {error, account, isPending} = accountState;

        console.log(this.props);

        let content;

        if (error == null) {
            content = this.renderContent();
        } else {
            content = Application.renderError();
        }

        return (
            <div>
                {content}
            </div>
        );
    };

    renderContent() {
        const {children, accountState} = this.props;
        const {error, account, isPending} = accountState;

        return (
            <div>
                <Account
                    error={error}
                    account={account}
                    isPending={isPending}
                />

                { children }
            </div>
        );
    };

    static renderError() {
        const metamask = <a href='https://github.com/MetaMask'>Metamask</a>;
        const mist = <a href='https://github.com/ethereum/mist'>Mist</a>;

        return (
            <div>
                <h2>Error load your account:</h2>
                <h4>
                    Use static {metamask} or {mist} projects for authorization in blockchain.
                </h4>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        accountState: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}
