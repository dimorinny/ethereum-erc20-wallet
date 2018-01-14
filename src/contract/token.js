import abi from 'human-standard-token-abi';
import {provideWeb3, currentAccount} from './web3';

let _cachedToken;
let _cachedAddress;

function _provideToken(web3, address) {
    if (_cachedToken && _cachedAddress === address) {
        return _cachedToken;
    }

    _cachedAddress = address;
    _cachedToken = new web3.eth.Contract(abi, address);

    return _cachedToken;
}

export function provideToken(contractAddress) {
    return provideWeb3()
        .then((web3) => _provideToken(web3, contractAddress));
}

export function getTransferHistory(contractAddress, key) {
    return tokenMethod(
        contractAddress,
        (instance, address, resolve, reject) => {
            instance.getPastEvents('Transfer', {
                filter: {[key]: address},
                fromBlock: 0,
                toBlock: 'latest'
            })
                .then(data => resolve(data))
                .catch(error => reject(error));
        }
    );
}

export function executeTokenMethod(contractAddress, execution) {
    return tokenMethod(
        contractAddress,
        (instance, address, resolve, reject) => {
            execution(address, instance)((error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        }
    );
}

function tokenMethod(contractAddress, method) {
    let address;

    return currentAccount()
        .then(account => {
            if (!account) {
                throw Error('Error while getting address')
            }

            address = account;
        })
        .then(() => provideToken(contractAddress))
        .then(instance => new Promise(
            (resolve, reject) => method(instance, address, resolve, reject))
        );
}
