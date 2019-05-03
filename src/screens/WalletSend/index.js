import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { GradientBackground, Header, SecondaryButton, BalanceRow } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Form from './components/Form';
import AnalyticsUtils from '../../utils/analytics';
import { SET_CURRENT_ROUTE } from '../../config/actionTypes';
import WalletUtils from '../../utils/wallet';
import Footer from '../UIComponents/Footer/index';
import { DrawerActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  gradientHeader: {
    backgroundColor: 'coral'
  },
  buttonContainer: {
    paddingHorizontal: 15,
  },
});

class WalletSend extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    onTokenChange: PropTypes.func.isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    address: '',
    amount: '',
    isLoading: false,
    currentBalance: {
      'balance': 0,
      'usdBalance': 0,
    },
  };

  onRefresh = () => {
    this.fetchBalance();
  }

  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken,
    );

    console.log('send>>>>>', currentBalance)
    this.setState({
      currentBalance,
    });
  };

  onBarCodeRead = address => {
    AnalyticsUtils.trackEvent('Read send address QR code');

    this.setState({
      address,
    });
  };

  onCameraPress = () => {
    this.props.navigation.navigate('Camera', {
      onBarCodeRead: this.onBarCodeRead,
    });
  };

  goBack = () => {
    this.setState({
      amount: '',
      address: '',
    });
    const stackLength = this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state.routes[stackLength].routeName;
    this.props.setRoute(stackRoute);
    this.props.navigation.navigate(stackRoute);
  };

  addressIsValid = () => /^0x([A-Fa-f0-9]{40})$/.test(this.state.address);

  amountIsValid = () => parseFloat(this.state.amount, 10) > 0;

  sendTransaction = async () => {
    if(this.state.currentBalance.balance > 0) {
      try {
        this.setState({
          isLoading: true,
        });
        await WalletUtils.sendTransaction(
          this.props.selectedToken,
          this.state.address,
          this.state.amount,
        );

        let walletReceiveAddress = this.state.address;
        if (walletReceiveAddress.substring(0,2) === '0x') {
          walletReceiveAddress = "xdc" + walletReceiveAddress.substring(2);
        }
        
        this.setState(
          {
            isLoading: false,
          },
          () => {
            Alert.alert(
              `Sending ${this.props.selectedToken.symbol}`,
              `You've successfully sent ${this.state.amount} ${
                this.props.selectedToken.symbol
              } to ${walletReceiveAddress}`,
              [
                { 
                  text: 'OK', 
                  onPress: () => {this.goBack()},
                },
              ],
              { cancelable: false },
            );
          },
        );
      } catch (error) {
        this.setState(
          {
            isLoading: false,
          },
          () => {
            console.log(error, error.message);
            let errMsg = null;
            if(error.message.includes('insufficient funds for gas')) {
              errMsg = 'Insufficient ether balance';
            } else if(error.message.includes('insufficient funds')) {
              errMsg = 'Insufficient funds';
            } else {
              errMsg = 'An error happened during the transaction, please try again later';
            }
            Alert.alert(
              `Sending ${this.props.selectedToken.symbol}`,
              `${errMsg} for ${this.props.selectedToken.symbol}`,
              [
                { 
                  text: 'OK', 
                  onPress: () => {this.goBack()},
                },
              ],
              { cancelable: false },
            );
          },
        );
      }
    } else {
      this.setState(
        {
          isLoading: false,
        },
        () => {
          const errMsg = 'Insufficient funds';
          Alert.alert(
            `Sending ${this.props.selectedToken.symbol}`,
            `${errMsg} for ${this.props.selectedToken.symbol}`,
            [
              { 
                text: 'OK', 
                onPress: () => {this.goBack()},
              },
            ],
            { cancelable: false },
          );
        },
      );
    }
  };

  tokenChange = (val) => {
    this.props.setDefaultToken(token);
  }

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps(newProps) {
    if(this.props.selectedToken != newProps.selectedToken) {
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

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <LinearGradient
            colors={['#254a81', '#254a81']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientHeader}
          >

            <Header 
              hamBurgerPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
              onBackPress={() => this.goBack()} 
              title="Send" />

            <BalanceRow
              currentBalance={this.state.currentBalance}
              selectedToken={this.props.selectedToken}
            />
          </LinearGradient>


          <View style={styles.sendForm}>  
            <Form
              address={this.state.address}
              amount={this.state.amount}
              onAddressChange={address => this.setState({ address })}
              onAmountChange={amount => this.setState({ amount })}
              onCameraPress={this.onCameraPress}
              onTokenChangeIconPress={() =>
                this.props.navigation.navigate('TokenPicker')
              }
              selectedToken={this.props.selectedToken}
            />
          </View>
          <View style={styles.buttonContainer}>
            <SecondaryButton
              disabled={!this.addressIsValid() || !this.amountIsValid()}
              isLoading={this.state.isLoading}
              onPress={this.sendTransaction}
              text="Send"
            />
          </View>
          <Footer
            activeTab="Send"
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
  selectedToken: state.selectedToken,
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletSend);
