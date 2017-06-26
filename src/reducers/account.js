import typeToReducer from 'type-to-reducer';
import {LOAD_ACCOUNT} from '../constants';
import {typeToError} from '../error/account';

const ACCOUNT_DEFAULT_STATE = {
    account: null,
    isPending: true,
    error: null
};

export default typeToReducer({
    [LOAD_ACCOUNT]: {
        PENDING: (state, action) => ({
            ...state,
            isPending: true,
            error: null
        }),
        REJECTED: (state, action) => ({
            ...state,
            isPending: false,
            error: typeToError(action.payload.message)
        }),
        FULFILLED: (state, action) => ({
            ...state,
            account: action.payload,
            isPending: false,
            error: null
        })
    }
}, ACCOUNT_DEFAULT_STATE);
