import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "./images/Logo111.png";
import LinearGradient from "react-native-linear-gradient";

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <LinearGradient colors={["#359ff8", "#325efd"]} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoIcon} />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            underlayColor="transparent"
            activeOpacity={0.8}
            onPress={() => this.props.navigation.navigate('CreateWallet')}
            style={styles.createWalletBtn}
          >
            <Text style={styles.createButtonText}>CREATE WALLET</Text>
          </TouchableOpacity>

          <TouchableOpacity
            underlayColor="transparent"
            activeOpacity={0.8}
            onPress={() =>
              this.props.navigation.navigate('CreateWallet', {
                recoverMode: true,
              })
            }
            style={styles.recoverWalletBtn}
          >
            <Text style={styles.recoverButtonText}>RECOVER WALLET</Text>
          </TouchableOpacity>
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
  logoContainer: {
    paddingTop: 120,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    width: "100%"
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 50,
    width: "100%"
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
  logoIcon: {
    width: 160,
    height: 160
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
  }
});

const mapStateToProps = state => ({
  walletAddress: state.walletAddress
});

export default connect(mapStateToProps)(Home);
