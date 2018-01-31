import typeToReducer from 'type-to-reducer';
import {LOAD_TRANSACTION_HISTORY} from '../constants';
import {typeToError} from '../error/history';

const TRANSACTION_HISTORY_DEFAULT_STATE = {
    history: null,
    isPending: true,
    error: null
};

export default typeToReducer({
    [LOAD_TRANSACTION_HISTORY]: {
        PENDING: (state, action) => ({
            ...state,
            isPending: true,
            error: null
        }),
        REJECTED: (state, action) => ({
            ...state,
            isPending: false,
            error: typeToError(action.payload)
        }),
        FULFILLED: (state, action) => ({
            ...state,
            history: action.payload,
            isPending: false,
            error: null
        })
    }
}, TRANSACTION_HISTORY_DEFAULT_STATE);
