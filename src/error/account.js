import {INVALID_ADDRESS_ERROR, WEB3_ERROR} from './type';

const INVALID_ADDRESS_MESSAGE = 'invalid address';

export function typeToError(type) {
    let error;

    switch (type) {
        case INVALID_ADDRESS_MESSAGE:
            error = INVALID_ADDRESS_ERROR;
            break;

        default:
            error = WEB3_ERROR;
            break;
    }

    return error;
}


