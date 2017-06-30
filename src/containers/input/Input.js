import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/token';
import {Input, Form} from 'semantic-ui-react';
import ethereumPath from '../../../static/img/ethereum.png';
import './input.css';

@connect(mapStateToProps, mapDispatchToProps)
export default class InputPage extends Component {

    static propTypes = {
        input: PropTypes.shape({
            text: PropTypes.string.isRequired
        })
    };

    render() {
        const {input: {text}, actions} = this.props;

        return (
            <div className='input_container'>

                <div className='input_header_container'>
                    <img className='input_header_image' src={ethereumPath}/>
                </div>

                <Form onSubmit={() => this.props.router.push(text)}>
                    <Form.Field>
                        <Input
                            size='massive'
                            placeholder='0x1fDE9bAf52bBa2Ae3CC019FeD9d0C77...'
                            className='input_field'
                            value={text}
                            onChange={(_, {value}) => actions.inputTextChanged(value)}
                        />
                    </Form.Field>
                </Form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {
        input: state.input
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}
