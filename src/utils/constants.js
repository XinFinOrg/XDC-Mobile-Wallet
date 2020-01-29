import uuid from 'react-native-uuid';
const contractAddressXDC = '0xc573c48ad1037dd92cb39281e5f55dcb5e033a70';
const contractAddressXDCE = '0x41ab1b6fcbb2fa9dced81acbdec13ea6315f2bf2';

const defaultTokens = [
  {
    name: 'XDC',
    tName: 'XDCM',
    type: 'XDC',
    id: uuid.v4(),
    symbol: 'XDC',
    contractAddress: contractAddressXDC,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'mainnet',
  },
  {
    name: 'XDC',
    tName: 'XDC',
    type: 'XDC (Testnet)',
    id: uuid.v4(),
    symbol: 'XDC',
    contractAddress: null,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'private',
  },
  {
    name: 'XDCE',
    tName: 'XDCE',
    id: uuid.v4(),
    symbol: 'XDCE',
    contractAddress: contractAddressXDCE,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'public',
  },
];


const currencyList = [
    'USD',
    'AUD',
    'BGN',
    'CAD',
    'CHF',
    'CNY',
    'DKK',
    'EUR',
    'GBP',
    'HKD',
    'HRK',
    'IDR',
    'ILS',
    'INR',
    'KRW',
    'NOK',
    'NZD',
    'PHP',
    'RON',
    'SEK',
    'SGD',
    'THB',
    'ZAR',
];

const erc20Abi = [
  {
    name: 'balanceOf',
    type: 'function',
    constant: true,
    payable: false,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
  },
  {
    name: 'transfer',
    type: 'function',
    constant: false,
    payable: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'success',
        type: 'bool',
      },
    ],
  },
];

export { defaultTokens, erc20Abi, currencyList };
