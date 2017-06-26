import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './error-component.css';

export default class ErrorComponent extends Component {

    static propTypes = {
        payload: PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }).isRequired
    };

    render() {
        const {title, description, img} = this.props.payload;

        return (
            <div className='error_container'>
                <img className='error_image' src={img}/>
                <div className='error_title'>{title}</div>
                <div className='error_description'>{description}</div>
            </div>
        );
    };
}
