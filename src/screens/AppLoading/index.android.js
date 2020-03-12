import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {reduxPersistKey_old} from '../../utils/constants';
import {
  SET_PIN_CODE,
  SET_PRIVATE_KEY,
  SET_WALLET_ADDRESS,
  SET_CURRENT_ROUTE,
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
    await AsyncStorage.setItem("UserEmail", 'wallet@xinfin.org');
    if (AsyncStorage.getItem("UserEmail")) {
      this.props.navigation.navigate("Home");
    }
    if (!this.props.walletAddress) {
      await this.migrateWallet();
    }

    if (this.props.walletAddress) {
      // await this.migrateWallet();
      return this.props.navigation.navigate('PinCode');
    }

    return this.props.navigation.navigate('Welcome');
  }

  migrateWallet = async () => {
    const xyz = await AsyncStorage.getAllKeys();
    const pW = await AsyncStorage.getItem(`persist:${reduxPersistKey_old}`);
    const _pW = JSON.parse(pW);
    if(_pW && _pW !== 'null') {
      let pWWA = _pW.walletAddress;
      let pWPK = _pW.privateKey;
      let pWPass = _pW.pinCode;
      if(pWWA) {
        pWWA = pWWA.split(`"`);
        pWPK = pWPK.split(`"`);
        pWPass = pWPass.split(`"`);
      }
      
      this.props.dispatch({
        type: SET_CURRENT_ROUTE,
        currentRoute: 'Welcome'
      });

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

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  pinCode: state.pinCode,
  walletAddress: state.walletAddress,
});

export default connect(mapStateToProps)(AppLoading);
