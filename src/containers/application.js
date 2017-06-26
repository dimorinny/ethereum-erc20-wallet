import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/token';

@connect(mapStateToProps, mapDispatchToProps)
export default class Application extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
    };

    render() {
        const {children} = this.props;

        return (
            <div>
                { children }
            </div>
        );
    };
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}
