import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {reduxForm, Field} from 'redux-form';
import {Form, Button, Icon, Header} from 'semantic-ui-react';
import './send.css';

const FORM_NAME = 'send';

@reduxForm({
    form: FORM_NAME,
    destroyOnUnmount: false
})
export default class Send extends Component {

    static propTypes = {};

    render() {
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
                                    type="text"
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
                            color='black'>
                            <Icon name='send'/> Send
                        </Form.Button>
                    </Form.Field>
                </Form>
            </div>
        );
    };
}
