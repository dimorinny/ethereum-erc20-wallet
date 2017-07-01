import {executeTokenMethod} from '../contract/token';
import {mapNumber} from '../util/mapping';

export function getAccount(contractAddress) {

    let savedAddress;
    let savedBalance;
    let savedSymbol;
    let savedTotalSupply;

    const loadBalance = () => executeTokenMethod(
        contractAddress,
        (address, token) => {
            savedAddress = address;
            return callback => token.balanceOf.call(address, callback);
        }
    )
        .then(mapNumber)
        .then((value) => value / 10000)
        .then(balance => {
            savedBalance = balance;
        });

    const loadSymbol = () => executeTokenMethod(
        contractAddress,
        (_, token) => {
            return callback => token.symbol.call(callback);
        }
    )
        .then((symbol) => {
            savedSymbol = symbol;
        })
        .catch(() => {});

    const loadTotalSupply = () => executeTokenMethod(
        contractAddress,
        (_, token) => {
            return callback => token.totalSupply.call(callback);
        }
    )
        .then(mapNumber)
        .then((totalSupply) => {
            savedTotalSupply = totalSupply;
        });

    return loadBalance()
        .then(loadSymbol)
        .then(loadTotalSupply)
        .then(() => ({
            address: savedAddress,
            contractAddress: contractAddress,
            balance: savedBalance,
            symbol: savedSymbol,
            totalSupply: savedTotalSupply
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
