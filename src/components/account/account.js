import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Grid, Segment, Button, Icon, Popup} from 'semantic-ui-react';
import Send from '../../containers/send/send';
import {addressLink} from '../../util/etherscan';
import './account.css';

export default class Account extends Component {

    static propTypes = {
        account: PropTypes.shape({
            address: PropTypes.string.isRequired,
            contractAddress: PropTypes.string.isRequired,
            balance: PropTypes.object.isRequired,
            decimals: PropTypes.number.isRequired,
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
                            <Popup
                                trigger={
                                    <Button
                                        basic
                                        className='account_send_button'
                                        color='black'>
                                        Send Tokens <Icon name='caret down'/>
                                    </Button>
                                }
                                content={
                                    <div>
                                        <Send
                                            account={this.props.account}
                                        />
                                    </div>
                                }
                                position='bottom left'
                                on='click'
                            />
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
        );
    };

    static renderAddressItem(icon, title, address) {
        return Account.renderItem(
            icon,
            title,
            <a target='_blank' href={addressLink(address)}>{address}</a>
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
