import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions/token';
import ErrorComponent from '../components/error/error-component';
import {WEB3_ERROR} from '../error/type';

@connect(mapStateToProps, mapDispatchToProps)
export default class Application extends Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        actions: PropTypes.object.isRequired,
        accountState: PropTypes.object.isRequired
    };

    render() {
        const {accountState} = this.props;
        const {error, account, isPending} = accountState;

        let content;

        if (error != null && error === WEB3_ERROR) {
            content = this.renderError();
        } else {
            content = this.renderContent();
        }

        return (
            <div>
                {content}
            </div>
        );
    };

    renderContent() {
        const {children} = this.props;

        return (
            <div>
                { children }
            </div>
        );
    };

    renderError() {
        const {error} = this.props.accountState;

        return (
            <ErrorComponent
                payload={error}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        accountState: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actionCreators, dispatch)};
}
