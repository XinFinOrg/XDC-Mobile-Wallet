import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Header, SecondaryButton } from '../../components';
import Form from './components/Form';
import { ADD_TOKEN, SET_DEFAULT_TOKEN, SET_CURRENT_ROUTE } from '../../config/actionTypes';
import AnalyticsUtils from '../../utils/analytics';
import { DrawerActions } from 'react-navigation';
import Footer from '../UIComponents/Footer/index';
import LinearGradient from "react-native-linear-gradient";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 20,
  },
});

class AddToken extends Component {
  static propTypes = {
    addToken: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    network: PropTypes.string.isRequired,
    setDefaultToken: PropTypes.func.isRequired,
  };

  state = {
    contractAddress: '',
    decimals: '',
    name: '',
    symbol: '',
    network: this.props.network,
  };

  onBarCodeRead = contractAddress => {
    AnalyticsUtils.trackEvent('Read ERC20 contract QR code', {
      contractAddress,
    });

    this.setState(
      {
        contractAddress,
      },
      () => {
        if (this.props.network !== 'public') return;

        fetch(
          `https://api.ethplorer.io/getTokenInfo/${contractAddress}?apiKey=freekey`,
        )
          .then(response => response.json())
          .then(data => {
            this.setState({
              name: data.name || '',
              symbol: data.symbol || '',
              decimals: data.decimals ? data.decimals.toString() : '',
              network: data.network || '',
            });
          });
      },
    );
  };

  onCameraPress = () => {
    this.props.navigation.navigate('Camera', {
      onBarCodeRead: this.onBarCodeRead,
    });
  };

  addressIsValid = () =>
    /^0x([A-Fa-f0-9]{40})$/.test(this.state.contractAddress);

  addToken = () => {
    let type;
    if(this.state.network == 'private') {
      type = '(Testnet)';
    } else if(this.state.network == 'mainnet') {
      type = '(Mainnet)';
    } else {
      type = this.state.symbol;
    }
    const token = {
      contractAddress: this.state.contractAddress,
      decimals: parseInt(this.state.decimals, 10),
      name: this.state.name,
      tName: this.state.name,
      symbol: this.state.symbol,
      currencySymbol: 'USD',
      network: this.state.network,
      type: type,
    };

    this.props.addToken(token);
    this.props.setDefaultToken(token);
    this.props.setRoute('WalletHome');
    this.props.navigation.navigate('WalletHome');
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
              onBackPress={() => this.onReceivePress()}
              title="Add New Token"
            />
          </LinearGradient>
          <Form
            amount={this.state.amount}
            contractAddress={this.state.contractAddress}
            decimals={this.state.decimals}
            name={this.state.name}
            tName={this.state.name}
            onContractAddressChange={contractAddress =>
              this.setState({ contractAddress })
            }
            onDecimalsChange={decimals => this.setState({ decimals })}
            onNameChange={name => this.setState({ name })}
            onSymbolChange={symbol => this.setState({ symbol })}
            onCameraPress={this.onCameraPress}
            onNetworkChange={network => {
              this.setState({ network })}}
            symbol={this.state.symbol}
            network={this.state.network}
          />
          <View style={styles.buttonContainer}>
            <SecondaryButton
              onPress={this.addToken}
              disabled={
                !this.addressIsValid() ||
                this.state.decimals === '' ||
                this.state.symbol.trim() === ''
              }
              text="Add"
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
  network: state.network,
});

const mapDispatchToProps = dispatch => ({
  addToken: token => dispatch({ type: ADD_TOKEN, token }),
  setDefaultToken: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddToken);
