import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Grid, Segment, Button, Icon} from 'semantic-ui-react';
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
            <Grid columns='equal'>
                <Grid.Column/>
                <Grid.Column width={14}>
                    <Segment className='account_container'>
                        <Grid columns={2} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <div>Address: {address}</div>
                                    <div>Balance: {balance.toNumber()}</div>
                                    <div>
                                        <Button
                                            basic
                                            disabled={balance.toNumber() === 0}
                                            className='account_send_button'
                                            color='black'>
                                            <Icon name='send'/> Send Tokens
                                        </Button>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div>Contract Address: {contractAddress}</div>
                                    <div>Symbol: {symbol}</div>
                                    <div>TotalSupply: {totalSupply.toFormat(0)}</div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column/>
            </Grid>
        );
    };
}
