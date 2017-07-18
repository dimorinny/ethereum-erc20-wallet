import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import './small.css';

export default class SmallError extends Component {

    static propTypes = {
        payload: PropTypes.shape({
            img: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired,
        className: PropTypes.string
    };

    render() {
        const {payload, className} = this.props;
        const {title, img} = payload;

        return (
            <div className={'small_error_container ' + className || ''}>
                <img className='small_error_image' src={img}/>
                <div className='small_error_title'>{title}</div>
            </div>
        );
    };
}
