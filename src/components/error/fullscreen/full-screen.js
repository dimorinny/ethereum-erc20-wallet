import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './full-screen.css';

export default class FullScreenError extends Component {

    static propTypes = {
        payload: PropTypes.shape({
            img: PropTypes.string.isRequired,
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
