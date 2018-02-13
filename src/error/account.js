import {INVALID_ADDRESS_ERROR, WEB3_ERROR} from './type';

const INVALID_ADDRESS_MESSAGE = 'the capitalization checksum test failed';

export function typeToError(type) {
    let error;

    if (type.includes(INVALID_ADDRESS_MESSAGE)) {
        error = INVALID_ADDRESS_ERROR;
    } else {
        error = WEB3_ERROR;
    }

    return error;
}


