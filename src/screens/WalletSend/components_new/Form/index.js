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
import arrowIcon from "./images/arrow.png";
import { TextField } from "react-native-material-textfield";

export default class Form extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerInside}>
          <ScrollView>
            <Text style={styles.fromText}>From</Text>
            <TextInput
              style={{ fontSize: 24 }}
              placeholder="My XDC Wallet"
              placeholderTextColor="#000000"
              underlineColorAndroid="#000000"
            />
            <Text style={styles.fromText}>To</Text>
            <TextInput
              style={{ fontSize: 24 }}
              placeholder="Enter XDC address"
              placeholderTextColor="#000000"
              underlineColorAndroid="#000000"
            />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>XDC</Text>
                <TextInput
                  style={{ fontSize: 24 }}
                  placeholder="0"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="#000000"
                />
                <Text style={styles.errorText}>Insuffiecient space</Text>
              </View>

              <View style={{ flex: 0.5, flexDirection: "column" }}>
                <Text style={styles.fromText}>USD</Text>
                <TextInput
                  style={{ fontSize: 24 }}
                  placeholder="0.00"
                  placeholderTextColor="#000000"
                  underlineColorAndroid="#000000"
                />
              </View>
            </View>
            <Text style={{ fontSize: 20 }}>Fee</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ flex: 0.5, fontSize: 24 }}>Regular</Text>
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
              style={{ fontSize: 24 }}
              placeholder="1+ hour"
              placeholderTextColor="#000000"
              underlineColorAndroid="#000000"
            />
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.continuebuttonText}>CONTINUE</Text>
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
    fontSize: 20,
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
    fontSize: 24,
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
