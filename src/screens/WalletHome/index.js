import React, { Component } from "react";
import {
  AppState,
  BackHandler,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableHighlight
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
import ExpandableView1 from "./components/ExpandableView";

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
    paddingTop: 0
  },

  topContainer: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
    paddingBottom: 0
  },

  gradientHeaderWrapper: {
    height: 150,
    position: "relative"
  },

  gradientHeader: {
    width: "100%",
    height: 130,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
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
    color: "#254a81"
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
  }
});

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
    isModalVisible: this.props.isKeyExported
  };

  componentDidMount() {
    this.addEventListeners();
    this.onRefresh();
    this.loadTokensList();
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
    // this.fetchBalance();
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
    +this.setState({
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

  render() {
    const chart_wh = 170;
    const series = [15, 60, 25];
    const sliceColor = ["#1bf2ff", "#ff9b22", "#ac0fed"];

    return (
      <SafeAreaView style={styles.container}>
        <Header
          hamBurgerPress={() => {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
          }}
          title="Dashboard"
        />
        <View style={{ flex: 1, flexDirection: "column" }}>
          <LinearGradient
            colors={["#359ff8", "#325efd"]}
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 40
            }}
          >
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 50
              }}
            >
              <PieChart
                chart_wh={chart_wh}
                series={series}
                sliceColor={sliceColor}
                doughnut={true}
                coverRadius={0.8}
                coverFill={"#359ff8"}
              />

              <View style={{ position: "absolute" }}>
                <Text
                  style={{
                    backgroundColor: "transparent",
                    color: "#ffffff",
                    paddingBottom: 50,
                    fontSize: 24
                  }}
                >
                  $25,951.81
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "column", paddingBottom: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.CircleShapeViewXDC} />
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      fontFamily: "bold"
                    }}
                  >
                    {" "}
                    XDC (TestNet)
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14
                  }}
                >
                  {"     "}
                  $17,879.90
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14
                  }}
                >
                  {"     "}
                  0.27637389 XDC
                </Text>
              </View>

              <View style={{ flexDirection: "column", paddingBottom: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.CircleShapeViewXDC1} />
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      fontFamily: "bold"
                    }}
                  >
                    {" "}
                    XDC (MainNet)
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14
                  }}
                >
                  {"     "}
                  $17,879.90
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14
                  }}
                >
                  {"     "}
                  0.27637389 XDC
                </Text>
              </View>

              <View style={{ flexDirection: "column", paddingBottom: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View style={styles.CircleShapeViewXDCe} />
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 18,
                      fontFamily: "bold"
                    }}
                  >
                    {" "}
                    XDCe
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14
                  }}
                >
                  {"     "}
                  $17,879.90
                </Text>
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14
                  }}
                >
                  {"     "}
                  0.27637389 XDCe
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              paddingLeft: 10,
              paddingRight: 10,
              top: -70
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
  isKeyExported: state.isKeyExported
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
