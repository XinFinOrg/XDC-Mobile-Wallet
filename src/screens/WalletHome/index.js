import React, { Component } from 'react';
import { AppState, Alert, SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Text, Header } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import {
  Balances,
  BalanceRow,
  CallToAction,
  TransactionsList,
} from './components';
import Footer from '../UIComponents/Footer/index';
import { SET_CALL_TO_ACTION_DISMISSED } from '../../config/actionTypes';
import WalletUtils from '../../utils/wallet';
import { relative } from 'path';
import { DrawerActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    paddingBottom: 0,
  },
  gradientHeaderWrapper: {
    height: 150,
    position: 'relative',
  },
  gradientHeader: {
    width: '100%',
    height: 130,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  gradientHeaderShadow: {
    position: 'absolute',
    width: '92%',
    marginLeft: '4%',
    bottom: 10,   
    height: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  gradientHeaderShadowTwo: {
    position: 'absolute',
    width: '86%',
    marginLeft: '7%',
    bottom: 0,   
    height: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  coinName: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 18,
    letterSpacing: 3,
    paddingVertical: 15,
    paddingTop: 20,
    textAlign: 'center',
  },
  bannerContainer: {
    backgroundColor: '#ddd',
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bannerText: {
    color: '#254a81',
  },
  listContainer: {
    flex: 1,
  },
});

class WalletHome extends Component {
  static propTypes = {
    callToActionDismissed: PropTypes.bool.isRequired,
    dismissCallToAction: PropTypes.func.isRequired,
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
    currentBalance: {
      'balance': 0,
      'usdBalance': 0,
    },
    appState: AppState.currentState,
    refreshingTransactions: false,
    transactions: [],
  };

  componentDidMount() {
    this.addEventListeners();
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

  componentWillUnmount() {
    this.removeEventListeners();
  }

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

    this.setState({
      refreshingTransactions: false,
      transactions,
    });
  };

  loadTokensList = () => {
    WalletUtils.loadTokensList();
  };

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <Header
            hamBurgerPress={() => {
              this.props.navigation.dispatch(DrawerActions.openDrawer())
            }}
            title="Dashboard"
          />
          <ScrollView style={styles.topContainer}>
            <Balances currentBalance={this.state.currentBalance} />
          </ScrollView>
          {/* <View style={styles.topContainer}>
            <View style={styles.gradientHeaderWrapper}>
              <LinearGradient
                colors={['#254a81', '#254a81']}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientHeader}
              >
                <Text style={styles.coinName} letterSpacing={2}>
                  {this.props.selectedToken.name}
                </Text>
                <BalanceRow
                  currentBalance={this.state.currentBalance}
                  onTokenChangeIconPress={() =>
                    // this.props.navigation.navigate('TokenPicker')
                    this.props.navigation.dispatch(DrawerActions.openDrawer())
                  }
                  onSettingsIconPress={() =>
                    this.props.navigation.navigate('Settings')
                  }
                />
              </LinearGradient>
            </View>
            {!this.props.callToActionDismissed && (
              <CallToAction
                onDismiss={this.onCallToActionDismiss}
                onPress={this.onCallToActionPress}
              />
            )}
            <View style={styles.bannerContainer}>
              <Text style={styles.bannerText}>
                Showing recent {this.props.selectedToken.name} transactions
              </Text>
            </View>
            <View style={styles.listContainer}>
              {!!this.props.walletAddress && (
                <TransactionsList
                  selectedToken={this.props.selectedToken}
                  transactions={this.state.transactions}
                  walletAddress={this.props.walletAddress}
                  onRefresh={this.onRefresh}
                  refreshing={this.state.refreshingTransactions}
                />
              )}
            </View>
          </View> */}
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
  callToActionDismissed: state.callToActionDismissed,
  selectedToken: state.selectedToken,
  walletAddress: state.walletAddress,
});

const mapDispatchToProps = dispatch => ({
  dismissCallToAction: () => dispatch({ type: SET_CALL_TO_ACTION_DISMISSED }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletHome);
