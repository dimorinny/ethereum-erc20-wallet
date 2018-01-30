import {createAction} from 'redux-actions';
import {LOAD_ACCOUNT, SEND_MONEY, LOAD_TRANSACTION_HISTORY} from '../constants';
import {getAccount, getTransactionHistory, sendMoney} from '../services/token';

export const loadAccount = createAction(LOAD_ACCOUNT, getAccount);
export const loadTransactionHistory = createAction(LOAD_TRANSACTION_HISTORY, getTransactionHistory);
export const send = createAction(SEND_MONEY, sendMoney);
