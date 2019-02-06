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
  },
  privateKey: {
    paddingHorizontal: 15,
    color: '#9d9d9d',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  warning:{
    paddingHorizontal:20,
    paddingBottom: 20,
    color: "#000",
    textAlign:"center"
  },
});

class PrivateKey extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    privateKey: PropTypes.string.isRequired,
  };

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            hamBurgerPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            onBackPress={() => this.props.navigation.goBack()}
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
            activeTab="home"
            onReceivePress={() => this.props.navigation.navigate('Receive')}
            onHomePress={() => this.props.navigation.navigate('WalletHome')}
            onSendPress={() =>
              this.props.navigation.navigate('Send', {
                onTokenChange: this.onTokenChange,
              })
            }
            ontransactionsPress={() => this.props.navigation.navigate('WalletTransactions')}
          />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  privateKey: state.privateKey,
});

export default connect(mapStateToProps)(PrivateKey);
