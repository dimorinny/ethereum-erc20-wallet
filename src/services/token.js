import {executeTokenMethod, getTransferHistory} from '../contract/token';

export function getAccount(contractAddress) {

    let savedAddress;
    let savedBalance;
    let savedSymbol;
    let savedDecimals;
    let savedTotalSupply;

    let incomingHistory;
    let outcomingHistory;
    let history;

    const loadBalance = () => executeTokenMethod(
        contractAddress,
        (address, token) => {
            savedAddress = address;
            return callback => token.balanceOf.call(address, callback);
        }
    )
        .then((value) => value.div(10000))
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
        .catch(() => {
        });

    const loadDecimals = () => executeTokenMethod(
        contractAddress,
        (_, token) => {
            return callback => token.decimals.call(callback);
        }
    )
        .then((decimals) => {
            savedDecimals = Math.pow(10, decimals.toNumber());
        })
        .catch(() => {
            savedDecimals = 1;
        });

    const loadTotalSupply = () => executeTokenMethod(
        contractAddress,
        (_, token) => {
            return callback => token.totalSupply.call(callback);
        }
    )
        .then((totalSupply) => totalSupply.div(savedDecimals))
        .then((number) => {
            savedTotalSupply = number;
        });

    const mapHistoryItem = (item) => ({
        blockHash: item.blockHash,
        blockNumber: item.blockNumber,
        transactionHash: item.transactionHash,
        type: item.type,
        from: item.args._from,
        to: item.args._to,
        value: item.args._value
    });

    const loadIncomingHistory = () => getTransferHistory(
        contractAddress,
        '_to'
    )
        .then((items) => items.map(mapHistoryItem))
        .then((items) => {
            incomingHistory = items;
        });

    const loadOutcomingHistory = () => getTransferHistory(
        contractAddress,
        '_from'
    )
        .then((items) => items.map(mapHistoryItem))
        .then((items) => {
            outcomingHistory = items;
        });

    const combineHistory = () => {
        history = incomingHistory
            .concat(outcomingHistory)
            .sort((first, second) => second - first);
    };

    return loadBalance()
        .then(loadSymbol)
        .then(loadDecimals)
        .then(loadTotalSupply)
        .then(loadIncomingHistory)
        .then(loadOutcomingHistory)
        .then(combineHistory)
        .then(() => ({
            address: savedAddress,
            contractAddress: contractAddress,
            balance: savedBalance,
            symbol: savedSymbol,
            totalSupply: savedTotalSupply,
            history: history
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
