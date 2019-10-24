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
  Linking
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import copy from "./Images/ic_copy.png";
export default class ReceiveForm extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerInside}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View style={{ alignContent: "center", alignItems: "center" }}>
              <QRCode color="#565e66" size={150} />
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
                  <Text style={{ textAlign: "center", fontSize: 20 }}>
                    0x1310a891f603d431 ... 457f7
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

            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continuebuttonText}>RECEIVE</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 3,
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
  }
});
