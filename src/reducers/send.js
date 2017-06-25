import typeToReducer from 'type-to-reducer';
import {SEND_MONEY} from '../constants';

const SEND_DEFAULT_STATE = {
    isPending: false,
    success: null,
    error: null
};

export default typeToReducer({
    [SEND_MONEY]: {
        PENDING: (state, action) => ({
            ...state,
            isPending: true,
            error: null,
            success: null
        }),
        REJECTED: (state, action) => ({
            ...state,
            isPending: false,
            error: 'Send coin error',
            success: null
        }),
        FULFILLED: (state, action) => ({
            ...state,
            isPending: false,
            error: null,
            success: 'Success'
        })
    }
}, SEND_DEFAULT_STATE);
