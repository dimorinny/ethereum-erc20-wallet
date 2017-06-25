import {executeTokenMethod} from '../contract/token';
import {mapUint} from '../util/mapping';

export function getAccount() {
    let cachedAddress;

    return executeTokenMethod(
        (address, token) => {
            cachedAddress = address;
            return callback => token.balanceOf.call(address, callback);
        }
    )
        .then(mapUint)
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
