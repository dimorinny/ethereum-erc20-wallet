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
                                    {
                                        Account.renderAddressItem(
                                            'address book outline',
                                            'Address',
                                            address
                                        )
                                    }
                                    {
                                        Account.renderTextItem(
                                            'money',
                                            'Balance',
                                            balance.toNumber()
                                        )
                                    }
                                    <Button
                                        basic
                                        disabled={balance.toNumber() === 0}
                                        className='account_send_button'
                                        color='black'>
                                        <Icon name='send'/> Send Tokens
                                    </Button>
                                </Grid.Column>
                                <Grid.Column>
                                    {
                                        Account.renderAddressItem(
                                            'sticky note',
                                            'Contract Address',
                                            contractAddress
                                        )
                                    }
                                    {
                                        Account.renderTextItem(
                                            'tags',
                                            'Symbol',
                                            symbol
                                        )
                                    }
                                    {
                                        Account.renderTextItem(
                                            'archive',
                                            'TotalSupply',
                                            totalSupply.toFormat(0)
                                        )
                                    }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>
                </Grid.Column>
                <Grid.Column/>
            </Grid>
        );
    };

    static renderAddressItem(icon, title, address) {
        return Account.renderItem(
            icon,
            title,
            <a target='_blank' href={'https://etherscan.io/address/' + address}>{address}</a>
        );
    };

    static renderTextItem(icon, title, text) {
        return Account.renderItem(
            icon,
            title,
            text
        );
    };

    static renderItem(icon, title, valueElement) {
        return (
            <div>
                <Icon name={icon}/>
                <b>{title}:</b> {valueElement}
            </div>
        );
    };
}
