import React, { Component } from 'react';
import { SafeAreaView, Share, StyleSheet, View } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
} from '../../components';
import Footer from '../UIComponents/Footer/';
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
  privateKey: {
    paddingHorizontal: 15,
    color: '#9d9d9d',
    textAlign: 'center',
    fontFamily: 'Roboto',
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

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            hamBurgerPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            onBackPress={() => this.goBack()}
            title="Private key"
          />
          <View>
          <Text style={styles.warning}>XDC Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. So store your private key at safe place.</Text>
            <Text style={styles.privateKeyTitle}>Private key</Text>
            <Text style={styles.privateKey}>{this.props.privateKey}</Text>
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
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateKey);
