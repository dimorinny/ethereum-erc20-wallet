import {executeTokenMethod, getTransferHistory} from '../contract/token';

export function getAccount(contractAddress) {
    let savedAddress;
    let savedBalance;
    let savedSymbol;
    let savedDecimals;
    let savedTotalSupply;

    let inHistory;
    let outHistory;
    let history;

    const loadDecimals = () => executeTokenMethod(
        contractAddress,
        (address, token) => callback => token.methods.decimals().call({from: address}, callback)
    )
        .then(decimals => Number.parseInt(decimals))
        .then(decimals => savedDecimals = Math.pow(10, decimals));

    const loadBalance = () => executeTokenMethod(
        contractAddress,
        (address, token) => {
            savedAddress = address;
            return callback => token.methods.balanceOf(address).call({from: address}, callback);
        }
    )
        .then(value => Number.parseInt(value))
        .then(value => value / savedDecimals)
        .then(balance => savedBalance = balance);

    const loadSymbol = () => executeTokenMethod(
        contractAddress,
        (address, token) => callback => token.methods.symbol().call({from: address}, callback)
    )
        .then(symbol => savedSymbol = symbol);

    const loadTotalSupply = () => executeTokenMethod(
        contractAddress,
        (address, token) => callback => token.methods.totalSupply().call({from: address}, callback)
    )
        .then(totalSupply => Number.parseInt(totalSupply))
        .then(totalSupply => totalSupply / savedDecimals)
        .then(number => savedTotalSupply = number);

    const mapHistoryItem = (item, direction) => ({
        blockHash: item.blockHash,
        blockNumber: item.blockNumber,
        transactionHash: item.transactionHash,
        direction: direction,
        from: item.returnValues._from,
        to: item.returnValues._to,
        value: Number.parseInt(item.returnValues._value) / savedDecimals
    });

    const loadInHistory = () => getTransferHistory(
        contractAddress,
        '_to'
    )
        .then(items => items.map(item => mapHistoryItem(item, 'In')))
        .then(items => inHistory = items);

    const loadOutHistory = () => getTransferHistory(
        contractAddress,
        '_from'
    )
        .then(items => items.map(item => mapHistoryItem(item, 'Out')))
        .then(items => outHistory = items);

    const combineHistory = () => {
        history = inHistory
            .concat(outHistory)
            .sort((first, second) => second.blockNumber - first.blockNumber);
    };

    return loadDecimals()
        .then(loadSymbol)
        .then(loadBalance)
        .then(loadTotalSupply)
        .then(loadInHistory)
        .then(loadOutHistory)
        .then(combineHistory)
        .then(() => ({
            address: savedAddress,
            contractAddress: contractAddress,
            balance: savedBalance,
            decimals: savedDecimals,
            symbol: savedSymbol,
            totalSupply: savedTotalSupply,
            history: history
        }));
}

export function sendMoney(to, value, decimals, contractAddress) {
    let transferTransactionHash;

    const sendMoney = () => executeTokenMethod(
        contractAddress,
        (address, token) => callback => token.methods.transfer(to, value * decimals, {from: address}, callback)
    )
        .then(tx => transferTransactionHash = tx);

    return sendMoney()
        .then(() => ({
            transferTransactionHash: transferTransactionHash
        }));
}
