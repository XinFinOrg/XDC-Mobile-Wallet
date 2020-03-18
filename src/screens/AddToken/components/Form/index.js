import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Picker
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PropTypes from 'prop-types';
import { Text } from '../../../../components';
import cameraIcon from './images/camera.png';

import useTheme from './AppStyles';

export default class Form extends Component {
  static propTypes = {
    contractAddress: PropTypes.string.isRequired,
    decimals: PropTypes.string.isRequired,
    ticker: PropTypes.string,
    name: PropTypes.string.isRequired,
    tName: PropTypes.string.isRequired,
    onCameraPress: PropTypes.func.isRequired,
    onContractAddressChange: PropTypes.func.isRequired,
    onDecimalsChange: PropTypes.func.isRequired,
    onTickerChange: PropTypes.func,
    onNameChange: PropTypes.func.isRequired,
    onSymbolChange: PropTypes.func.isRequired,
    onNetworkChange: PropTypes.func.isRequired,
    symbol: PropTypes.string.isRequired,
    network: PropTypes.string.isRequired,
  };

  state = {
    language: 'default',
  }

  render() {
    const {
      contractAddress,
      decimals,
      ticker,
      name,
      tName,
      onCameraPress,
      onContractAddressChange,
      onDecimalsChange,
      onTickerChange,
      onNameChange,
      onSymbolChange,
      onNetworkChange,
      symbol,
      network,
      darkTheme,
    } = this.props;
    
    const styles = useTheme(darkTheme);

    const ScrollContainer =
      Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;

    return (
      <ScrollContainer
        contentContainerStyle={{
          flex: Platform.OS === 'ios' ? 1 : null,
          justifyContent: 'center',
        }}
      >
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Contract address</Text>
          <View style={styles.formInputRow}>
            <TextInput
              autoCorrect={false}
              onChangeText={onContractAddressChange}
              onSubmitEditing={() => {
                this.nameInput.focus();
              }}
              placeholder="0x..."
              placeholderTextColor="#9d9d9d"
              ref={input => {
                this.addressInput = input;
              }}
              returnKeyType="next"
              selectionColor="#4D00FF"
              style={styles.formInput}
              underlineColorAndroid="transparent"
              value={contractAddress}
            />
            <TouchableOpacity underlayColor="transparent" onPress={onCameraPress}>
              <Image source={cameraIcon} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Name</Text>
          <View style={styles.formInputRow}>
            <TextInput
              autoCorrect={false}
              onChangeText={onNameChange}
              onSubmitEditing={() => {
                this.symbolInput.focus();
              }}
              placeholder="My token"
              placeholderTextColor="#9d9d9d"
              ref={input => {
                this.nameInput = input;
              }}
              returnKeyType="next"
              selectionColor="#4D00FF"
              style={styles.formInput}
              underlineColorAndroid="transparent"
              value={name}
            />
          </View>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Symbol</Text>
          <View style={styles.formInputRow}>
            <TextInput
              autoCorrect={false}
              onChangeText={onSymbolChange}
              onSubmitEditing={() => {
                this.decimalsInput.focus();
              }}
              placeholder="XDC"
              placeholderTextColor="#9d9d9d"
              ref={input => {
                this.symbolInput = input;
              }}
              returnKeyType="next"
              selectionColor="#4D00FF"
              style={styles.formInput}
              underlineColorAndroid="transparent"
              value={symbol}
            />
          </View>
        </View>
        <View style={styles.formElement}>
          <Text style={styles.formLabel}>Decimals</Text>
          <View style={styles.formInputRow}>
            <TextInput
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={onDecimalsChange}
              placeholder="18"
              placeholderTextColor="#9d9d9d"
              ref={input => {
                this.decimalsInput = input;
              }}
              returnKeyType="done"
              selectionColor="#4D00FF"
              style={styles.formInput}
              underlineColorAndroid="transparent"
              value={decimals}
            />
          </View>
        </View>

        {/* <View style={styles.formElement}>
          <Text style={styles.formLabel}>Ticker ID</Text>
          <View style={styles.formInputRow}>
            <TextInput
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={onTickerChange}
              placeholder="Enter Ticker ID"
              placeholderTextColor="#9d9d9d"
              ref={input => {
                this.decimalsInput = input;
              }}
              returnKeyType="done"
              selectionColor="#4D00FF"
              style={styles.formInput}
              underlineColorAndroid="transparent"
              value={ticker}
            />
          </View>
        </View> */}

        <View style={styles.formElement}>
          <Text style={styles.formInputNetwork}>Select Network</Text>
          <Picker
            selectedValue={network}
            style={styles.formInput }
            onValueChange={onNetworkChange}>
            <Picker.Item label="XinFin Mainnet Network" value="mainnet" />
            <Picker.Item label="XinFin Testnet Network" value="private" />
            {/* <Picker.Item label="Ethereum Mainnet Network" value="public" /> */}
          </Picker>
        </View>
      </ScrollContainer>
    );
  }
}
