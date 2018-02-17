import tokens from './tokens/tokens.json';

export default function(param) {
    let address = tokens.find((element) => param === element['symbol']);

    if (address) {
        address = address['address'];
    }

    return address;
}
