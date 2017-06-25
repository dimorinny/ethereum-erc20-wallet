import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import account from './account';

export default combineReducers({
    account,
    routing
});
