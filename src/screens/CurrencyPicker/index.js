import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions, DrawerActions } from 'react-navigation';
import { GradientBackground, Header, Menu } from '../../components';
import { RESET_TOKENS, SET_NETWORK } from '../../config/actionTypes';
import Footer from '../UIComponents/Footer/';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
  },
});

class CurrencyPicker extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    onNetworkChange: PropTypes.func.isRequired,
    resetTokens: PropTypes.func.isRequired,
  };

  menuOptions = this.props.currencyList;

  setNetwork = network => {
    Alert.alert(
      'Change network',
      'Switching to another XDC network will reset your list of custom tokens, are you sure you want to continue?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            this.props.resetTokens();
            this.props.onNetworkChange(network);
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'WalletHome' }),
              ],
            });

            this.props.navigation.dispatch(resetAction);
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    console.log(this.props.currencyList);
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            hamBurgerPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            onBackPress={() => this.props.navigation.goBack()}
            title="Change network"
          />

          <Menu options={this.props.currencyList} />

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

const mapDispatchToProps = dispatch => ({
  onNetworkChange: network => dispatch({ type: SET_NETWORK, network }),
  resetTokens: () => dispatch({ type: RESET_TOKENS }),
});

const mapStateToProps = state => ({
  currencyList: state.currencyList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyPicker);
