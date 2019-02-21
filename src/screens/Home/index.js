import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  GradientBackground,
  PrimaryButton,
  SecondaryButton,
} from '../../components';
import logo from './images/logo.png';

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>
            {/* <Image source={logo} style={styles.logo} resizeMode="contain" /> */}
            <Text style={styles.logoText}>XDC Wallet</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <PrimaryButton
              onPress={() => this.props.navigation.navigate('CreateWallet')}
              text="Create wallet"
            />
            <SecondaryButton
              onPress={() =>
                this.props.navigation.navigate('CreateWallet', {
                  recoverMode: true,
                })
              }
              text="Recover wallet"
            />
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: '65%',
  },
  logoText: {
    width: '90%',
    color: '#254a81',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
});

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

export default connect(mapStateToProps)(Home);
