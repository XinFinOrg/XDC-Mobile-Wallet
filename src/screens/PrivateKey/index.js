import React, { Component } from 'react';
import { SafeAreaView, Share, StyleSheet, View, Clipboard, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearGradient from "react-native-linear-gradient";
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
} from '../../components';
import Footer from '../UIComponents/Footer/';
import copyClip from './images/copy-content.png';
import { SET_CURRENT_ROUTE } from '../../config/actionTypes'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
  },
  privateKeyTitle: {
    paddingHorizontal: 15,
    color: '#000',
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  privateKeyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  privateKeyWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%'
  },
  privateKey: {
    paddingHorizontal: 15,
    color: '#9d9d9d',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  rowIcon: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    height: 25,
    width: 25,
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  warning:{
    paddingHorizontal:20,
    paddingBottom: 20,
    color: "#000",
    textAlign:"center",
    fontFamily: 'Roboto',
  },
});

class PrivateKey extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    privateKey: PropTypes.string.isRequired,
  };

  goBack = () => {
    const stackLength = this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state.routes[stackLength].routeName;
    this.props.setRoute(stackRoute)
    this.props.navigation.navigate(stackRoute)
  };

  onReceivePress = () => {
    this.props.setRoute("Receive");
    this.props.navigation.navigate("Receive")
};

onHamBurgerPress = () => {
    this.props.setRoute("Settings");
    this.props.navigation.navigate("Settings")
};

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <LinearGradient
              colors={['#359ff8', '#325efd']}
              locations={[0, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientHeader}
            >
            <Header
              hamBurgerPress={() => this.onHamBurgerPress()}
              onBackPress={() => this.goBack()}
              title="Private Key"
            />
          </LinearGradient>
          <View style={styles.privateKeyWrapper}>
            <Text style={styles.warning}>XDC Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. So store your private key at safe place.</Text>
            <Text style={styles.privateKeyTitle}>Private key</Text>
            <View style={styles.privateKeyWrap}>
              <Text style={styles.privateKey}>{this.props.privateKey}</Text>
              <TouchableOpacity
                underlayColor="transparent" 
                onPress={() => {
                  Clipboard.setString(this.props.privateKey);
                  Clipboard.getString();
                  ToastAndroid.show('Private key copied to the clipboard', ToastAndroid.SHORT);
                }}>
                <Image source={copyClip} style={styles.rowIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <SecondaryButton
              onPress={() => {
                Share.share({
                  message: this.props.privateKey,
                  title: 'My XDCwallet private key',
                });
              }}
              text="Export"
            />
          </View>

          <Footer
            activeTab="WalletHome"
            onReceivePress={() => this.props.navigation.navigate('Receive')}
            onHomePress={() => this.props.navigation.navigate('WalletHome')}
            onSendPress={() =>
              this.props.navigation.navigate('Send', {
                onTokenChange: this.onTokenChange,
              })
            }
            onTransactionsPress={() => this.props.navigation.navigate('WalletTransactions')}
          />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  privateKey: state.privateKey,
});

const mapDispatchToProps = dispatch => ({
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateKey);
