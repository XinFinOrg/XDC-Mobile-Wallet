import React, { Component } from "react";
import {
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Share,
  Clipboard,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import copy from "./Images/ic_copy.png";

import useTheme from './AppStyles';

class ReceiveForm extends Component {
  render() {
    
    const styles = useTheme(this.props.darkTheme);
    
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerInside}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={styles.stackedContainer}>
              <View style={styles.qrcodeContainer}>
                <QRCode
                  color="#090909"
                  value={this.props.walletReceiveAddress}
                  size={150}
                />
              </View>
            </View>
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 20
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 30,
                  height: 40,
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  alignContent: "center",
                  alignItems: "center",
                  elevation: 2
                }}
              >
                <View
                  style={{
                    flex: 0.9,
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 14, paddingVertical: 5, paddingHorizontal: 10 }}>
                    {this.props.walletReceiveAddress}
                  </Text>
                </View>
                <TouchableOpacity underlayColor="transparent" style={{ flex: 0.1 }} onPress={() => {
                  Clipboard.setString(this.props.walletReceiveAddress);
                  Clipboard.getString();
                  ToastAndroid.show('Address copied to the clipboard', ToastAndroid.SHORT);
                }}>
                  <Image source={copy} style={styles.image} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row", display: "none" }}>
              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>{this.props.selectedToken.symbol}</Text>
                <TextInput
                  style={{ fontSize: 24, paddingTop: 25 }}
                  placeholder="0.00"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="#000000"
                />
              </View>

              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>{this.props.defaultCurrency}</Text>
                <TextInput
                  style={{ fontSize: 24, paddingTop: 25 }}
                  placeholder="0.00"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="#000000"
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={() => {
                  Share.share({
                    message: this.props.walletReceiveAddress,
                    title: 'My XDCwallet address',
                  });
                }}
                style={styles.createWalletBtn}
              >
                <Text style={styles.createButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}


const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  selectedToken: state.selectedToken,
  defaultCurrency: state.currentCurrency,
  darkTheme: state.darkTheme,
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReceiveForm);
