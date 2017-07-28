import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector, Field} from 'redux-form';
import {bindActionCreators} from 'redux';
import {Form, Button, Icon, Header} from 'semantic-ui-react';
import * as actionCreators from '../../actions/token';
import './send.css';

const FORM_NAME = 'send';

@connect(mapStateToProps, mapDispatchToProps)
@reduxForm({
    form: FORM_NAME,
    destroyOnUnmount: false
})
export default class Send extends Component {

    static propTypes = {
        account: PropTypes.shape({
            address: PropTypes.string.isRequired,
            contractAddress: PropTypes.string.isRequired,
            balance: PropTypes.object.isRequired,
            symbol: PropTypes.string,
            totalSupply: PropTypes.object,
        }),
        address: PropTypes.string,
        value: PropTypes.string,
    };

    render() {
        const {account, address, value} = this.props;

        return (
            <div className='send_container'>
                <Header size='medium'>Send Tokens</Header>
                <Form>
                    <Form.Field>
                        <div className='ui input send_input'>
                            <Field
                                name="address"
                                component="input"
                                placeholder='Address'
                                type="text"
                            />
                        </div>
                        <div className='space'/>
                        <div>
                            <div className='ui input send_input_short left'>
                                <Field
                                    name="value"
                                    component="input"
                                    placeholder='Value'
                                    type="number"
                                />
                            </div>
                            <Button
                                className='right'
                                color='green'
                                icon='angle double up'
                            />
                            <div className='clear'/>
                        </div>
                        <div className='space_medium'/>
                        <Form.Button
                            basic
                            disabled={Boolean(this.validate())}
                            color='black'>
                            <Icon name='send'/> Send
                        </Form.Button>
                    </Form.Field>
                </Form>
            </div>
        );
    };

    // TODO: validate address
    validateAddress() {
        return null;
    }

    validateValue() {
        const {account, value} = this.props;

        if (!value) {
            return 'Invalid money value';
        }

        if (value > account.balance.toNumber()) {
            return 'You do not have enough money';
        }

        return null;
    }

    validate() {
        const validatedValue = this.validateValue();
        const validatedAddress = this.validateAddress();

        if (validatedAddress || validatedValue) {
            return {
                address: validatedAddress,
                value: validatedValue
            }
        }
    }
}

function mapStateToProps(state) {
    const selector = formValueSelector(FORM_NAME);
    return {
        address: selector(state, 'address') || '',
        value: parseInt(selector(state, 'value')) || undefined
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}
