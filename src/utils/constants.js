import uuid from 'react-native-uuid';
const contractAddressXDC = '0xc573c48ad1037dd92cb39281e5f55dcb5e033a70';
const contractAddressXDCE = '0x41ab1b6fcbb2fa9dced81acbdec13ea6315f2bf2';
const contractAddressUSDC = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
const contractAddressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7';

const reduxPersistKey_old = `xdcwallet`;
const reduxPersistKey = `xdcWalletVersion195a9838`;

const dimHeight = 10000;

const defaultTokens = [
  {
    name: 'XDC',
    tName: 'XDC',
    type: 'XDC (Mainnet)',
    id: uuid.v4(),
    symbol: 'XDC',
    contractAddress: null,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'mainnet',
    ticker: 2634,
  },
  {
    name: 'XDC',
    tName: 'XDC (Testnet)',
    type: 'XDC (Testnet)',
    id: uuid.v4(),
    symbol: 'XDCT',
    contractAddress: null,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'private',
    ticker: 2634,
  },
  {
    name: 'XDCE',
    tName: 'XDCE',
    type: 'ERC20',
    id: uuid.v4(),
    symbol: 'XDCE',
    contractAddress: contractAddressXDCE,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'public',
    ticker: 2634,
  },
  {
    name: 'Ethereum',
    tName: 'ETH',
    type: 'ETH',
    id: uuid.v4(),
    symbol: 'ETH',
    contractAddress: null,
    decimals: 18,
    currencySymbol: 'USD',
    network: 'public',
    ticker: 1027,
  },
  {
    name: 'USDCoin',
    tName: 'USDC',
    type: 'ERC20',
    id: uuid.v4(),
    symbol: 'USDC',
    contractAddress: contractAddressUSDC,
    decimals: 6,
    currencySymbol: 'USD',
    network: 'public',
    ticker: 3408,
  },
  {
    name: 'Tether USD',
    tName: 'USDT',
    type: 'ERC20',
    id: uuid.v4(),
    symbol: 'USDT',
    contractAddress: contractAddressUSDT,
    decimals: 6,
    currencySymbol: 'USD',
    network: 'public',
    ticker: 825,
  },
];

const Colors = {
	light: '#ffffff',
  dark: '#000000',
  darkPrimary: '#0e1215',
  darkPrimaryVariant: '#000000',
  darkSecondary: '#252a2d',
  darkSecondaryVariant: '#323a3d',
};

const gradientColors = {
  light: ['#359ff8', '#325efd'],
  dark: ['#000000', '#000000']
}

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

export { defaultTokens, currencyList, reduxPersistKey, reduxPersistKey_old, dimHeight, Colors, gradientColors };
