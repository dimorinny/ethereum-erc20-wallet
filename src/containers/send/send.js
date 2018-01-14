import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change, formValueSelector, Field, SubmissionError} from 'redux-form';
import {bindActionCreators} from 'redux';
import {Form, Button, Icon, Header, Message} from 'semantic-ui-react';
import ethereum from 'ethereum-address';
import renderField from '../../components/field/field';
import {transactionLink} from '../../util/etherscan';
import * as actionCreators from '../../actions/token';
import './send.css';

const FORM_NAME = 'send';

const renderCommonField = renderField('send_input_container');
const renderShortField = renderField('send_input_container_short');

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
    form: FORM_NAME,
    destroyOnUnmount: false
})
export default class Send extends Component {

    static propTypes = {
        send: PropTypes.shape({
            isPending: PropTypes.bool.isRequired,
            transaction: PropTypes.string,
            error: PropTypes.string
        }),
        account: PropTypes.shape({
            address: PropTypes.string.isRequired,
            contractAddress: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
            decimals: PropTypes.number.isRequired,
            symbol: PropTypes.string,
            totalSupply: PropTypes.number,
        }),
        changeFieldValue: PropTypes.func.isRequired,
        address: PropTypes.string,
        value: PropTypes.number,
    };

    render() {
        const {
            account,
            changeFieldValue,
            send: {
                isPending
            }
        } = this.props;

        return (
            <div className='send_container'>
                <Header size='medium'>Send Tokens</Header>
                <Form onSubmit={this.sendFormSubmitted.bind(this)}>
                    <Form.Field>
                        <Field
                            name='address'
                            label='Address'
                            type='text'
                            disabled={isPending}
                            component={renderCommonField}
                        />
                        <div className='space'/>
                        <div>
                            <div className='left'>
                                <Field
                                    name='value'
                                    label='Value'
                                    disabled={isPending}
                                    component={renderShortField}
                                />
                            </div>
                            <Button
                                className='right'
                                color='green'
                                type='button'
                                disabled={isPending}
                                icon='angle double up'
                                onClick={() => {
                                    changeFieldValue(
                                        'value',
                                        String(account.balance)
                                    );
                                }}
                            />
                            <div className='clear'/>
                        </div>
                        <div className='space_medium'/>
                        <Form.Button
                            basic
                            loading={isPending}
                            color='black'>
                            <Icon name='send'/> Send
                        </Form.Button>
                    </Form.Field>
                </Form>
                {this.getSendInfoStatus()}
            </div>
        );
    };

    sendFormSubmitted() {
        const {
            actions,
            value,
            address,
            account: {contractAddress, decimals}
        } = this.props;

        return new Promise((resolve, reject) => {
            const validation = this.validate();

            if (validation) {
                throw new SubmissionError(validation);
            }

            try {
                resolve(actions.send(address, value, decimals, contractAddress));
            } catch(e) {
                reject(e);
            }
        });
    }

    getSendInfoStatus() {
        const {send: {transaction, error}} = this.props;

        if (transaction) {
            return <Message
                success
                header='Your transaction is created'
                content={
                    <a
                        target='_blank'
                        href={transactionLink(transaction)}
                    >
                        {`${transaction.substring(0, 42)}...`}
                    </a>
                }
            />
        }

        if (error) {
            return <Message
                negative
                header='Your transaction is not created'
                content='Something wrong with client or node'
            />;
        }
    }

    validateAddress() {
        const {address} = this.props;

        if (!address) {
            return 'You must specify address';
        }

        if (!ethereum.isAddress(address)) {
            return 'Invalid address';
        }
    };

    validateValue() {
        const {account, value} = this.props;

        if (value === undefined) {
            return 'You must specify value';
        }

        if (value > account.balance) {
            return 'You don\'t have enough money';
        }
    };

    validate() {
        const validatedValue = this.validateValue();
        const validatedAddress = this.validateAddress();

        if (validatedAddress || validatedValue) {
            return {
                address: validatedAddress,
                value: validatedValue
            }
        }
    };
}

function mapStateToProps(state) {
    const selector = formValueSelector(FORM_NAME);

    return {
        send: state.send,
        address: selector(state, 'address') || '',
        value: parseFloat(selector(state, 'value')) || undefined
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        changeFieldValue: (field, value) => {
            dispatch(
                change(
                    FORM_NAME,
                    field,
                    value
                )
            );
        }
    };
}
