import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { TextField } from "react-native-material-textfield";
import { w, h, totalSize } from "../dimension";
import LinearGradient from "react-native-linear-gradient";
import logoicon from "./images/Logo111.png";
import eye from "./images/eye.png";
import Login from "../Login"

export default class Register extends Component {
  login = () => {
    this.props.navigation.navigate("Login");
  };

  register = () =>{
    this.props.navigation.navigate("Home");
  }
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
            label="Name"
            textColor="#ffff"
            returnKeyType="next"
          />
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

        <View style={styles.registerButtonsContainer}>
          <TouchableOpacity activeOpacity={0.8} style={styles.registerButton} onPress={this.register}>
            <Text style={styles.registerbuttonText}>REGISTER</Text>
          </TouchableOpacity>
          <View style={styles.loginhereContainer}>
            <Text style={styles.haveAccountText}>
              Already have an Account?{" "}
            </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={this.login}>
              <Text style={styles.loginText}>Login</Text>
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

  textContainer: {
    width: 300
  },

  textContainerPassword: {
    flex: 1,
    flexDirection: "row",
    width: 300
  },

  textBoxBtnHolder: {
    position: "relative",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingRight: 30,
    paddingLeft: 30
  },

  textBox: {
    fontSize: 18,
    alignSelf: "stretch",
    height: 45,
    paddingRight: 45,
    paddingLeft: 8,
    paddingVertical: 0
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

  registerButtonsContainer: {
    paddingTop: 40,
    width: "100%",
    paddingLeft: 50,
    display: "flex",
    justifyContent: "center"
  },

  registerButton: {
    height: 40,
    width: 300,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#359cf8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  registerbuttonText: {
    fontFamily: "montserratregular",
    fontSize: 25,
    color: "#ffffff"
  },

  loginhereContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    top: 10,
    left: 50
  },

  haveAccountText: {
    fontSize: 15,
    color: "#ffffff"
  },

  loginText: {
    fontSize: 18,
    color: "#ffffff",
    fontFamily: "bold"
  }
});
