import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers';

export default (initialState) => {
    const store = compose(
        getMiddleware(),
        ...getEnhancers()
    )(createStore)(rootReducer, initialState);

    enableHotLoader(store);

    return store;
}

function getMiddleware() {
    let middleware = [
        routerMiddleware(browserHistory),
        promiseMiddleware()
    ];

    if (__DEV__) {
        middleware = [...middleware, createLogger()];
    }

    return applyMiddleware(...middleware);
}

function getEnhancers() {
    let enhancers = [
        // Our enhancers here
    ];

    if (__DEV__ && window.devToolsExtension) {
        enhancers = [...enhancers, window.devToolsExtension()];
    }

    return enhancers;
}

function enableHotLoader(store) {
    if (__DEV__ && module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
}
