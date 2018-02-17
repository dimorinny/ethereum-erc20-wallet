import {executeTokenMethod, getTransferHistory} from '../contract/token';
import getAddressByTokenName from '../util/token.js';

export function getAccount(actions, addressParam) {
    let contractAddress;
    let savedAddress;
    let savedBalance;
    let savedSymbol;
    let savedDecimals;
    let savedTotalSupply;

    const getContractAddress = () => new Promise((resolve, _) => {
        resolve(getAddressByTokenName(addressParam) || addressParam);
    })
        .then(address => contractAddress = address);

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

    return getContractAddress()
        .then(loadDecimals)
        .then(loadSymbol)
        .then(loadBalance)
        .then(loadTotalSupply)
        .then(() => {
            actions.loadTransactionHistory(contractAddress, savedDecimals);
            return {
                address: savedAddress,
                contractAddress: contractAddress,
                balance: savedBalance,
                decimals: savedDecimals,
                symbol: savedSymbol,
                totalSupply: savedTotalSupply
            }
        });
}

export function getTransactionHistory(contractAddress, decimals) {
    let inHistory;
    let outHistory;
    let history;

    const mapHistoryItem = (item, direction) => ({
        blockHash: item.blockHash,
        blockNumber: item.blockNumber,
        transactionHash: item.transactionHash,
        direction: direction,
        from: item.returnValues._from,
        to: item.returnValues._to,
        value: Number.parseInt(item.returnValues._value) / decimals
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

    return loadInHistory()
        .then(loadOutHistory)
        .then(combineHistory)
        .then(() => history);
}

export function sendMoney(to, value, decimals, contractAddress) {
    let transferTransactionHash;

    const sendMoney = () => executeTokenMethod(
        contractAddress,
        (address, token) => callback => token.methods.transfer(to, value * decimals).send({from: address}, callback)
    )
        .then(tx => transferTransactionHash = tx)
        .catch(() => console.log('Error during sending money'));

    return sendMoney()
        .then(() => ({transferTransactionHash}));
}
