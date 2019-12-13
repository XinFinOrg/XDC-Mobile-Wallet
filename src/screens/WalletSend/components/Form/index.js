import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PropTypes from 'prop-types';
import { Text } from '../../../../components';
import cameraIcon from './images/camera.png';
import arrowIcon from './images/arrow.png';

const styles = StyleSheet.create({
  formElement: {
    borderBottomColor: '#3a3a3a',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 15,
  },
  formLabel: {
    color: '#359ff8',
    fontFamily: 'Roboto',
    paddingLeft: Platform.OS === 'ios' ? 0 : 4,
    paddingBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  formInputRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  formInput: {
    color: '#000',
    flex: 1,
    flexGrow: 1,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
  cameraIcon: {
    height: 23,
    width: 30,
  },
  tokenPicker: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tokenSymbol: {
    color: '#000',
    fontSize: 18,
  },
  arrowIcon: {
    height: 10,
    width: 11,
    marginLeft: 10,
  },

  // new styles
  container: {
    flex: 1,
    borderRadius: 3,
    height: "100%",
    width: "100%",
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 10,
    backgroundColor: "#ffffff"
  },
  containerInside: {
    flex: 1,
    flexDirection: "row"
  },

  fromText: {
    color: "#71869a",
    fontSize: 18,
    textAlign: "left"
  },
  errorText: {
    color: "#ff9b22"
  },
  tokenSymbol: {
    color: "#000",
    fontSize: 18
  },
  arrowIcon: {
    height: 10,
    width: 11,
    marginLeft: 10
  },
  continueButton: {
    height: 45,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#359cf8",
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 25
  },
  continuebuttonText: {
    fontFamily: "montserratregular",
    fontSize: 30,
    color: "#ffffff"
  }
});

class Form extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    onAddressChange: PropTypes.func.isRequired,
    onAmountChange: PropTypes.func.isRequired,
    onCameraPress: PropTypes.func.isRequired,
    onTokenChangeIconPress: PropTypes.func.isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const {
      address,
      amount,
      onAddressChange,
      onAmountChange,
      onCameraPress,
      onTokenChangeIconPress,
      selectedToken,
    } = this.props;

    const ScrollContainer =
      Platform.OS === 'ios' ? KeyboardAwareScrollView : ScrollView;

    return (
      <View>
            <Text style={styles.fromText}>From</Text>
            <TextInput
              style={{ fontSize: 16 }}
              placeholder="My XDC Wallet"
              placeholderTextColor="#000000"
              underlineColorAndroid="#000000"
            />
            <Text style={styles.fromText}>To</Text>
            <View style={styles.formInputRow}>
            <TextInput
              autoCorrect={false}
              onChangeText={onAddressChange}
              placeholder={selectedToken.symbol === "XDCE" ? '0x...' : 'xdc..'}
              placeholderTextColor="#9d9d9d"
              onSubmitEditing={() => {
                this.amountInput.focus();
              }}
              ref={input => {
                this.addressInput = input;
              }}
              returnKeyType="next"
              selectionColor="#4D00FF"
              style={styles.formInput}
              underlineColorAndroid="#000000"
              value={address}
            />
            <TouchableOpacity onPress={onCameraPress}>
              <Image source={cameraIcon} style={styles.cameraIcon} />
            </TouchableOpacity>
          </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>XDC</Text>
                <TextInput
                  autoCorrect={false}
                  keyboardType="numeric"
                  onChangeText={onAmountChange}
                  placeholder="1000"
                  placeholderTextColor="#9d9d9d"
                  ref={input => {
                    this.amountInput = input;
                  }}
                  returnKeyType="done"
                  selectionColor="#4D00FF"
                  style={styles.formInput}
                  underlineColorAndroid="#000000"
                  value={amount}
                />
                <Text style={styles.errorText}>Insuffiecient space</Text>
              </View>

              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>USD</Text>
                <TextInput
                  style={{ fontSize: 16 }}
                  placeholder="0.00"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="#000000"
                />
              </View>
            </View>
            <Text style={{ fontSize: 20 }}>Fee</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ flex: 0.5, fontSize: 16 }}>Regular</Text>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  flex: 0.5,
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.tokenSymbol}>0 XDC (US$0.00)</Text>
                <Image source={arrowIcon} style={styles.arrowIcon} />
              </TouchableOpacity>
            </View>
            <TextInput
              style={{ fontSize: 16 }}
              placeholder="1+ hour"
              placeholderTextColor="#000000"
              underlineColorAndroid="#000000"
            />
            
          </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedToken: state.selectedToken,
});

export default connect(mapStateToProps)(Form);
