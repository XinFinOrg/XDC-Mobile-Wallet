import React, { Component } from 'react';
import { AppState, BackHandler, Alert, SafeAreaView, StyleSheet, View, ScrollView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Text, Header } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal'
import {
  Balances,
  BalanceRow,
  CallToAction,
  TransactionsList,
} from './components';
import Footer from '../UIComponents/Footer/index';
import { SET_CALL_TO_ACTION_DISMISSED, SET_CURRENT_ROUTE, IS_KEY_EXPORTED } from '../../config/actionTypes';
import WalletUtils from '../../utils/wallet';
import { relative } from 'path';
import { DrawerActions, StackActions, withNavigationFocus } from 'react-navigation';

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
  ModalContainer: {
    backgroundColor: 'transparent',
    padding: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    backgroundColor: '#fff',
    padding: 20,
  },
  warning:{
    paddingHorizontal:20,
    paddingBottom: 20,
    color: "#000",
    textAlign:"center",
    fontFamily: 'Roboto',
  },
  ModalItem: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    fontFamily: 'Roboto',
  },
  ModalItemTitle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  ModalClose: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ModalCloseButton: {
    textAlign: 'center',
    paddingVertical: 5,
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Roboto',
  }
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
    isModalVisible: this.props.isKeyExported,
  };

  componentDidMount() {
    this.addEventListeners();
    this.onRefresh();
    this.loadTokensList();
  }


  handleBackButton = () => {
    const length = this.props.navigation;  
    if(this.props.currentRoute === 'Wallet') { 
        return true;
    } else {
      this.props.setRoute('WalletHome');
      this.props.navigation.navigate('WalletHome')
      return true;
    }
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
    // this.fetchTransactions();
  };

  handleAppStateChange = nextAppState => {
    const currentState = this.state.appState;
    this.setState({ appState: nextAppState });
    const stackId = this.props.navigation.state.key.split('-')[2];
    if (currentState === 'background' && nextAppState === 'active') {
      this.props.navigation.navigate('PinCode', {
        stackId: stackId
      });
    }
  };

  addEventListeners = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };

  removeEventListeners = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };


  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken,
    );
+
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

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
    this.props.exportKey();
  }
  
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
          {this.props.currentRoute === 'WalletHome' || this.props.currentRoute === 'Wallet' || this.props.currentRoute === 'Home' ?
            
            <ScrollView 
              style={styles.topContainer}>
              <Balances navigation={this.props.navigation} currentBalance={this.state.currentBalance} />
            </ScrollView>

          : null}
          
          <Modal 
            onBackdropPress={() => this.toggleModal(null)}
            isVisible={!this.state.isModalVisible} 
            style={styles.ModalContainer}>
              <View style={styles.ModalView}>
                <Text style={styles.warning}>XDC Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. So store your private key at safe place by going to Export Private Key menu.</Text>
                <LinearGradient
                  colors={['#254a81', '#254a81']}
                  locations={[0, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ModalClose}
                >
                  <TouchableHighlight
                    activeOpacity={0.8}
                    onPress={() => this.toggleModal(null)}
                  >
                    <View>
                      <Text style={styles.ModalCloseButton}>Close</Text>
                    </View>
                  </TouchableHighlight>
                </LinearGradient>
              </View>
          </Modal>
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
  callToActionDismissed: state.callToActionDismissed,
  selectedToken: state.selectedToken,
  walletAddress: state.walletAddress,
  currentRoute: state.currentRoute,
  isKeyExported: state.isKeyExported,
});

const mapDispatchToProps = dispatch => ({
  dismissCallToAction: () => dispatch({ type: SET_CALL_TO_ACTION_DISMISSED }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
  exportKey: () => dispatch({ type: IS_KEY_EXPORTED }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WalletHome);
