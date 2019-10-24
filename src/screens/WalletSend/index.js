import React, { Component } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import {
  GradientBackground,
  Header,
  SecondaryButton,
  BalanceRow
} from "../../components";
import LinearGradient from "react-native-linear-gradient";
import Form from "./components_new/Form";
import ReceiveForm from "../WalletReceive/Form";
import TransactionList from "../WalletTransactions/components/TransactionsList";
import AnalyticsUtils from "../../utils/analytics";
import { SET_CURRENT_ROUTE } from "../../config/actionTypes";
import WalletUtils from "../../utils/wallet";
import Footer from "../UIComponents/Footer/index";
import { DrawerActions } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 0
  },

  topContainer: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "column"
  },

  buttonsContainer: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center"
  },

  xdcButtonMark: {
    height: 40,
    width: 100,
    borderRadius: 30,
    marginRight: 5,
    marginLeft: 5,
    padding: 15,
    backgroundColor: "#ff9b22",
    justifyContent: "center",
    alignItems: "center"
  },

  xdcButtonUnMark: {
    height: 40,
    width: 100,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 5,
    marginLeft: 5,
    padding: 15,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },

  xdcButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 20
  },

  containerScrollView: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 0
  },

  priceText: {
    color: "#ffffff",
    fontSize: 28,
    textAlign: "center"
  },

  totalBalance: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center"
  },
  buttonContainer: {
    paddingHorizontal: 15
  }
});

class WalletSend extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired
    }).isRequired,
    onTokenChange: PropTypes.func.isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    address: "",
    amount: "",
    isLoading: false,
    currentBalance: {
      balance: 0,
      usdBalance: 0
    },
    activeOption: "Send"
  };

  onRefresh = () => {
    // this.fetchBalance();
    this.setState({ refreshing: true });
    // In actual case set refreshing to false when whatever is being refreshed is done!
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  fetchBalance = async () => {
    const currentBalance = await WalletUtils.getBalance(
      this.props.selectedToken
    );

    this.setState({
      currentBalance,
      address: ""
    });
  };

  onBarCodeRead = address => {
    AnalyticsUtils.trackEvent("Read send address QR code");
    if (this.props.selectedToken.symbol === "XDCE") {
      address = address;
    } else {
      if (address.substring(0, 2) === "0x") {
        address = "xdc" + address.substring(2);
      }
    }

    this.setState({
      address
    });
  };

  onCameraPress = () => {
    this.props.navigation.navigate("Camera", {
      onBarCodeRead: this.onBarCodeRead
    });
  };

  goBack = () => {
    this.setState({
      amount: "",
      address: ""
    });
    const stackLength =
      this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state
      .routes[stackLength].routeName;
    this.props.setRoute(stackRoute);
    this.props.navigation.navigate(stackRoute);
  };

  addressIsValid = () => /^(xdc|0x)([A-Fa-f0-9]{40})$/.test(this.state.address);

  amountIsValid = () => parseFloat(this.state.amount, 10) > 0;

  sendTransaction = async (object, network_optional) => {
    if (this.state.currentBalance.balance > 0) {
      try {
        this.setState({
          isLoading: true
        });
        let txHash = await WalletUtils.sendTransaction(
          this.props.selectedToken,
          this.state.address,
          this.state.amount,
          network_optional
        );
        let walletReceiveAddress = this.state.address;
        if (walletReceiveAddress.substring(0, 2) === "0x") {
          walletReceiveAddress = "xdc" + walletReceiveAddress.substring(2);
        }

        this.setState(
          {
            isLoading: false
          },
          () => {
            Alert.alert(
              `Sending ${this.props.selectedToken.symbol}`,
              `You've successfully sent ${this.state.amount} ${this.props.selectedToken.symbol} to ${walletReceiveAddress}`,
              [
                {
                  text: "Tx Hash",
                  onPress: () => {
                    Linking.openURL(
                      `https://explorer.xinfin.network/tx/${txHash}`
                    );
                  }
                },
                {
                  text: "OK",
                  onPress: () => {
                    this.goBack();
                  }
                }
              ],
              { cancelable: false }
            );
          }
        );
      } catch (error) {
        this.setState(
          {
            isLoading: false
          },
          () => {
            console.log(error, error.message);
            let errMsg = null;
            if (error.message.includes("insufficient funds for gas")) {
              errMsg = "Insufficient ether balance";
            } else if (error.message.includes("insufficient funds")) {
              errMsg = "Insufficient funds";
            } else if (
              error.message.includes("replacement transaction underpriced")
            ) {
              errMsg = "Replacement Transaction Underpriced";
              // known transaction ::TODO
            } else if (error.message.includes("Invalid JSON RPC response")) {
              if (this.props.selectedToken.network == "mainnet") {
                this.sendTransaction(object, "mainnet_optional");
              } else if (this.props.selectedToken.network == "testnet") {
                this.sendTransaction(object, "testnet_optional");
              }
              return;
              // errMsg = 'Invalid JSON RPC response';
            } else {
              errMsg =
                "An error happened during the transaction, please try again later";
            }
            Alert.alert(
              `Sending ${this.props.selectedToken.symbol}`,
              `${errMsg} for ${
                this.props.selectedToken.type
                  ? this.props.selectedToken.type
                  : this.props.selectedToken.symbol
              }`,
              [
                {
                  text: "OK",
                  onPress: () => {
                    this.goBack();
                  }
                }
              ],
              { cancelable: false }
            );
          }
        );
      }
    } else {
      this.setState(
        {
          isLoading: false
        },
        () => {
          const errMsg = "Insufficient funds";
          Alert.alert(
            `Sending ${this.props.selectedToken.symbol}`,
            `${errMsg} for ${this.props.selectedToken.symbol}`,
            [
              {
                text: "OK",
                onPress: () => {
                  this.goBack();
                }
              }
            ],
            { cancelable: false }
          );
        }
      );
    }
  };

  tokenChange = val => {
    this.props.setDefaultToken(token);
  };

  componentDidMount() {
    this.onRefresh();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.selectedToken != newProps.selectedToken) {
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

  sendPress = () => {
    this.setState({ activeOption: "Send" });
  };

  transactionPress = () => {
    this.setState({ activeOption: "Transactions" });
  };

  receivePress = () => {
    this.setState({ activeOption: "Receive" });
  };

  renderIf = (condition, content) => {
    if (condition) {
      return content;
    } else {
      return null;
    }
  };

  render() {
    const activeOption = "SEND";
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <LinearGradient
            colors={["#254a81", "#254a81"]}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientHeader}
          >
            <Header
              hamBurgerPress={() =>
                this.props.navigation.dispatch(DrawerActions.openDrawer())
              }
              onBackPress={() => this.goBack()}
              title={this.state.activeOption}
            />
          </LinearGradient>

          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={["#359ff8", "#325efd"]}
              style={{
                flex: 0.3
              }}
            >
              <View style={styles.topContainer}>
                <Text style={styles.priceText}> 1025 XDC </Text>
                <Text style={styles.totalBalance}>Total Balance</Text>
                <View style={styles.buttonsContainer}>
                  <View style={{}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={this.sendPress}
                      style={
                        this.state.activeOption === "Send"
                          ? styles.xdcButtonMark
                          : styles.xdcButtonUnMark
                      }
                    >
                      <Text style={styles.xdcButtonText}>XDC</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.transactionPress}
                    style={
                      this.state.activeOption === "Transactions"
                        ? styles.xdcButtonMark
                        : styles.xdcButtonUnMark
                    }
                  >
                    <Text style={styles.xdcButtonText}>XDC</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.receivePress}
                    style={
                      this.state.activeOption === "Receive"
                        ? styles.xdcButtonMark
                        : styles.xdcButtonUnMark
                    }
                  >
                    <Text style={styles.xdcButtonText}>XDCe</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>

            <View
              style={{
                position: "relative",
                flex: 0.7,
                top: -10,
                backgroundColor: "#f3f3f5",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  paddingLeft: 10,
                  paddingRight: 10,
                  position: "absolute",
                  top: -20
                }}
              >
                {this.renderIf(this.state.activeOption === "Send", <Form />)}
                {this.renderIf(
                  this.state.activeOption === "Transactions",
                  <TransactionList />
                )}
                {this.renderIf(
                  this.state.activeOption === "Receive",
                  <ReceiveForm />
                )}
              </View>
            </View>
          </View>

          <Footer
            activeTab="Send"
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
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  selectedToken: state.selectedToken
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletSend);
