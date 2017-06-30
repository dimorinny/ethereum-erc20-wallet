import typeToReducer from 'type-to-reducer';
import {INPUT_TEXT_CHANGED} from '../constants';

const INPUT_DEFAULT_STATE = {
    text: ''
};

export default typeToReducer({
    [INPUT_TEXT_CHANGED]: (_, action) => ({
        text: action.payload
    })
}, INPUT_DEFAULT_STATE);
