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

import useTheme from './AppStyles';


class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    
    const styles = useTheme(this.props.darkTheme);
    
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

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  darkTheme: state.darkTheme,
});

export default connect(mapStateToProps)(Home);
