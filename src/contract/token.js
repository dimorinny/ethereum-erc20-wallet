import abi from 'human-standard-token-abi';
import {provideWeb3, currentAccount} from './web3';

let _cachedToken;
let _cachedAddress;

function _provideToken(web3, address) {
    if (_cachedToken && _cachedAddress === address) {
        return _cachedToken;
    }

    _cachedAddress = address;
    _cachedToken = web3.eth
        .contract(abi)
        .at(address);

    // let transferEvent = _cachedToken.Transfer({_to: account}, {fromBlock: 0, toBlock: 'latest'});
    // transferEvent.get((_, log) => { console.log(log); });

    return _cachedToken;
}

export function provideToken(contractAddress) {
    return provideWeb3()
        .then((web3) => _provideToken(web3, contractAddress));
}

export function executeTokenMethod(contractAddress, execution) {
    let address;

    return currentAccount()
        .then(account => {
            address = account;
        })
        .then(() => provideToken(contractAddress))
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
