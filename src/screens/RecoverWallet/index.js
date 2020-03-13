import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Header,
  Text,
} from '../../components';
import LinearGradient from "react-native-linear-gradient";
import AnalyticsUtils from '../../utils/analytics';
import WalletUtils from '../../utils/wallet';
import {gradientColors} from '../../utils/constants';

import useTheme from './AppStyles';

class RecoverWallet extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    privateKey: '',
  };

  onBarCodeRead = privateKey => {
    AnalyticsUtils.trackEvent('Read private key QR code');

    this.setState({
      privateKey,
    });
  };

  onCameraPress = () => {
    this.props.navigation.navigate('Camera', {
      onBarCodeRead: this.onBarCodeRead,
    });
  };

  importWallet = async () => {
    try {
      WalletUtils.restoreWallet(this.state.privateKey);
    } catch (error) {
      Alert.alert(
        'Private key',
        'Your private key is invalid. Please try again.',
      );
      return;
    }

    this.props.navigation.navigate('Wallet');
  };

  render() {
    const styles = useTheme(this.props.darkTheme);

    return (
      <LinearGradient colors={this.props.darkTheme ? gradientColors.dark : gradientColors.light} style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Header
            title="Recover wallet"
          />
          <View style={styles.warningContainer}>
            <Text style={styles.warning}>XDC Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. So store your private key at safe place.</Text>
            <View style={styles.formElement}>
              <Text style={styles.labelText}>Private key</Text>
              <View style={styles.formInputRow}>
                <TextInput
                  autoCorrect={false}
                  onChangeText={privateKey => this.setState({ privateKey })}
                  placeholder="0x...(Paste or scan your private key)"
                  placeholderTextColor="#9d9d9d"
                  returnKeyType="done"
                  selectionColor="#4D00FF"
                  style={styles.formInput}
                  underlineColorAndroid="transparent"
                  value={this.state.privateKey}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              underlayColor="transparent"
              activeOpacity={0.8}
              onPress={this.onCameraPress}
              style={styles.createWalletBtn}
            >
              <Text style={styles.createButtonText}>IMPORT VIA QR CODE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              underlayColor="transparent"
              activeOpacity={0.8}
              onPress={this.importWallet}
              disabled={this.state.privateKey === ''}
              style={styles.recoverWalletBtn}
            >
              <Text style={styles.recoverButtonText}>IMPORT WALLET</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}


const mapStateToProps = state => ({
  darkTheme: state.darkTheme,
});

export default connect(
  mapStateToProps,
  null,
)(RecoverWallet);
