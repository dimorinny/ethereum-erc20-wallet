import {executeTokenMethod} from '../contract/token';
import {mapUint} from '../util/mapping';

export function getAccount(contractAddress) {
    let cachedAddress;

    return executeTokenMethod(
        contractAddress,
        (address, token) => {
            cachedAddress = address;
            return callback => token.balanceOf.call(address, callback);
        }
    )
        .then(mapUint)
        .then((value) => value / 10000)
        .then(balance => ({
            address: cachedAddress,
            balance: balance
        }));
}

// export function sendMoney(actions, receiver, value) {
//     let address;
//
//     return currentAccount()
//         .then(account => {
//             address = account;
//         })
//         .then(provideDeployedToken)
//         .then(instance => instance.sendCoin(receiver, value, {from: address}))
//         .then(actions.loadAccount);
// }
//
// export function updateBalance(actions) {
//     let address;
//
//     return currentAccount()
//         .then(account => {
//             address = account;
//         })
//         .then(provideDeployedToken)
//         .then(instance => instance.updateBalance({from: address}))
//         .then(actions.loadAccount);
// }
