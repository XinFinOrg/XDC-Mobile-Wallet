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
  Linking,
  Share,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import copy from "./Images/ic_copy.png";
export default class ReceiveForm extends Component {
  render() {
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
                <TouchableOpacity style={{ flex: 0.1 }}>
                  <Image source={copy} style={styles.image} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>XDC</Text>
                <TextInput
                  style={{ fontSize: 24, paddingTop: 25 }}
                  placeholder="0.00"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="#000000"
                />
              </View>

              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>USD</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 10,
    backgroundColor: "#ffffff"
  },

  containerInside: {
    flex: 1,
    flexDirection: "row"
  },

  copyContainer: {
    borderRadius: 30,
    flexDirection: "row",
    borderWidth: 2,
    height: 50,
    elevation: 2,
    top: 20,
    borderColor: "rgb(243, 243, 245)",
    backgroundColor: "rgba(53, 156, 248, 0)",
    padding: 13
  },

  fromText: {
    color: "#71869a",
    fontSize: 20,
    top: 20
  },
  copyText: {
    fontSize: 18,
    textAlign: "center"
  },

  image: {
    height: 20,
    width: 15
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
  },
  stackedContainer: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    padding: 10
  },
  qrcodeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: 160,
  },
  walletAddress: {
    // paddingHorizontal: 15,
    color: '#9d9d9d',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  createWalletBtn: {
    height: 40,
    width: '50%',
    alignItems: "center",
    borderRadius: 30,
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
});
