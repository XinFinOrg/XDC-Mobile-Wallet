import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions, DrawerActions } from 'react-navigation';
import { GradientBackground, Header, Menu } from '../../components';
import { RESET_TOKENS, SET_NETWORK, SET_CURRENCY } from '../../config/actionTypes';
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
    onCurrencyChange: PropTypes.func.isRequired,
  };

  state = {
    menuOptions: [],
  }

  componentWillMount() {
    const currencyList = this.props.currencyList;
    const menuOptions = [
        ...currencyList
        .map(currency => ({
          title: currency,
          onPress: () => this.setCurrency(currency),
        })),
    ];

    this.setState({
      menuOptions: menuOptions,
    });
  }

  setCurrency = currency => {
    Alert.alert(
      'Change Currency',
      'Are you sure you want to set default currency as '+ currency +'?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            this.props.onCurrencyChange(currency);
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
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            hamBurgerPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
            onBackPress={() => this.props.navigation.goBack()}
            title="Change Currency"
          />

          <Menu options={this.state.menuOptions} />

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
  onCurrencyChange: currency => dispatch({ type: SET_CURRENCY, currency }),
});

const mapStateToProps = state => ({
  currencyList: state.currencyList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyPicker);
