import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import account from './account';
import send from './send';

export default combineReducers({
    account,
    form,
    send,
    routing
});
