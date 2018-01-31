import metamaskPath from '../../static/img/metamask.png';
import addressPath from '../../static/img/address.png';

export const INVALID_ADDRESS_ERROR = {
    img: addressPath,
    title: 'Invalid Address',
    description: 'Use valid Ethereum ERC20 token address.'
};

export const EMPTY_TRANSACTION_HISTORY = {
    img: addressPath,
    title: 'Transaction History Is Empty'
};

export const TRANSACTION_HISTORY_LOAD_ERROR = {
    img: addressPath,
    title: 'Transaction History Loading Error'
};

export const WEB3_ERROR = {
    img: metamaskPath,
    title: 'Account Loading Error',
    description: 'Use Metamask or Mist project for authorization in blockchain.'
};
