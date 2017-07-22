import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Form, Input, Button, Icon, Header} from 'semantic-ui-react';
import './send.css';

export default class Send extends Component {

    static propTypes = {};

    render() {
        return (
            <div className='send_container'>
                <Header size='medium'>Send Tokens</Header>
                <Form>
                    <Form.Field>
                        <Input
                            className='send_input'
                            placeholder='Address'
                        />
                        <div className='space'/>
                        <div>
                            <Input
                                className='send_input_short left'
                                placeholder='Value'
                            />
                            <Button
                                className='right'
                                color='green'
                                icon='angle double up'
                            />
                            <div className='clear'/>
                        </div>
                        <div className='space_medium'/>
                        <Button
                            basic
                            color='black'>
                            <Icon name='send'/> Send
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        );
    };
}
