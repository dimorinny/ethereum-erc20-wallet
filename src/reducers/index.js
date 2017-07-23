import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import account from './account';

export default combineReducers({
    account,
    form,
    routing
});
