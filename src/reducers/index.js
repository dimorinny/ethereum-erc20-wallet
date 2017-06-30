import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import account from './account';
import input from './input';

export default combineReducers({
    account,
    input,
    routing
});
