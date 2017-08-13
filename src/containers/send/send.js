import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, change, formValueSelector, Field, SubmissionError} from 'redux-form';
import {bindActionCreators} from 'redux';
import {Form, Button, Icon, Header} from 'semantic-ui-react';
import * as actionCreators from '../../actions/token';
import './send.css';

const FORM_NAME = 'send';

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <div className='ui input send_input'>
            <input {...input} type={type} placeholder={label}/>
        </div>
        <p>{error}</p>
    </div>
);

const renderShortField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <div className='ui input send_input_short'>
            <input {...input} type={type} placeholder={label}/>
        </div>
        <p>{error}</p>
    </div>
);

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
        handleSubmit: PropTypes.func.isRequired,
        changeFieldValue: PropTypes.func.isRequired,
        address: PropTypes.string,
        value: PropTypes.number,
    };

    render() {
        const {
            account,
            address,
            value,
            handleSubmit,
            changeFieldValue
        } = this.props;

        return (
            <div className='send_container'>
                <Header size='medium'>Send Tokens</Header>
                <Form onSubmit={
                    handleSubmit(this.sendFormSubmitted.bind(this))
                }>
                    <Form.Field>
                        <Field
                            name='address'
                            label='Address'
                            type='text'
                            component={renderField}
                        />
                        <div className='space'/>
                        <div>
                            <div className='left'>
                                <Field
                                    name='value'
                                    type='number'
                                    label='Value'
                                    component={renderShortField}
                                />
                            </div>
                            <Button
                                className='right'
                                color='green'
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
                            color='black'>
                            <Icon name='send'/> Send
                        </Form.Button>
                    </Form.Field>
                </Form>
            </div>
        );
    };

    sendFormSubmitted() {
        return new Promise((resolve, reject) => {
            const validation = this.validate();

            if (validation) {
                throw new SubmissionError(validation);
            }
        });
    }

    // TODO: validate address
    validateAddress() {
        return 'TODO: validate address';
    };

    validateValue() {
        const {account, value} = this.props;

        if (!value) {
            return 'Invalid money value';
        }

        if (value > account.balance.toNumber()) {
            return 'You don\'t have enough money';
        }

        return null;
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
        address: selector(state, 'address') || '',
        value: parseInt(selector(state, 'value')) || undefined
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
