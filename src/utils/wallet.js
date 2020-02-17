import Config from 'react-native-config';
import EthereumJsWallet from 'ethereumjs-wallet';
import Web3 from 'web3';
import EthereumTx from 'ethereumjs-tx';
import ProviderEngine from 'web3-provider-engine';
import { ToastAndroid } from 'react-native';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import { store } from '../config/store';
import contractAbi from './XDCAbi';
import {
  ADD_TOKEN,
  SET_WALLET_ADDRESS,
  SET_PRIVATE_KEY,
} from '../config/actionTypes';
import AnalyticsUtils from './analytics';
const INFURA_API_KEY = '29f8ba04e3544a66a5271844505a5fd7';
const testnetNetwork = 'https://mappsrpc.apothem.network/';
const mainnetNetwork = 'https://mappsrpc.xinfin.network/';
const infureNetwork = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`

const testnetNetwork_optional = 'https://rpc.apothem.network';
const mainnetNetwork_optional = 'https://rpc.xinfin.network';

const etherscanAPI = 'GYQY64JSGG5PZQF5KGBUMZTIXPN3MDCS4P';

export default class WalletUtils {
  /**
   * Given an EthereumJSWallet instance, store both address and private key
   * in Redux store
   *
   * @param {Object} wallet
   */
  static storeWallet(wallet) {
    store.dispatch({
      type: SET_WALLET_ADDRESS,
      walletAddress: wallet.getAddressString(),
    });
    
    store.dispatch({
      type: SET_PRIVATE_KEY,
      privateKey: wallet.getPrivateKey().toString('hex'),
    });
  }

  /**
   * Generate an Ethereum wallet
   */
  static generateWallet() {
    const wallet = EthereumJsWallet.generate();

    AnalyticsUtils.trackEvent('Generate wallet', {
      walletAddress: wallet.getAddressString(),
    });

    this.storeWallet(wallet);

  }

  /**
   * Store a wallet in Redux store given a private key
   *
   * @param {String} privateKey
   */
  static restoreWallet(privateKey) {
    const wallet = EthereumJsWallet.fromPrivateKey(
      Buffer.from(privateKey, 'hex'),
    );

    AnalyticsUtils.trackEvent('Import wallet', {
      walletAddress: wallet.getAddressString(),
    });

    this.storeWallet(wallet);
  }

  /**
   * Reads an EthereumJSWallet instance from Redux store
   */
  static getWallet() {
    const { privateKey } = store.getState();

    return EthereumJsWallet.fromPrivateKey(Buffer.from(privateKey, 'hex'));
  }


  static getWeb3HTTPProvider() {
    switch (store.getState().network) {
      case 'private':
        return new Web3.providers.HttpProvider(
          testnetNetwork,
        );
      case 'mainnet':
        return new Web3.providers.HttpProvider(
          mainnetNetwork,
        );
      case 'private_optional':
        return new Web3.providers.HttpProvider(
          testnetNetwork_optional,
        );
      case 'mainnet_optional':
        return new Web3.providers.HttpProvider(
          mainnetNetwork_optional,
        );
      case 'public':
        return new Web3.providers.HttpProvider(
          infureNetwork,
        );
      default:
        return new Web3.providers.HttpProvider(
          infureNetwork,
        );
    }
  }

  static getEtherscanApiSubdomain() {
    switch (store.getState().network) {
      case 'ropsten':
        return 'api-ropsten';
      case 'kovan':
        return 'api-kovan';
      case 'rinkeby':
        return 'api-rinkeby';
      default:
        return 'ropsten';
    }
  }

  /**
   * Returns a web3 instance with the user's wallet
   */
  static getWeb3Instance(network) {
    const wallet = this.getWallet();

    const engine = new ProviderEngine();

    engine.addProvider(new WalletSubprovider(wallet, {}));

    if(network === 'private') {
      engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(
        testnetNetwork,
      )));
    } else if(network === 'mainnet') {
      engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(
        mainnetNetwork,
      )));
    } else if(network === 'private_optional') {
      engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(
        testnetNetwork_optional,
      )));
    } else if(network === 'mainnet_optional') {
      engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(
        mainnetNetwork_optional,
      )));
    } else {
      engine.addProvider(new ProviderSubprovider(new Web3.providers.HttpProvider(
        infureNetwork,
      )));
    }

    engine.start();

    const web3 = new Web3(engine);

    web3.eth.defaultAccount = wallet.getAddressString();

    return web3;
  }

  /**
   * Load the tokens the user owns
   */
  static loadTokensList() {
    const { availableTokens, network, walletAddress } = store.getState();

    if (network !== 'public') return Promise.resolve();

    const availableTokensAddresses = availableTokens
      .filter(token => token.symbol !== 'XDC')
      .map(token => token.contractAddress);

    return fetch(
      `https://api.ethplorer.io/getAddressInfo/${walletAddress}?apiKey=freekey`,
    )
      .then(response => response.json())
      .then(data => {
        if (!data.tokens) {
          return Promise.resolve();
        }

        return data.tokens
          .filter(
            token =>
              !availableTokensAddresses.includes(token.tokenInfo.address),
          )
          .forEach(token => {
            store.dispatch({
              type: ADD_TOKEN,
              token: {
                contractAddress: token.tokenInfo.address,
                decimals: parseInt(token.tokenInfo.decimals, 10),
                name: token.tokenInfo.name,
                symbol: token.tokenInfo.symbol,
              },
            });
          });
      });
  }

  /**
   * Fetch a list of transactions for the user's wallet concerning the given token
   *
   * @param {Object} token
   */
  static getTransactions({ contractAddress, decimals, symbol, network, type }) {
    if (network === 'public') {
      if(type == 'ETH') {
        return this.getETHTransactions(contractAddress, decimals, symbol);
      } else {
        return this.getERC20Transactions(contractAddress, decimals, symbol);
      }
    } else {
      if (type === 'XDC (Testnet)' || type.includes('(Testnet)')) {
        return this.getTestnetTransactions(contractAddress, decimals, symbol);
      } else {
        return this.getMainnetTransactions(contractAddress, decimals, symbol);
      }
    }
  }

  /**
   * Fetch a list of a given token transactions for the user's wallet
   *
   * @param {String} contractAddress
   */
  static async getTestnetTransactions(contractAddress, decimals, symbol) {
    let { walletAddress } = store.getState();

    // const walletAddress = "0x3ea0a3555f9b1de983572bff6444aeb1899ec58c";
    if(walletAddress.substring(0, 2) === '0x') {
      walletAddress = 'xdc' + walletAddress.substring(2)
    }

    let url;
    if(contractAddress) {
      if(contractAddress.substring(0, 2) === '0x') {
        contractAddress = 'xdc' + contractAddress.substring(2)
      }
      url = `https://explorer.apothem.network/publicAPI?module=account&action=tokentx&address=${walletAddress}&contractaddress=${contractAddress}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`;
    } else {
      url = `https://explorer.apothem.network/publicAPI?module=account&action=txlist&address=${walletAddress}`;
    }
    
    console.log('11111111111111::', url);
    return fetch(
      url,
    )
      .then(response => response.json())
      .then(data => {
        console.log('apothem transactions', data)
        if (data.message !== 'OK') {
          return [];
        }
        return data.result.map(t => ({
          from: t.from,
          to: t.to,
          timestamp: t.timestamp.toString(),
          transactionHash: t.hash,
          value: (parseInt(t.value, 10)).toFixed(2),
          symbol: symbol
        }));
      })
      .catch(err => console.log('errrr', err));
  }


  static async getERC20Transactions(contractAddress, decimals, symbol) {
    let { walletAddress } = store.getState();

    return fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${walletAddress}&contractaddress=${contractAddress}&startblock=0&endblock=999999999&sort=asc&apikey=${etherscanAPI}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log('ERC20 Trans@@@@@@@@@@@', data, contractAddress, decimals, symbol)
        if (data.message !== 'OK') {
          return [];
        }

        return data.result.map(t => ({
          from: t.from,
          to: t.to,
          timestamp: t.timeStamp,
          transactionHash: t.hash,
          value: (parseInt(t.value, 10) / Math.pow(10, decimals)).toFixed(2),
          symbol: symbol
        }));

      })
      .catch(err => console.log('errrr', err));
  }

  static async getETHTransactions(contractAddress, decimals, symbol) {
    let { walletAddress } = store.getState();

    return fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&sort=asc&apikey=${etherscanAPI}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log('@@@@@@@@@@@', data)
        if (data.message !== 'OK') {
          return [];
        }

        return data.result.map(t => ({
          from: t.from,
          to: t.to,
          timestamp: t.timeStamp,
          transactionHash: t.hash,
          value: (parseInt(t.value, 10) / Math.pow(10, decimals)).toFixed(2),
          symbol: symbol
        }));

      })
      .catch(err => console.log('errrr', err));
  }

  static async getMainnetTransactions(contractAddress, decimals, symbol) {
    let { walletAddress } = store.getState();
    if(walletAddress.substring(0, 2) === '0x') {
      walletAddress = 'xdc' + walletAddress.substring(2)
    }
    
    let url;
    if(contractAddress) {
      if(contractAddress.substring(0, 2) === '0x') {
        contractAddress = 'xdc' + contractAddress.substring(2)
      }

      url = `https://explorer.xinfin.network/publicAPI?module=account&action=tokentx&address=${walletAddress}&contractaddress=${contractAddress}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`;
    } else {
      url = `https://explorer.xinfin.network/publicAPI?module=account&action=txlist&address=${walletAddress}`;
    }

    console.log('222222222mainnet:', url)
    return fetch(
      url,
    )
      .then(response => response.json())
      .then(data => {
        console.log('xinfin transactions', data)
        if (data.message !== 'OK') {
          return [];
        }

        return data.result.map(t => ({
          from: t.from,
          to: t.to,
          timestamp: t.timestamp.toString(),
          transactionHash: t.hash,
          value: (parseInt(t.value, 10)).toFixed(2),
          symbol: symbol
        }));

      })
      .catch(err => console.log('errrr', err));
  }

  /**
   * Get the user's wallet balance of a given token
   *
   * @param {Object} token
   */
  static getBalance({ contractAddress, symbol, decimals, type, ticker }) {
    const { walletAddress, privateKey, currentCurrency } = store.getState();
    if (type === 'XDC (Testnet)' || type === 'XDC (Mainnet)' || type === 'ETH') {
      return this.getEthBalance(currentCurrency, type, symbol, ticker, decimals);
    } else {
      return this.getERC20Balance(contractAddress, decimals, currentCurrency, type, symbol, ticker);
    }
  }

  static getEthBalance(currentCurrency, type, symbol, ticker, decimals) {
    const { walletAddress } = store.getState();
    let web3;
    if (type === 'XDC (Mainnet)' || type.includes('(Mainnet)')) {
      web3 = new Web3(new Web3.providers.HttpProvider(
        mainnetNetwork,
      ));
    } else if(type === 'ETH') { 
      web3 = new Web3(new Web3.providers.HttpProvider(
        infureNetwork,
      ));
    } else { 
      web3 = new Web3(new Web3.providers.HttpProvider(
        testnetNetwork,
      ));
    }

    return new Promise((resolve, reject) => {
      // get ether balance
      web3.eth.getBalance(walletAddress, function (e, weiBalance) {
        
        if (e) {
          let balanceData = {};
          balanceData = {
            'balance': 0,
            'usdBalance': 0,
            'marketPrice': 0,
            "status": false,
            "network": web3.currentProvider.host
          };
          resolve(balanceData);
          // reject(e);
        }

        
        let balanceData = {};
        const balance = weiBalance / Math.pow(10, decimals);
        // console.log('111111111', symbol, walletAddress, weiBalance, e)
        
        let usdBalance = null;
        let marketPrice = null;
        const fetchUrl = `https://api2.alphaex.net/common/xdc_wallet_live_price?ticker=${ticker}&&nativeCurr=` + currentCurrency;
        // console.log('111111111', symbol, fetchUrl, ticker)
        // if(ticker != '' && ticker != null && ticker > 0) {
        if(false) {  
          fetch(fetchUrl)
            .then(res => res.json())
            .then(function (response) {
              if(response.statusCode == 200) {
                marketPrice = 0;
                if(response.message > 0) {
                  usdBalance = response.message * balance;
                } else {
                  usdBalance = 0;
                }
                
                // console.log('22222222', symbol, ticker, response.message, usdBalance, balance)
                balanceData = {
                  'balance': balance,
                  'usdBalance': usdBalance,
                  'marketPrice': marketPrice,
                  "network": web3.currentProvider.host
                };
              } else {
                balanceData = {
                  'balance': balance,
                  'usdBalance': 0,
                  'marketPrice': null,
                  "network": web3.currentProvider.host
                };
              }
              resolve(balanceData);
            })
            .catch(error => {
              console.log('Error testnet:', error);
              let balanceData = {};
              balanceData = {
                'balance': balance,
                'usdBalance': 0,
                'marketPrice': 0,
                "status": false,
                "network": web3.currentProvider.host
              };
              resolve(balanceData);
            });
        } else {
          let balanceData = {
            'balance': balance,
            'usdBalance': 0,
            'marketPrice': null,
            "network": web3.currentProvider.host
          };
          resolve(balanceData);
        }

        AnalyticsUtils.trackEvent('Get ETH balance', {
          balance,
        });
      });
    });
  }


  /**
   * Get the user's wallet ETH balance
   */
  static getERC20Balance(contractAddress, decimals, currentCurrency, type, symbol, ticker) {

    const { walletAddress, privateKey } = store.getState();
    let web3;
    if (type.includes('(Mainnet)')) {
      web3 = new Web3(new Web3.providers.HttpProvider(
        mainnetNetwork,
      ));
    } else if(type.includes('(Testnet)')) { 
      web3 = new Web3(new Web3.providers.HttpProvider(
        testnetNetwork,
      ));
    } else { 
      web3 = new Web3(new Web3.providers.HttpProvider(
        infureNetwork,
      ));
    }

    return new Promise((resolve, reject) => {
      var MyContract = web3.eth.contract(contractAbi);


      var instancecontract = MyContract.at(contractAddress);
      instancecontract.balanceOf(walletAddress, function (error, weiBalance) {
        if (error) {
          reject(error);
        }
        let balanceData = {};
        const balance = weiBalance / Math.pow(10, decimals);
        let usdBalance = null;
          // console.log('111111111111111111111111111111111111111111111', balance, weiBalance)
        
        const fetchUrl = `https://api2.alphaex.net/common/xdc_wallet_live_price?ticker=${ticker}&&nativeCurr=` + currentCurrency;
        // if(ticker != '' && ticker != null && ticker > 0) {
        if(false) {
            fetch(fetchUrl)
            .then(res => res.json())
            .then(function (response) {
              if(symbol == 'USDT') {
                console.log('22222222222222222222222222222222222222222', balance, response)
              }
              // console.log('#######1', type, symbol, weiBalance, response)
              if(response.statusCode == 200) {
                usdBalance = response.message * balance;
                balanceData = {
                  'balance': balance,
                  'usdBalance': usdBalance,
                  'marketPrice': null,
                  "network": 'Infura'
                };
              } else {
                balanceData = {
                  'balance': balance,
                  'usdBalance': 0,
                  'marketPrice': null,
                  "network": web3.currentProvider.host
                };
              }
              resolve(balanceData);

            })
            .catch(error => {
              console.log('Error erv20:', error)
              balanceData = {
                'balance': 0,
                'usdBalance': 0,
                'marketPrice': null,
                "network": 'Infura'
              };
              resolve(balanceData);
            });
        } else {
          let balanceData = {
            'balance': balance,
            'usdBalance': 0,
            'marketPrice': null,
            "network": web3.currentProvider.host
          };
          resolve(balanceData);
        }

        AnalyticsUtils.trackEvent('Get ETH balance', {
          balance,
        });
      });


    });
  }


  /**
   * Get USD price
   */

  static getUSDPrice(currency) {
    return new Promise((resolve, reject) => {
      fetch(`https://api2.alphaex.net/common/get_estimatme_usdbalance?pair=XDC-${currency}&price=1`)
      .then(res => res.json())
      .then(function (response) {
        resolve(response.data)
      })
      .catch(error => {
        console.log('Error USD Price:', error);
        resolve(0);
      });
    });
  }


  /**
   * Get USD price XDCE
   */

  static getCurrentXDCEPrice(currency) {
    return new Promise((resolve, reject) => {
      fetch(`https://api2.alphaex.net/common/xdc_wallet_live_price?ticker=2634&&nativeCurr=` + currency)
      .then(res => res.json())
      .then(function (response) {
        if(response.statusCode == 200) {
          resolve(response.message) 
        }
      });
    });
  }

    /**
   * Get USD price
   */

  static getAllCurrencyPrice(ticker, currency) {
    return new Promise((resolve, reject) => {
      fetch(`https://api2.alphaex.net/common/xdc_wallet_live_price?ticker=${ticker}&&nativeCurr=` + currency)
      .then(res => res.json())
      .then(function (response) {
        if(response.statusCode == 200) {
          if(response.message) {
            resolve(response.message)
          } else {
            resolve(0);
          } 
        }
      });
    });
  }



  /**
   * Send a transaction from the user's wallet
   *
   * @param {Object} token
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendTransaction(
    { contractAddress, symbol, type, decimals, network },
    toAddress,
    amount,
    network_optional,
  ) {
    if (type === 'XDC (Testnet)' || type === 'XDC (Mainnet)' || type === 'ETH') {
      return this.sendMXDCTransaction(toAddress, amount, network || network_optional, type, decimals);
    }
    return this.sendERC20Transaction(contractAddress, decimals, toAddress, amount, network || network_optional);
  }


  /**
   * Send an ERC20 transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendERC20Transaction(contractAddress, decimals, toAddress, amount, network) {

    amount = amount * Math.pow(10, decimals);

    if(toAddress.substring(0, 3) === 'xdc') {
      toAddress = '0x' + toAddress.substring(3)
    }
    const { walletAddress, privateKey } = store.getState();
    const web3 = this.getWeb3Instance(network);

    AnalyticsUtils.trackEvent('Send ERC20 transaction', {
      value: amount,
    });

    return new Promise((resolve, reject) => {
      web3.eth.getGasPrice(function (error, gasPrice) {
        web3.eth.estimateGas({
          to: contractAddress,
          data: web3.eth.contract(contractAbi).
            at(contractAddress)
            .transfer.getData(toAddress, amount, { from: walletAddress })
        }, function (err, gasLimit) {
          web3.eth.getTransactionCount(walletAddress, function (error, data) {
            const txParams = {
              nonce: data,
              chainID: 3,
              gasPrice: "0x170cdc1e00",
              // gasLimit: "0x05c30a",
              gasLimit: gasLimit,
              to: contractAddress,
              data: web3.eth.contract(contractAbi).
                at(contractAddress)
                .transfer.getData(toAddress, amount, { from: walletAddress })
            }
            const tx = new EthereumTx(txParams)
            tx.sign(Buffer.from(privateKey, 'hex'));
            const serializedTx = tx.serialize();
            web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
              if (!err) {
                resolve(hash);
              } else {
                reject(err);
              }
            });

          });
        });
      });
    });
  }


  // Send an ETH(MXDC) transaction to the given address with the given amount

  static sendMXDCTransaction(toAddress, amount, network, type, decimals) {
    if(toAddress.substring(0, 3) === 'xdc') {
      toAddress = '0x' + toAddress.substring(3)
    }

    let { walletAddress } = store.getState();
    const web3 = this.getWeb3Instance(network);

    // if(walletAddress.substring(0,2) === '0x') {
    //   walletAddress = 'xdc' + walletAddress.substring(2)
    // }

    return new Promise((resolve, reject) => {
      web3.eth.getTransactionCount(walletAddress, function (error, data) {
        web3.eth.sendTransaction(
          {
            nounce: data,
            to: toAddress,
            value: amount * Math.pow(10, decimals),
          },
          (error, transaction) => {
            if (error) {
              reject(error);
            }

            resolve(transaction);
          },
        )
      });
    });
  }
}
