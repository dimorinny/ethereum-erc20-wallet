import {executeTokenMethod, getTransferHistory} from '../contract/token';

export function getAccount(contractAddress) {
    const scaleFactor = 10000;

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
        .then((value) => value.div(scaleFactor))
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

    const mapHistoryItem = (item, direction) => ({
        blockHash: item.blockHash,
        blockNumber: item.blockNumber,
        transactionHash: item.transactionHash,
        type: item.type,
        direction: direction,
        from: item.args._from,
        to: item.args._to,
        value: item.args._value.div(savedDecimals)
    });

    const loadIncomingHistory = () => getTransferHistory(
        contractAddress,
        '_to'
    )
        .then((items) => items.map((item) => mapHistoryItem(item, 'In')))
        .then((items) => {
            incomingHistory = items;
        });

    const loadOutcomingHistory = () => getTransferHistory(
        contractAddress,
        '_from'
    )
        .then((items) => items.map((item) => mapHistoryItem(item, 'Out')))
        .then((items) => {
            outcomingHistory = items;
        });

    const combineHistory = () => {
        history = incomingHistory
            .concat(outcomingHistory)
            .sort((first, second) => second.blockNumber - first.blockNumber);
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

export function sendMoney(to, value, contractAddress) {
    let transferTransactionHash;

    const sendMoney = () => executeTokenMethod(
        contractAddress,
        (address, token) => {
            return callback => token.transfer(to, value, {from: address}, callback)
        }
    )
        .then((tx) => {
            transferTransactionHash = tx;
        });

    return sendMoney()
        .then(() => ({
            transferTransactionHash: transferTransactionHash
        }));
}
