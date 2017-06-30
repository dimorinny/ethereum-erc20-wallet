import {createAction} from 'redux-actions';
import {INPUT_TEXT_CHANGED, LOAD_ACCOUNT, SEND_MONEY, UPDATE_BALANCE} from '../constants';
import {getAccount, sendMoney, updateBalance} from '../services/token';

export const inputTextChanged = createAction(INPUT_TEXT_CHANGED, (text) => text);

export const loadAccount = createAction(LOAD_ACCOUNT, getAccount);

export const send = createAction(SEND_MONEY, sendMoney);
export const update = createAction(UPDATE_BALANCE, updateBalance);
