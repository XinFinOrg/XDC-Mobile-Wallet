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
import {
  Header,
  Text,
} from '../../components';
import LinearGradient from "react-native-linear-gradient";
import AnalyticsUtils from '../../utils/analytics';
import WalletUtils from '../../utils/wallet';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  formElement: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    marginHorizontal: 10
  },
  labelText: {
    fontSize: 20,
    color: '#ffffff',
    fontFamily: 'Roboto',
  },
  formInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  formInput: {
    color: '#fff',
    flex: 1,
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  recoverWalletBtn: {
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    fontFamily: "montserratregular",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  createWalletBtn: {
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 20,
    fontFamily: "montserratregular",
    backgroundColor: "#359cf8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  createButtonText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  recoverButtonText: {
    backgroundColor: 'transparent',
    color: '#359cf8',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  warningContainer:{
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  warning:{
    padding:10,
    paddingVertical: 50,
    color:"#ffffff",
    zIndex: 1,
    fontFamily: 'Roboto',
  },
});

export default class CreateWallet extends Component {
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
    return (
      <LinearGradient colors={["#359ff8", "#325efd"]} style={styles.container}>
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
