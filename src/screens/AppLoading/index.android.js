import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {reduxPersistKey_old} from '../../utils/constants';
import {
  ADD_TOKEN,
  SET_DEFAULT_TOKEN,
  SET_PIN_CODE,
  SET_PRIVATE_KEY,
  SET_WALLET_ADDRESS,
} from '../../config/actionTypes';

class AppLoading extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    walletAddress: PropTypes.string,
  };

  static defaultProps = {
    walletAddress: null,
  };


  async componentDidMount() {
    SplashScreen.hide();
    if (!this.props.walletAddress) {
      await this.migrateWallet();
      await this.migrateFromAsyncStorage();
    }

    if (this.props.walletAddress) {
      // await AsyncStorage.removeItem('persist:xdcwallet')
      console.log('@###@@#@#@', await AsyncStorage.getAllKeys());
      // await this.migrateWallet();
      return this.props.navigation.navigate('PinCode');
    }

    return this.props.navigation.navigate('Welcome');
  }

  migrateWallet = async () => {
    const xyz = await AsyncStorage.getAllKeys();
    const pW = await AsyncStorage.getItem(`persist:${reduxPersistKey_old}`);
    const _pW = JSON.parse(pW);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', _pW);
    if(_pW && _pW !== 'null') {
      let pWWA = _pW.walletAddress;
      let pWPK = _pW.privateKey;
      let pWPass = _pW.pinCode;
      if(pWWA) {
        pWWA = pWWA.split(`"`);
        pWPK = pWPK.split(`"`);
        pWPass = pWPass.split(`"`);
      }
      if (pWWA[1]) {
        this.props.dispatch({
          type: SET_WALLET_ADDRESS,
          walletAddress: pWWA[1],
        });
      }

      if (pWPK[1]) {
        this.props.dispatch({
          type: SET_PRIVATE_KEY,
          privateKey: pWPK[1],
        });
      }

      if (pWPass[1]) {
        this.props.dispatch({
          type: SET_PIN_CODE,
          pinCode: pWPass[1],
        });
      }

    }
  }

  migrateFromAsyncStorage = async () => {
    const keys = [
      '@XDCWALLET:address',
      '@XDCWALLET:availableTokens',
      '@XDCWALLET:defaultToken',
      '@XDCWALLET:pinCode',
      '@XDCWALLET:privateKey',
    ];

    const [
      walletAddress,
      availableTokens,
      selectedToken,
      pinCode,
      privateKey,
    ] = await AsyncStorage.multiGet(keys);

    const xyz = await AsyncStorage.getAllKeys();
    // if (walletAddress[1]) {
    //   this.props.dispatch({
    //     type: SET_WALLET_ADDRESS,
    //     walletAddress: walletAddress[1],
    //   });
    // }

    // if (availableTokens[1]) {
    //   JSON.parse(availableTokens[1])
    //     .slice(2)
    //     .forEach(token => {
    //       this.props.dispatch({
    //         type: ADD_TOKEN,
    //         token,
    //       });
    //     });
    // }

    // if (selectedToken[1]) {
    //   this.props.dispatch({
    //     type: SET_DEFAULT_TOKEN,
    //     token: JSON.parse(selectedToken[1]),
    //   });
    // }

    // if (pinCode[1]) {
    //   this.props.dispatch({
    //     type: SET_PIN_CODE,
    //     pinCode: pinCode[1],
    //   });
    // }

    // if (privateKey[1]) {
    //   this.props.dispatch({
    //     type: SET_PRIVATE_KEY,
    //     privateKey: privateKey[1],
    //   });
    // }

    return AsyncStorage.multiRemove(keys);
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  pinCode: state.pinCode,
  walletAddress: state.walletAddress,
});

export default connect(mapStateToProps)(AppLoading);
