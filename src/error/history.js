import {TRANSACTION_HISTORY_LOAD_ERROR} from './type';

export function typeToError(type) {
    let error;

    switch (type) {

        default:
            error = TRANSACTION_HISTORY_LOAD_ERROR;
            break;
    }

    return error;
}
