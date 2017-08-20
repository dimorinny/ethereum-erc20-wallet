import typeToReducer from 'type-to-reducer';
import {SEND_MONEY} from '../constants';

const SEND_DEFAULT_STATE = {
    isPending: false,
    transaction: null,
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
            error: action.payload,
            success: null
        }),
        FULFILLED: (state, action) => ({
            ...state,
            isPending: false,
            error: null,
            transaction: action.payload.transferTransactionHash
        })
    }
}, SEND_DEFAULT_STATE);
