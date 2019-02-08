import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { GradientBackground, Header, SecondaryButton, BalanceRow } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Form from './components/Form';
import AnalyticsUtils from '../../utils/analytics';
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
    const backAction = NavigationActions.back({
      key: null,
    });

    this.props.navigation.dispatch(backAction);
  };

  addressIsValid = () => /^0x([A-Fa-f0-9]{40})$/.test(this.state.address);

  amountIsValid = () => parseFloat(this.state.amount, 10) > 0;

  willFocus = () => this.props.navigation.addListener('willFocus', () => {
    console.log('will focus walletSend')
  });

  componentDidMount() {
    this.willFocus();
  }

  sendTransaction = async () => {
    try {
      this.setState({
        isLoading: true,
      });

      await WalletUtils.sendTransaction(
        this.props.selectedToken,
        this.state.address,
        this.state.amount,
      );

      this.setState(
        {
          isLoading: false,
        },
        () => {
          Alert.alert(
            `Sending ${this.props.selectedToken.symbol}`,
            `You've successfully sent ${this.state.amount} ${
              this.props.selectedToken.symbol
            } to ${this.state.address}`,
            [{ text: 'OK', onPress: () => this.goBack() }],
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
          console.log(error)
          Alert.alert(
            `Sending ${this.props.selectedToken.symbol}`,
            `An error happened during the transaction, please try again later`,
          );
        },
      );
    }
  };

  tokenChange = (val) => {
    this.props.setDefaultToken(token);
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
              onTokenChangeIconPress={() =>
                this.props.navigation.navigate('TokenPicker')
              }
              onSettingsIconPress={() =>
                this.props.navigation.navigate('Settings')
              }
              tokenChange={this.tokenChange}
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
            activeTab="send"
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
  selectedToken: state.selectedToken,
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletSend);
