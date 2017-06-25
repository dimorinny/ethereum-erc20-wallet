import abi from 'human-standard-token-abi';
import {provideWeb3, currentAccount} from './web3';

let _cachedToken;

function _provideToken(web3) {
    if (_cachedToken) {
        return _cachedToken;
    }

    _cachedToken = web3.eth
        .contract(abi)
        .at('0x3bb4f2de09fce107b58f9cb5d8a7ca84a2f409e9');

    return _cachedToken;
}

export function provideToken() {
    return provideWeb3()
        .then(_provideToken);
}

export function executeTokenMethod(execution) {
    let address;

    return currentAccount()
        .then(account => {
            address = account;
        })
        .then(provideToken)
        .then(instance => {
            return new Promise((resolve, reject) => {
                execution(address, instance)((error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                })
            });
        });
}
