import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import googleIcon from "./images/google.png";
import logo from "./images/Logo111.png";

import {
  GradientBackground,
  PrimaryButton,
  SecondaryButton
} from "../../components";
import OAuthManager from "react-native-oauth";
import LinearGradient from "react-native-linear-gradient";

const manager = new OAuthManager("XDCWallet");

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  register = () => {
    this.props.navigation.navigate("Register");
  };

  signUp = provider => {
    let config;
    let scopes;

    if (Platform.OS === "ios") {
      config = {
        google: {
          callback_url: `http://localhost/google`,
          client_id:
            "47621642897-0m87j98bjb3gmgqq1vb1sl81fsem9k62.apps.googleusercontent.com",
          client_secret: "8HPFSWc0D0xCk2sjNrYmiV7M"
        }
      };
      if (provider === "google") {
        scopes = "openid+email+profile";
      } else if (provider === "slack") {
        scopes = "read";
      }
    } else if (Platform.OS === "android") {
      config = {
        google: {
          callback_url: `http://localhost/google`,
          client_id:
            "47621642897-0m87j98bjb3gmgqq1vb1sl81fsem9k62.apps.googleusercontent.com",
          client_secret: "8HPFSWc0D0xCk2sjNrYmiV7M"
        },
        slack: {
          callback_url: `http://localhost/slack`,
          client_id: "194201140770.517349407841",
          client_secret: "1710f92423a014e039e44772f50a007d"
        }
      };
      if (provider === "google") {
        scopes = "email";
      } else if (provider === "slack") {
        scopes = "read";
      }
    }

    manager.configure(config);

    const googleUrl = "https://www.googleapis.com/plus/v1/people/me";
    const slackUrl = "https://www.slack.com/api/users.identity";

    if (provider === "google") {
      manager
        .authorize("google", { scopes })
        .then(resp => {
          manager
            .makeRequest("google", googleUrl, resp)
            .then(resp => {
              AsyncStorage.setItem("UserEmail", resp.data.emails[0].value);
              if (AsyncStorage.getItem("UserEmail")) {
                this.props.navigation.navigate("Home");
              }
            })
            .catch(e => console.log(e));
        })
        .catch(err => console.log(err));
    } else if (provider === "slack") {
      manager
        .authorize("slack", { scopes })
        .then(resp => {
          manager
            .makeRequest("slack", slackUrl, resp)
            .then(resp => {
              console.log(resp);
              AsyncStorage.setItem("UserEmail", resp.data.user.email);
              if (AsyncStorage.getItem("UserEmail")) {
                this.props.navigation.navigate("Home");
              }
            })
            .catch(e => console.log(e));
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <LinearGradient colors={["#359ff8", "#325efd"]} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoIcon} />
        </View>

        {/* <View style={styles.loginButtonsContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.loginButton}
            onPress={this.register}
          >
            <Text style={styles.loginbuttonText}>Login</Text>
          </TouchableOpacity>
        </View> */}

        {/* <Text style={styles.continueText}>OR Continue with</Text> */}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            underlayColor="transparent"
            activeOpacity={0.8}
            onPress={() => this.signUp("google")}
            style={styles.signUpBtn}
          >
            <Image source={googleIcon} style={styles.socialIcon} />
            <Text style={styles.buttonText}>Sign Up with Google</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity activeOpacity={0.8} onPress={() => this.signUp('slack')} style={styles.signUpBtn}>
                <Image source={slackIcon} style={styles.socialIcon} />
                <Text style={styles.buttonText}>Sign Up with Slack</Text>
            </TouchableOpacity> */}
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    paddingBottom: 20
  },
  textContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    width: "100%"
  },
  logoContainer: {
    paddingTop: 120,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    width: "100%"
  },
  logo: {
    width: "65%"
  },
  logoText: {
    width: "90%",
    color: "#ffffff",
    fontSize: 50,
    textAlign: "center",
    marginBottom: 100,
    fontFamily: "montserratregular"
  },

  continueText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 20,
    padding: 20
  },

  buttonsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 50,
    width: "100%"
  },

  loginButtonsContainer: {
    paddingHorizontal: 15,
    width: "100%"
  },

  loginButton: {
    height: 60,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#359cf8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  signUpBtn: {
    height: 50,
    alignItems: "center",
    borderRadius: 30,
    fontFamily: "montserratregular",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginVertical: 5,
    marginHorizontal: 15
  },
  logoIcon: {
    // paddingTop: 200,
    width: 160,
    height: 160
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  loginbuttonText: {
    fontFamily: "montserratregular",
    fontSize: 30,
    color: "#ffffff"
  }
});

const mapStateToProps = state => ({
  walletAddress: state.walletAddress
});

export default connect(mapStateToProps)(SignUp);
