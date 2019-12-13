import React, { Component } from "react";
import {
  AppState,
  BackHandler,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Text as RNText
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GradientBackground, Text, Header } from "../../components";
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";
import {
  Balances,
  BalanceRow,
  CallToAction,
  TransactionsList
} from "./components";
import Footer from "../UIComponents/Footer/index";
import PieChart from "react-native-pie-chart";
import up from "./components/ExpandableView/Images/ic_up.png";
import down from "./components/ExpandableView/Images/ic_down.png";
import xdc from "./components/ExpandableView/Images/ic_xdc.png";
import xdce from "./components/ExpandableView/Images/ic_xdce.png";
// import { PieChart } from 'react-native-svg-charts';
// import ExpandableView1 from "./components/ExpandableView";

import {
  SET_CALL_TO_ACTION_DISMISSED,
  SET_CURRENT_ROUTE,
  IS_KEY_EXPORTED
} from "../../config/actionTypes";
import WalletUtils from "../../utils/wallet";
import { relative } from "path";
import {
  DrawerActions,
  StackActions,
  withNavigationFocus
} from "react-navigation";
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

  gradientHeaderWrapper: {
    height: 150,
    position: "relative"
  },
  gradientHeader: {
    width: "100%",
    height: 250,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15
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

  gradientHeaderShadowTwo: {
    position: "absolute",
    width: "86%",
    marginLeft: "7%",
    bottom: 0,
    height: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },

  coinName: {
    color: "#fff",
    backgroundColor: "transparent",
    fontSize: 18,
    letterSpacing: 3,
    paddingVertical: 15,
    paddingTop: 20,
    textAlign: "center"
  },
  bannerContainer: {
    backgroundColor: "#ddd",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  bannerText: {
    color: "#359ff8"
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
  ModalItemTitle: {
    color: "#000",
    fontSize: 18,
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
  gaugeText: {
    backgroundColor: "transparent",
    color: "#ffffff",
    fontSize: 24
  },
  CircleShapeViewXDC: {
    width: 10,
    height: 10,
    borderRadius: 150 / 2,
    backgroundColor: "#1bf2ff"
  },
  CircleShapeViewXDC1: {
    width: 10,
    height: 10,
    borderRadius: 150 / 2,
    backgroundColor: "#ff9b22"
  },
  CircleShapeViewXDCe: {
    width: 10,
    height: 10,
    borderRadius: 150 / 2,
    backgroundColor: "#ac0fed"
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
  transactions: [],
  isModalVisible: false,
  selectedSlice: {
    label: '',
    value: 0
  },
  labelWidth: 0,
  tokenBalances: null,
  tokenBalancesLength: null,
  activityIndicator: true,
  testnetIsDown: null,
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
    transactions: [],
    isModalVisible: this.props.isKeyExported,
    selectedSlice: {
      label: '',
      value: 0
    },
    labelWidth: 0,
    tokenBalances: null,
    tokenBalancesLength: null,
    activityIndicator: true,
    testnetIsDown: null,
  };

  componentDidMount() {
    this.addEventListeners();
    this.onRefresh();
    this.loadTokensList();
    if(this.props.tokenList != null) {
      this.props.tokenList.map((token, index) => {
        this.fetchDashboardData(token);
      })
    }
  }

  willFocus = () => this.props.navigation.addListener('willFocus', () => {
    this.setState(initialState);
    if(this.props.tokenList != null) {
      this.props.tokenList.map((token, index) => {
        this.fetchDashboardData(token);
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
    if(this.state.tokenBalances != null) {
      stateBalance = this.state.tokenBalancesLength;
      stateBalance.push({
        [token.tName]: balanceInfo,
      });

      stateBalanceObj = this.state.tokenBalances;
      stateBalanceObj[token.tName] = balanceInfo
    } else {
      stateBalance.push({
        [token.tName]: balanceInfo,
      });

      stateBalanceObj[token.tName] = balanceInfo
    }
    this.setState({
      tokenBalancesLength: stateBalance,
      tokenBalances: stateBalanceObj
    })
  }

  handleBackButton = () => {
    const length = this.props.navigation;
    if (this.props.currentRoute === "Wallet") {
      return true;
    } else {
      this.props.setRoute("WalletHome");
      this.props.navigation.navigate("WalletHome");
      return true;
    }
  };

  componentWillReceiveProps(newProps) {
    // if(newProps.currentRoute == "WalletHome") {
    //   if(newProps.tokenList != null) {
    //     newProps.tokenList.map((token, index) => {
    //       this.willFocus(token)
    //     })
    //   }
    // }
    
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

  onRefresh = () => {
    this.fetchBalance();
    // this.fetchTransactions();
  };

  handleAppStateChange = nextAppState => {
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
    const series = [1,1,1];
    const sliceColor = [];
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const values = [45, 25, 110];
    const colors = ['#90EE90', '#8e44ad', '#f39c12', '#16a085', '#2c3e50'];
    let tokenName = {
      'XDC': xdc,
      'XDCE': xdce
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
                {token.type ? token.type : token.name}
              </Text>
            </View>
            <Text style={styles.tokenDetailUsd}>
              {"     "}
              {this.props.defaultCurrency}: {this.state.tokenBalances[token.tName].usdBalance.toFixed(2)}
            </Text>
            <Text style={styles.tokenDetailUsd}>
              {"     "}
              {token.name}: {this.state.tokenBalances[token.tName].balance.toFixed(2)}
            </Text>
          </View>
        )
        
      });
    }

    let graphList = null;
    if(this.props.tokenList != null && this.state.tokenBalances != null && this.props.tokenList.length === this.state.tokenBalancesLength.length) {
      graphList = this.props.tokenList.map((token, index) => {
        
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
                  <Image source={tokenName[token.name]} style={{ height: 25, width: 25 }} />
                </View>
                
                  {token.type ?
                    <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text style={{ color: "#565e66", fontSize: 18 }}>
                        {token.name}
                      </Text>
                      <Text style={{ color: "#71869a", fontSize: 12 }}>
                        {token.type}
                      </Text>
                    </View>
                  : <View style={{ flexDirection: "column", marginLeft: 10 }}>
                      <Text style={{ color: "#565e66", fontSize: 18 }}>
                        {token.name}
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
                      {this.props.defaultCurrency}: {this.state.tokenBalances[token.tName].usdBalance.toFixed(2)}
                  </Text>
                  {/* <Text style={{ color: "#15d291", fontSize: 12 }}>
                    {"(+ " + sections.profitincrease + "%)"}
                  </Text> */}
                </View>

                <View>
                  <TouchableOpacity onPress={this.onPress} style={{paddingRight: 10}}>
                    <Image
                      source={up}
                      style={{ height: 10, width: 10 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )
        
      });
    }

    let data = null;
    let balanceInfo = null;
    if(this.props.tokenList != null && this.state.tokenBalances != null) {
      console.log('1111::', this.state.tokenBalancesLength, this.state.tokenBalancesLength.length);
      if(this.props.tokenList.length === this.state.tokenBalancesLength.length) {
        data = this.state.tokenBalancesLength.map((token, index) => {
          let keyName = this.props.tokenList[index].tName;
          const key = keyName;
          balanceInfo += this.state.tokenBalances[keyName].usdBalance;
          series.push(this.state.tokenBalances[keyName].usdBalance);
          sliceColor.push(colors[index]);
        });

      
        if(balanceInfo == 0) {
        }
      }
    }
    console.log('2222::', balanceInfo);
    return (
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
            title="Dashboard"
          />

          {this.props.currentRoute === 'WalletHome' || this.props.currentRoute === 'Wallet' || this.props.currentRoute === 'Home' ?
            
            <View style={{flex: 1, display: 'flex'}}>
              <View style={styles.dashCard}>
                <View style={styles.pieSection}>
                  <PieChart
                    chart_wh={chart_wh}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.8}
                  />

                  {this.state.testnetIsDown ?
                    <View style={{ position: "absolute" }}>
                      <Text style={styles.usdBalText}>
                        {this.state.testnetIsDown} Server is Down
                      </Text>
                    </View>
                  : null}

                  { balanceInfo != null && this.state.testnetIsDown == null ?
                    <View style={{ position: "absolute" }}>
                      <Text style={styles.usdBalText}>
                        {this.props.defaultCurrency}: {balanceInfo.toFixed(2)}
                      </Text>
                    </View>
                  : null }
                  
                </View>

                <View style={{ flexDirection: "column" }}>
                  {tokens}
                </View>

                { balanceInfo != null && this.state.testnetIsDown == null ?
                    <View style={styles.stackedCard}>
                      <View style={styles.totalChange}>
                        <Text style={styles.totalChangeTitle}>
                          {`Total Change`}
                        </Text>

                        <Text style={styles.totalChangeNumber}>
                          {`Coming Soon`}
                        </Text>
                      </View>

                      <View style={styles.rightBorder}></View>

                      <View style={styles.totalChange}>
                        <Text style={styles.totalChangeTitle}>
                          {`Current Valuation`}
                        </Text>

                        <Text style={styles.totalChangeNumber}>
                          {`Coming Soon`}
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
                  Price Chart
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
                  PRICE CHARTS
              </Text>  
            <ScrollView>
              {/* <Balances navigation={this.props.navigation} currentBalance={this.state.currentBalance} /> */}        
              <View style={{ height: 300 }}>
                {/* <ExpandableView /> */}
                {graphList}
              </View>
            </ScrollView>
              </View>
          : null}


          <Modal 
            onBackdropPress={() => this.toggleModal(null)}
            isVisible={!this.state.isModalVisible} 
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
                  <TouchableHighlight
                    activeOpacity={0.8}
                    onPress={() => this.toggleModal(null)}
                  >
                    <View>
                      <Text style={styles.ModalCloseButton}>CLOSE</Text>
                    </View>
                  </TouchableHighlight>
                </LinearGradient>
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
      </SafeAreaView>
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
