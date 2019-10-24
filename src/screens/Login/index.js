import React, { Component } from "react";
import LinearGradient from "react-native-linear-gradient";
import { TextField } from "react-native-material-textfield";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import logoicon from "../Register/images/Logo111.png";
import eye from "../Register/images/eye.png";

export default class Login extends Component {
  render() {
    return (
      <LinearGradient colors={["#359ff8", "#325efd"]} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.icon} resizeMode="contain" source={logoicon} />
        </View>

        <View style={styles.textBoxBtnHolder}>
          <TextField
            baseColor="#ffff"
            tintColor="#ffff"
            label="Email"
            textColor="#ffff"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            autoCorrect={false}
          />
        </View>

        <View style={styles.textBoxBtnHolder}>
          <TextField
            baseColor="#ffff"
            tintColor="#ffff"
            label="Password"
            textColor="#ffff"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
            secureTextEntry={true}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn}>
            <Image source={eye} style={styles.btnImage} />
          </TouchableOpacity>
        </View>
        <Text style={styles.forgotText}>Forgot Password</Text>

        <View style={styles.loginButtonsContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.loginButton}>
            <Text style={styles.loginbuttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.registerhereContainer}>
            <Text style={styles.donthaveAccountText}>
              Already have an Account?{" "}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={this.login}>
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 70,
    flex: 1
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center"
  },

  icon: {
    width: 200,
    height: 200
  },

  textBoxBtnHolder: {
    position: "relative",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 30
  },

  visibilityBtn: {
    position: "absolute",
    right: 25,
    bottom: 2,
    height: 40,
    width: 35,
    padding: 5
  },

  btnImage: {
    resizeMode: "contain",
    height: "100%",
    width: "100%"
  },

  forgotText: {
    textAlign: "right",
    right: 28,
    fontSize: 15,
    color: "#ffffff"
  },

  loginButtonsContainer: {
    paddingTop: 40,
    width: "100%",
    paddingLeft: 50,
    display: "flex",
    justifyContent: "center"
  },

  loginButton: {
    height: 40,
    width: 300,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#359cf8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  loginbuttonText: {
    fontFamily: "montserratregular",
    fontSize: 25,
    color: "#ffffff"
  },

  registerhereContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    top: 10,
    left: 50
  },

  donthaveAccountText: {
    fontSize: 15,
    color: "#ffffff"
  },

  registerText: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: "bold"
  }
});
