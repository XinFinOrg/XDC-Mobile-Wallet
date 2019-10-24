import React, { Component } from "react";
import {
  SafeAreaView,
  Share,
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
  Alert,
  TouchableOpacity,
  Linking
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QRCode from "react-native-qrcode-svg";
import LinearGradient from "react-native-linear-gradient";
import {
  GradientBackground,
  Header,
  SecondaryButton,
  Text,
  BalanceRow
} from "../../components";
import WalletUtils from "../../utils/wallet";
import Footer from "../UIComponents/Footer/index";
import { SET_CURRENT_ROUTE } from "../../config/actionTypes";
import { DrawerActions } from "react-navigation";
import Form from "../WalletSend/components_new/Form";
import ReceiveForm from "../WalletReceive/Form";
import TransactionList from "../WalletTransactions/components/TransactionsList";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 0
  },
  containerScrollView: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 0
  },
  qrcodeContainer: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingVertical: 5,
    width: 160
  },
  addressTitle: {
    paddingHorizontal: 15,
    color: "#fff",
    textAlign: "center",
    paddingBottom: 20,
    fontSize: 18,
    fontFamily: "Roboto"
  },
  walletAddress: {
    paddingHorizontal: 15,
    color: "#9d9d9d",
    textAlign: "center",
    fontFamily: "Roboto"
  },
  buttonContainer: {
    paddingHorizontal: 15,
    paddingTop: 40
  },

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

class WalletReceive extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired,
    onTokenChange: PropTypes.func.isRequired,
    walletAddress: PropTypes.string.isRequired
  };

  state = {
    refreshing: false,
    currentBalance: {
      balance: 0,
      usdBalance: 0
    },
    activeOption: "Receive"
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
      currentBalance
    });
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

  goBack = () => {
    const stackLength =
      this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state
      .routes[stackLength].routeName;
    this.props.setRoute(stackRoute);
    this.props.navigation.navigate(stackRoute);
  };

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
            activeTab="Receive"
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
  walletAddress: state.walletAddress,
  selectedToken: state.selectedToken
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletReceive);
