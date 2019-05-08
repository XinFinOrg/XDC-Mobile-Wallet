import React, { Component } from 'react';
import { SafeAreaView, Share, StyleSheet, View, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
  BalanceRow
} from '../../components';
import WalletUtils from '../../utils/wallet';
import Footer from '../UIComponents/Footer/index';
import { SET_CURRENT_ROUTE } from '../../config/actionTypes';
import { DrawerActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  containerScrollView: {
    flex: 1,
    justifyContent: 'space-around',
    paddingBottom: 0,
  },
  qrcodeContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingVertical: 5,
    width: 160,
  },
  addressTitle: {
    paddingHorizontal: 15,
    color: '#fff',
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  walletAddress: {
    paddingHorizontal: 15,
    color: '#9d9d9d',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40,
  },
});

class WalletReceive extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    onTokenChange: PropTypes.func.isRequired,
    walletAddress: PropTypes.string.isRequired,
  };

  state = {
    refreshing: false,
    currentBalance: {
      'balance': 0,
      'usdBalance': 0,
    },
  };

  onRefresh = () => {
    this.fetchBalance();
    this.setState({ refreshing: true });
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  }
  
  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken,
    );

    this.setState({
      currentBalance,
    });
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

  goBack = () => {
    const stackLength = this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state.routes[stackLength].routeName;
    this.props.setRoute(stackRoute)
    this.props.navigation.navigate(stackRoute)
  };

  render() {

    let walletReceiveAddress = this.props.walletAddress;
    if (walletReceiveAddress.substring(0,2) === '0x') {
      walletReceiveAddress = "xdc" + walletReceiveAddress.substring(2);
    }
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
              title="Receive" />
          
            <BalanceRow
              currentBalance={this.state.currentBalance}
              selectedToken={this.props.selectedToken}
            />

          </LinearGradient>

          <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              title="Pull to refresh"
            />
          }
          contentContainerStyle={styles.containerScrollView}>
            <View style={styles.qrcodeContainer}>
              <QRCode
                color="#090909"
                value={this.props.walletAddress}
                size={150}
              />
            </View>
            <View>
              <Text style={styles.addressTitle}>Address</Text>
              <Text style={styles.walletAddress}>{walletReceiveAddress}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <SecondaryButton
                onPress={() => {
                  Share.share({
                    message: this.props.walletAddress,
                    title: 'My XDCwallet address',
                  });
                }}
                text="Share"
              />
            </View>
            
          </ScrollView>
          <Footer
              activeTab="Receive"
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
  walletAddress: state.walletAddress,
  selectedToken: state.selectedToken,
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletReceive);
