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
        const {title, description} = this.props.payload;

        return (
            <div>
                <h2>{title}</h2>
                <h4>{description}</h4>
            </div>
        );
    };
}
