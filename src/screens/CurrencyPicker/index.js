import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StackActions, NavigationActions, DrawerActions } from 'react-navigation';
import { GradientBackground, Header, Menu } from '../../components';
import { RESET_TOKENS, SET_NETWORK, SET_CURRENCY, SET_CURRENT_ROUTE } from '../../config/actionTypes';
import Footer from '../UIComponents/Footer/';
import LinearGradient from "react-native-linear-gradient";

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

            this.props.setRoute('WalletHome');
            this.props.navigation.dispatch(resetAction);
          },
        },
      ],
      { cancelable: false },
    );
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
              title="Change Currency"
            />
          </LinearGradient>

          <Menu options={this.state.menuOptions} />

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

const mapDispatchToProps = dispatch => ({
  onCurrencyChange: currency => dispatch({ type: SET_CURRENCY, currency }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
});

const mapStateToProps = state => ({
  currencyList: state.currencyList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyPicker);
