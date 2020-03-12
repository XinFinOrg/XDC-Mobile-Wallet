import React, { Component } from 'react';
import { AppState, Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Text, Header, BalanceRow } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import {
  TransactionsList,
} from './components';
import Footer from '../UIComponents/Footer/index';
import { SET_CALL_TO_ACTION_DISMISSED, SET_CURRENT_ROUTE } from '../../config/actionTypes';
import WalletUtils from '../../utils/wallet';

import useTheme from './AppStyles';

class WalletTransactions extends Component {
  static propTypes = {
    callToActionDismissed: PropTypes.bool.isRequired,
    dismissCallToAction: PropTypes.func.isRequired,
    onTokenChange: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    walletAddress: PropTypes.string,
  };

  static defaultProps = {
    walletAddress: '',
  };

  state = {
    refreshing: false,
    currentBalance: {
      'balance': 0,
      'usdBalance': 0,
    },
    appState: AppState.currentState,
    refreshingTransactions: false,
    transactions: [],
    transactionsToken: null,
    tokens: '',
  };

  componentDidMount() {
    // this.addEventListeners();
    this.onRefresh();
    this.loadTokensList();
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.walletAddress &&
      this.props.selectedToken !== newProps.selectedToken
    ) {
      this.setState(
        {
          currentBalance: {
            'balance': 0,
            'usdBalance': 0,
          },
          transactions: [],
        },
        () => {
          this.onRefresh();
        },
      );
    }
  }

  // componentWillUnmount() {
  //   this.removeEventListeners();
  // }

  onCallToActionPress = () => {
    this.props.navigation.navigate('Settings');
    this.props.navigation.navigate('PrivateKey');
  };

  onCallToActionDismiss = () => {
    Alert.alert(
      'Backup your wallet',
      "Make sure you've backed up your wallet private key. It can't be recovered if you lose it.",
      [
        { text: 'Ask me later' },
        {
          text: 'OK',
          onPress: async () => {
            this.props.dismissCallToAction();
          },
        },
      ],
    );
  };

  onRefresh = () => {
    this.fetchBalance();
    this.fetchTransactions();
    this.setState({ refreshing: true });
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  handleAppStateChange = nextAppState => {
    const currentState = this.state.appState;

    this.setState({ appState: nextAppState });

    if (currentState === 'background' && nextAppState === 'active') {
      this.props.navigation.navigate('PinCode');
    }
  };

  addEventListeners = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  removeEventListeners = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };

  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken,
    );

    this.setState({
      currentBalance,
    });
  };

  

  fetchTransactions = async () => {
    this.setState({
      refreshingTransactions: true,
    });

    const transactions = await WalletUtils.getTransactions(
      this.props.selectedToken,
    );

    if(transactions.length > 0) {
      if(transactions[0].symbol == this.props.selectedToken.symbol) {
        this.setState({
          refreshingTransactions: false,
          transactions,
          transactionsToken: transactions[0].symbol,
        });
      }
    } else {
      this.setState({
        refreshingTransactions: false,
        transactions
      })
    }
  };

  loadTokensList = () => {
    WalletUtils.loadTokensList();
  };

  tokenChange = (val) => {
    this.props.setDefaultToken(token);
  }

  goBack = () => {
    const stackLength = this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state.routes[stackLength].routeName;
    this.props.setRoute(stackRoute);
    this.props.navigation.navigate(stackRoute);
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
    const styles = useTheme(this.props.darkTheme);

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
              title="Transactions" />
          
            <BalanceRow
              currentBalance={this.state.currentBalance}
              selectedToken={this.props.selectedToken}
            />
          </LinearGradient>

          <View style={styles.containerScrollView}>
            <View
              style={styles.containerScrollViewChild}
            >
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  paddingLeft: 15,
                  paddingRight: 15,
                  position: "absolute",
                  top: -25
                }}
              >
                {!!this.props.walletAddress && (
                  <TransactionsList
                    selectedToken={this.props.selectedToken}
                    transactions={this.state.transactions}
                    transactionsToken={this.state.transactionsToken}
                    walletAddress={this.props.walletAddress}
                    onRefresh={this.onRefresh}
                    refreshing={this.state.refreshingTransactions}
                    darkTheme={this.props.darkTheme}
                  />
                )}

              </View>
            </View>
          </View>

          <Footer
            activeTab="WalletTransactions"
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
  callToActionDismissed: state.callToActionDismissed,
  selectedToken: state.selectedToken,
  walletAddress: state.walletAddress,
  darkTheme: state.darkTheme,
});

const mapDispatchToProps = dispatch => ({
  dismissCallToAction: () => dispatch({ type: SET_CALL_TO_ACTION_DISMISSED }),
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletTransactions);
