import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/token';
import Account from '../../components/account';
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
        const {accountState} = this.props;
        const {error, account, isPending} = accountState;

        return (
            <div>
                <Account
                    error={error}
                    account={account}
                    isPending={isPending}
                />
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
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}
