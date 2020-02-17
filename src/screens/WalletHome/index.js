import React, { Component } from "react";
import {
  AppState,
  BackHandler,
  Alert,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Text, Header } from "../../components";
import LinearGradient from "react-native-linear-gradient";
import {dimHeight} from '../../utils/constants';
import Modal from "react-native-modal";
import Footer from "../UIComponents/Footer/index";
import PieChart from "react-native-pie-chart";
import {MaterialIndicator as DotIndicator} from 'react-native-indicators';
import up from "./components/ExpandableView/Images/ic_up.png";
import down from "./components/ExpandableView/Images/ic_down.png";
import xdc from "./components/ExpandableView/Images/ic_xdc.png";
import xdce from "./components/ExpandableView/Images/ic_xdce.png";
import xdct from "./components/ExpandableView/Images/ic_xdct.png";
import eth from "./components/ExpandableView/Images/ic_eth.png";
import usdt from "./components/ExpandableView/Images/ic_usdt.png";
import usdc from "./components/ExpandableView/Images/ic_usdc.png";

import {
  SET_CALL_TO_ACTION_DISMISSED,
  SET_CURRENT_ROUTE,
  IS_KEY_EXPORTED
} from "../../config/actionTypes";
import WalletUtils from "../../utils/wallet";
import ExpandableView from "./components/ExpandableView";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    paddingTop: 0,
    justifyContent: 'space-between'
  },

  topContainer: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: 100,
    paddingBottom: 0
  },

  gradientHeader: {
    width: "100%",
    height: 250,
  },

  gradientHeaderShadow: {
    position: "absolute",
    width: "92%",
    marginLeft: "4%",
    bottom: 10,
    height: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },

  listContainer: {
    flex: 1
  },
  ModalContainer: {
    backgroundColor: "transparent",
    padding: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  ModalView: {
    backgroundColor: "#fff",
    padding: 20
  },
  LoadingModalView: {
    backgroundColor: 'transparent',
    padding: 20,
  },
  warning: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    color: "#000",
    textAlign: "center",
    fontFamily: "Roboto"
  },
  ModalItem: {
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    fontFamily: "Roboto"
  },
  ModalClose: {
    width: "90%",
    marginLeft: "5%",
    marginTop: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  ModalCloseButton: {
    textAlign: "center",
    paddingVertical: 5,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Roboto"
  },
  gauge: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center"
  },
  CircleShapeViewXDC: {
    width: 10,
    height: 10,
    borderRadius: 150 / 2,
    backgroundColor: "#1bf2ff"
  },
  dashCard: {
    position: 'absolute',
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    marginLeft: '5%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderRadius: 10,
    elevation: 5
  },
  pieSection: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  usdBalText: {
    backgroundColor: "transparent",
    color: "#333",
    fontSize: 18
  },
  tokenDetail: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },
  tokenDetailName: {
    color: "#333333",
    fontSize: 14,
    fontFamily: "bold"
  },
  tokenDetailUsd: {
    color: "#777777",
    fontSize: 12
  },
  stackedCard: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 5,
    bottom: -35,
    left: 20,
    width: '100%',
    height: 70,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  totalChange: {
    padding: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '49%'
  },
  totalChangeTitle: {
    backgroundColor: 'transparent'
  },
  totalChangeNumber: {

  },
  rightBorder: {
    backgroundColor: '#777',
    paddingLeft: 1,
    height: 50
  },
  graphListContainer: {
    
    backgroundColor: "#fff",
    flexDirection: "column",
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    width: '90%',
    height: 60,
    marginLeft: '5%',
    elevation: 2,
  }

});

const initialState = {
  currentBalance: {
    balance: 0,
    usdBalance: 0
  },
  appState: AppState.currentState,
  refreshingTransactions: false,
  refreshing: false,
  transactions: [],
  isModalVisible: false,
  isLoadingModalVisible: false,
  selectedSlice: {
    label: '',
    value: 0
  },
  labelWidth: 0,
  tokenBalances: null,
  tokenBalancesLength: null,
  activityIndicator: true,
  testnetIsDown: null,
  xdcePrice: null,
  usdBalanceArray: {},
};

class WalletHome extends Component {
  static propTypes = {
    callToActionDismissed: PropTypes.bool.isRequired,
    dismissCallToAction: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    walletAddress: PropTypes.string
  };

  static defaultProps = {
    walletAddress: ""
  };

  state = {
    currentBalance: {
      balance: 0,
      usdBalance: 0
    },
    appState: AppState.currentState,
    refreshingTransactions: false,
    refreshing: false,
    transactions: [],
    isModalVisible: this.props.isKeyExported,
    isLoadingModalVisible: false,
    selectedSlice: {
      label: '',
      value: 0
    },
    labelWidth: 0,
    tokenBalances: null,
    tokenBalancesLength: null,
    activityIndicator: true,
    testnetIsDown: null,
    xdcePrice: null,
    usdBalanceArray: {},
  };

  componentDidMount() {
    this.toggleLoadingModal();
    this.addEventListeners();
    // this.loadTokensList();
    if(this.props.tokenList != null) {
      this.props.tokenList.map((token, index) => {
        this.fetchDashboardData(token, index);
      });
      this.getXDCEPrice(this.props.defaultCurrency);
    }
  }

  onRefresh = () => {
    initialState.isModalVisible = true,
    this.setState(initialState);
    this.toggleLoadingModal();
    if(this.props.tokenList != null) {
      this.props.tokenList.map((token, index) => {
        this.fetchDashboardData(token, index);
      });
      this.getXDCEPrice(this.props.defaultCurrency);
    }

    this.setState({ refreshing: true });
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  getXDCEPrice = async (curr) => {
    const xdcePrice = await WalletUtils.getCurrentXDCEPrice(curr);
    this.setState({
      xdcePrice: xdcePrice.toFixed(6)
    })
  }
  willFocus = () => this.props.navigation.addListener('willFocus', () => {
    this.setState(initialState);
    if(this.props.tokenList != null) {
      this.props.tokenList.map((token, index) => {
        this.fetchDashboardData(token, index);
      })
    }
  });

  fetchDashboardData = async (token, index) => {
    const balanceInfo = await WalletUtils.getBalance(token);
    if(balanceInfo.status == false) {
      let network;
      const getNetwork = balanceInfo.network;
      if(getNetwork.includes('apothem')) {
        network = 'Testnet'
      } else if(getNetwork.includes('xinfin')) {
        network = 'Mainnet'
      }
      this.setState({
        activityIndicator: false,
        testnetIsDown: network
      })
    }
    let stateBalance = [];
    let stateBalanceObj = {};

    this.fetchDashboardUSDData(token, index, balanceInfo.balance);
    
    if(this.state.tokenBalances != null) {
      if(this.state.tokenBalancesLength.length < this.props.tokenList.length) {  
        stateBalance = this.state.tokenBalancesLength;
        stateBalance.push({
          [token.tName]: balanceInfo,
        });

        stateBalanceObj = this.state.tokenBalances;
        stateBalanceObj[token.tName] = balanceInfo
      }
    } else {
      stateBalance.push({
        [token.tName]: balanceInfo,
      });

      stateBalanceObj[token.tName] = balanceInfo
    }

    this.setState({
      tokenBalancesLength: stateBalance,
      tokenBalances: stateBalanceObj
    });

    console.log('###########', token.symbol, this.state.tokenBalancesLength.length, this.props.tokenList.length);
    
    if(this.state.tokenBalancesLength.length == this.props.tokenList.length) {
      this.toggleLoadingModal();  
    }

  }

  fetchDashboardUSDData = async (token, index, balanceInfo) => {
    const usdBalanceInfo = await WalletUtils.getAllCurrencyPrice(token.ticker, this.props.defaultCurrency);
    let _usdBalanceArray = {...this.state.usdBalanceArray};
    _usdBalanceArray[token.symbol] = usdBalanceInfo * balanceInfo;
    this.setState({
      usdBalanceArray: _usdBalanceArray
    })
  }

  handleBackButton = async () => {
    if (this.props.currentRoute === "Wallet") {
      BackHandler.exitApp()
      return false;
    } else if (this.props.currentRoute === "WalletHome") {
      BackHandler.exitApp()
      return false;
    } else {
      await this.props.setRoute("WalletHome");
      await this.props.navigation.navigate("WalletHome");
      return true;
    }
  };

  componentWillReceiveProps(newProps) {
    if(newProps.currentRoute == "WalletHome") {
      this.toggleLoadingModal();
      this.setState({
        tokenBalancesLength: null,
        tokenBalances: null,
      }, function() {
        if(newProps.tokenList != null) {
          newProps.tokenList.map((token, index) => {
            // this.willFocus(token)
            this.fetchDashboardData(token);
          });
        }
      });
    }
    
    if (
      newProps.walletAddress &&
      this.props.selectedToken !== newProps.selectedToken
    ) {
      this.setState(
        {
          currentBalance: {
            balance: 0,
            usdBalance: 0
          },
          transactions: []
        },
        () => {
          this.onRefresh();
        }
      );
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  onCallToActionPress = () => {
    this.props.navigation.navigate("Settings");
    this.props.navigation.navigate("PrivateKey");
  };

  onCallToActionDismiss = () => {
    Alert.alert(
      "Backup your wallet",
      "Make sure you've backed up your wallet private key. It can't be recovered if you lose it.",
      [
        { text: "Ask me later" },
        {
          text: "OK",
          onPress: async () => {
            this.props.dismissCallToAction();
          }
        }
      ]
    );
  };


  addArray = (a, b) => {
    a + b
  }

  handleAppStateChange = nextAppState => {

    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@>>>>>>>>>', nextAppState, this.state.appState)
    const currentState = this.state.appState;
    this.setState({ appState: nextAppState });
    const stackId = this.props.navigation.state.key.split("-")[2];
    if (currentState === "background" && nextAppState === "active") {
      this.props.navigation.navigate("PinCode", {
        stackId: stackId
      });
    }
  };

  addEventListeners = () => {
    AppState.addEventListener("change", this.handleAppStateChange);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  };

  removeEventListeners = () => {
    AppState.removeEventListener("change", this.handleAppStateChange);
  };

  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken
    );
    this.setState({
      currentBalance
    });
  };

  fetchTransactions = async () => {
    this.setState({
      refreshingTransactions: true
    });

    const transactions = await WalletUtils.getTransactions(
      this.props.selectedToken
    );

    this.setState({
      refreshingTransactions: false,
      transactions
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
  };

  toggleLoadingModal = () => {
    this.setState({
      isLoadingModalVisible: !this.state.isLoadingModalVisible
    });
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
    const chart_wh = 150;
    let series = [];
    let sliceColor = [];
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    const colors = ['#254A81', '#8e44ad', '#9F0B0B', '#D0D2D1', '#2C7ACB', '#00A77C', '#90FF90', '#8e44ad', '#f39c12', '#16a085', '#2c3e50', '#900090', '#8eFFad', '#f30F12', '#160a85', '#2ce350'];
    // const colors = ['#90FF90', '#8e44ad', '#f39c12', '#16a085', '#2c3e50', '#900090', '#8eFFad', '#f30F12', '#160a85', '#2ce350', '#4D4D4D'];
    let tokenName = {
      'XDC': xdc,
      'XDCE': xdce,
      'XDCT': xdct,
      'ETH': eth,
      'USDT': usdt,
      'USDC': usdc,
    }
    let tokens = null;
    if(this.props.tokenList != null && this.state.tokenBalances != null && this.props.tokenList.length === this.state.tokenBalancesLength.length) {
      tokens = this.props.tokenList.map((token, index) => {
        return(
          <View style={{ flexDirection: "column", paddingBottom: 10 }} key={index}>
            <View style={styles.tokenDetail}>
              <View style={{width: 10, height: 10, borderRadius: 50, backgroundColor: colors[index]}} />
              <Text style={styles.tokenDetailName}>
                {" "}
                {token.tName}
              </Text>
            </View>
            <Text style={styles.tokenDetailUsd}>
              {"     "}
              {/* {this.props.defaultCurrency}: {this.state.tokenBalances[token.tName] ? this.state.tokenBalances[token.tName].usdBalance.toFixed(2) : '...'} */}
              {this.props.defaultCurrency}: {this.state.usdBalanceArray[token.symbol] >= 0 ? this.state.usdBalanceArray[token.symbol].toFixed(2) : '...'}
            </Text>
            <Text style={styles.tokenDetailUsd}>
              {"     "}
              {token.name}: {this.state.tokenBalances[token.tName] ? this.state.tokenBalances[token.tName].balance.toFixed(2) : '...'}
            </Text>
          </View>
        )
        
      });
    }

    let graphList = null;
    if(this.props.tokenList != null && this.state.tokenBalances != null && this.props.tokenList.length === this.state.tokenBalancesLength.length) {
      graphList = this.props.tokenList.map((token, index) => {
        let imageIcon;
        if(token.network === 'mainnet'){
          imageIcon = tokenName['XDC'] 
        } else if(token.network === 'private') {
          imageIcon = tokenName['XDCT'];
        } else {
          imageIcon = tokenName[token.symbol]
        }

        return(
          <View style={styles.graphListContainer} key={index}>
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                flexDirection: "row",
                margin: 10,
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={imageIcon} style={{ height: 25, width: 25 }} />
                </View>
                
                  {token.type ?
                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text style={{ color: "#565e66", fontSize: 18 }}>
                        {token.tName}
                      </Text>
                      <Text style={{ color: "#71869a", fontSize: 12 }}>
                        {token.type}
                      </Text>
                    </View>
                  : <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text style={{ color: "#565e66", fontSize: 18 }}>
                        {token.tName}
                      </Text>
                    </View>}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <View style={{ flexDirection: "column", marginRight: 10 }}>
                  <Text style={{ color: "#565e66", fontSize: 18  }}>
                      {this.props.defaultCurrency}: {this.state.usdBalanceArray[token.symbol] >= 0 ? this.state.usdBalanceArray[token.symbol].toFixed(2) : '...'}
                  </Text>
                  {/* <Text style={{ color: "#15d291", fontSize: 12 }}>
                    {"(+ " + sections.profitincrease + "%)"}
                  </Text> */}
                </View>

                {/* <View>
                  <TouchableOpacity onPress={this.onPress} style={{paddingRight: 10}}>
                    <Image
                      source={up}
                      style={{ height: 10, width: 10 }}
                    />
                  </TouchableOpacity>
                </View> */}
              </View>
            </View>
          </View>
        )
        
      });
    }

    let data = null;
    let balanceInfo = null;
    if(this.props.tokenList != null && this.state.tokenBalances != null) {
      // console.log('1111::', this.state.tokenBalancesLength, this.state.tokenBalancesLength.length);
      if(this.props.tokenList.length === this.state.tokenBalancesLength.length) {
        data = this.state.tokenBalancesLength.map((token, index) => {
          let keyName = this.props.tokenList[index].tName;
          let keySymbol = this.props.tokenList[index].symbol;
          const key = keyName;
          if(this.state.tokenBalances && this.state.usdBalanceArray) {
            if(this.state.tokenBalances[keyName] && this.state.usdBalanceArray[keySymbol]) {
              // balanceInfo += this.state.tokenBalances[keyName].usdBalance;
              // if(this.state.tokenBalances[keyName].usdBalance > 0) {
              //   series.push(this.state.tokenBalances[keyName].usdBalance);
              // } else {
              //   series.push(0.00);
              // }
              balanceInfo += this.state.usdBalanceArray[keySymbol];
              if(this.state.usdBalanceArray[keySymbol] > 0) {
                series.push(this.state.usdBalanceArray[keySymbol]);
              } else {
                series.push(0.00);
              }
              sliceColor.push(colors[index]);
            }
          }
        });
        // add this for stable pie chart
        series.push(0.00);
        if(balanceInfo == 0) {
          series = values;
          sliceColor = colors;
        }
      }
    }

    let sumUSDArray = series.reduce((a, b) => a + b, 0);

    return (
      <ScrollView 
          contentContainerStyle={styles.container}
          >
        <LinearGradient
            colors={['#359ff8', '#325efd']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientHeader}
          >
          <Header
            hamBurgerPress={() => this.onHamBurgerPress()}
            onBackPress={() => this.onRefresh()}
            title="Dashboard"
          />

          {this.props.currentRoute === 'WalletHome' || this.props.currentRoute === 'Wallet' || this.props.currentRoute === 'Home' ?
            
            <View style={{flex: 1, display: 'flex'}}>
              <View style={styles.dashCard}>
                <View style={styles.pieSection}>
                  {series.length > 0 && sumUSDArray > 0 ?
                  <PieChart
                    chart_wh={chart_wh}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.8}
                  />
                    : <PieChart
                    chart_wh={chart_wh}
                    series={[1]}
                    sliceColor={['#777777']}
                    doughnut={true}
                    coverRadius={0.8}
                  /> }

                  {/* {this.state.testnetIsDown ?
                    <View style={{ position: "absolute" }}>
                      <Text style={styles.usdBalText}>
                        {this.state.testnetIsDown} Server is Down
                      </Text>
                    </View>
                  : null} */}

                  {/* { balanceInfo != null && this.state.testnetIsDown == null ? */}
                  { balanceInfo != null ?
                    <View style={{ position: "absolute" }}>
                      <Text style={styles.usdBalText}>
                        {/* {this.props.defaultCurrency}: {balanceInfo.toFixed(2)} */}
                        {this.props.defaultCurrency}
                      </Text>
                    </View>
                  : null }

                </View>

                <View style={{ flexDirection: "column", height: 175 }}>
                  <ScrollView>
                    {tokens}
                  </ScrollView>
                </View>

                { balanceInfo != null && this.state.testnetIsDown == null ?
                    <View style={styles.stackedCard}>
                      <View style={styles.totalChange}>
                        <Text style={styles.totalChangeTitle}>
                          {`XDCE Price`}
                        </Text>

                        <Text style={styles.totalChangeNumber}>
                          {this.state.xdcePrice ? this.state.xdcePrice : '...'}
                        </Text>
                      </View>

                      <View style={styles.rightBorder}></View>

                      <View style={styles.totalChange}>
                        <Text style={styles.totalChangeTitle}>
                          {`Total Value`}
                        </Text>

                        <Text style={styles.totalChangeNumber}>
                          {this.props.defaultCurrency}: {balanceInfo.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  : null }
              </View>
            </View>  

          : null}

          
          </LinearGradient>
          
          <View style={{ flex: 1, flexDirection: "column", display: 'none' }}>
            <View
              style={{
                flex: 1,
                height: "100%",
                width: "100%",
                paddingLeft: 10,
                paddingRight: 10,
                top: 115
              }}
            >
              <View>
                <Text style={{ color: "#ffffff", fontSize: 20 }}>
                  Tokens List
                </Text>
              </View>
              <View style={{ height: 300 }}>
                <ScrollView>
                  <ExpandableView />
                </ScrollView>
              </View>
            </View>
          </View>

          {this.props.currentRoute === 'WalletHome' || this.props.currentRoute === 'Wallet' || this.props.currentRoute === 'Home' ?
            <View style={styles.topContainer}>
              <Text style={{ color: "#777", fontSize: 18, textAlign: 'center', paddingBottom: 10 }}>
                  TOKENS LIST
              </Text>  
            <ScrollView>   
              <View style={{}}>
                {/* <ExpandableView /> */}
                {graphList}
              </View>
            </ScrollView>
              </View>
          : null}


          <Modal 
            onBackdropPress={() => this.toggleModal(null)}
            isVisible={!this.state.isModalVisible} 
            deviceHeight={dimHeight}
            style={styles.ModalContainer}>
              <View style={styles.ModalView}>
                <Text style={styles.warning}>XDC Wallet does not hold your keys for you. We cannot access accounts, recover keys, reset passwords, nor reverse transactions. So store your private key at safe place by going to Export Private Key menu.</Text>
                <LinearGradient
                  colors={['#359ff8', '#325efd']}
                  locations={[0, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ModalClose}
                >
                  <TouchableOpacity
                    underlayColor="transparent"
                    activeOpacity={0.8}
                    onPress={() => this.toggleModal(null)}
                  >
                    <View>
                      <Text style={styles.ModalCloseButton}>CLOSE</Text>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
          </Modal>

          <Modal 
            isVisible={this.state.isLoadingModalVisible}
            deviceHeight={dimHeight} 
            style={styles.ModalContainer}>
              <View style={styles.LoadingModalView}>
                <DotIndicator color='white' />
              </View>
          </Modal>

          <Footer
            activeTab="WalletHome"
            onReceivePress={() => this.props.navigation.navigate("Receive")}
            onHomePress={() => this.props.navigation.navigate("WalletHome")}
            onSendPress={() =>
              this.props.navigation.navigate("Send", {
                onTokenChange: this.onTokenChange
              })
            }
            onTransactionsPress={() =>
              this.props.navigation.navigate("WalletTransactions")
            }
          />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  callToActionDismissed: state.callToActionDismissed,
  selectedToken: state.selectedToken,
  walletAddress: state.walletAddress,
  currentRoute: state.currentRoute,
  isKeyExported: state.isKeyExported,
  tokenList: state.availableTokens,
  defaultCurrency: state.currentCurrency,
});

const mapDispatchToProps = dispatch => ({
  dismissCallToAction: () => dispatch({ type: SET_CALL_TO_ACTION_DISMISSED }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
  exportKey: () => dispatch({ type: IS_KEY_EXPORTED })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletHome);
