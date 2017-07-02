import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './account.css';

export default class Account extends Component {

    static propTypes = {
        account: PropTypes.shape({
            address: PropTypes.string.isRequired,
            contractAddress: PropTypes.string.isRequired,
            balance: PropTypes.object.isRequired,
            symbol: PropTypes.string,
            totalSupply: PropTypes.object,
        })
    };

    render() {
        const {
            address,
            contractAddress,
            balance,
            totalSupply,
            symbol
        } = this.props.account;

        return (
            <div className='account_address'>
                <div>Address: {address}</div>
                <div>Contract Address: {contractAddress}</div>
                <div>Balance: {balance.toNumber()}</div>
                <div>Symbol: {symbol}</div>
                <div>TotalSupply: {totalSupply.toFormat(0)}</div>
            </div>
        );
    };
}
