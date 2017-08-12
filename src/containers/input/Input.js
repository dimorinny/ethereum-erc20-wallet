import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {reduxForm, formValueSelector, Field} from 'redux-form';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Form} from 'semantic-ui-react';
import ethereumPath from '../../../static/img/ethereum.png';
import './input.css';

const FORM_NAME = 'input';

@withRouter
@connect(mapStateToProps)
@reduxForm({
    form: FORM_NAME,
    destroyOnUnmount: false
})
export default class InputPage extends Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
        inputText: PropTypes.string
    };

    render() {
        const {history, inputText} = this.props;

        return (
            <div className='input_container'>

                <div className='input_header_container'>
                    <img className='input_header_image' src={ethereumPath}/>
                </div>


                <Form onSubmit={() => history.push(inputText)}>
                    <Form.Field>
                        <div className='ui massive input input_field'>
                            <Field
                                name='input'
                                component='input'
                                placeholder='0x1fDE9bAf52bBa2Ae3CC019FeD9d0C77...'
                                type='text'
                            />
                        </div>
                    </Form.Field>
                </Form>
            </div>
        );
    };
}

function mapStateToProps(state) {
    const selector = formValueSelector(FORM_NAME);
    console.log(state);
    return {
        router: state.router,
        inputText: selector(state, 'input')
    };
}
