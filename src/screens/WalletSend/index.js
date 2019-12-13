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
// import Form from "../WalletSend/components_new/Form";
import Form from "./components/Form";
// import TransactionList from "../WalletTransactions/components/TransactionsList";
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
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
    paddingBottom: 0,
    backgroundColor: '#ccc'
  },

  containerScrollView: {
    flex: 1,
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
  },

  // new styles
  formContainer: {
    flex: 1,
    borderRadius: 3,
    height: "100%",
    width: "100%",
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 10,
    paddingVertical: 15,
    backgroundColor: "#fff"
  },
  formContainerInside: {
    flex: 1,
    flexDirection: "row"
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
    refreshing: false,
    address: '',
    amount: '',
    isLoading: false,
    currentBalance: {
      'balance': 0,
      'usdBalance': 0,
    },
    activeOption: "Send"
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
      address: ""
    });
  };

  onBarCodeRead = address => {
    AnalyticsUtils.trackEvent('Read send address QR code');
    if(this.props.selectedToken.symbol === "XDCE") {
      address = address
    } else {
      if(address.substring(0, 2) === '0x') {
        address = 'xdc' + address.substring(2);
      }
    }

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

  

  addressIsValid = () => /^(xdc|0x)([A-Fa-f0-9]{40})$/.test(this.state.address);

  amountIsValid = () => parseFloat(this.state.amount, 10) > 0;

  sendTransaction = async (object, network_optional) => {
    if(this.state.currentBalance.balance > 0) {
      try {
        this.setState({
          isLoading: true,
        });
        let txHash = await WalletUtils.sendTransaction(
          this.props.selectedToken,
          this.state.address,
          this.state.amount,
          network_optional,
        );
        let walletReceiveAddress = this.state.address;
        if (walletReceiveAddress.substring(0,2) === '0x') {
          walletReceiveAddress = "xdc" + walletReceiveAddress.substring(2);
        }

        let API_URL;
        if(this.props.selectedToken.network == 'mainnet') {
          API_URL = `https://explorer.xinfin.network/tx/${txHash}`;
        } else if(this.props.selectedToken.network == 'private') {
          API_URL = `https://explorer.apothem.network/tx/${txHash}`;
        } else if(this.props.selectedToken.network == 'public') {
          API_URL = `https://etherscan.io/tx/${txHash}`;
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
                  text: 'Tx Hash',
                  onPress: () => {
                    Linking.openURL(API_URL)
                  },
                },
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
            } else if(error.message.includes('replacement transaction underpriced')) {
              errMsg = 'Replacement Transaction Underpriced';
              // known transaction ::TODO
            } else if(error.message.includes('Invalid JSON RPC response')) {
              if(this.props.selectedToken.network == 'mainnet') {
                this.sendTransaction(object, 'mainnet_optional');
              } else if(this.props.selectedToken.network == 'testnet') {
                this.sendTransaction(object, 'testnet_optional');
              }
              return;
              // errMsg = 'Invalid JSON RPC response';
            }else {
              errMsg = 'An error happened during the transaction, please try again later';
            }
            Alert.alert(
              `Sending ${this.props.selectedToken.symbol}`,
              `${errMsg} for ${this.props.selectedToken.type ? this.props.selectedToken.type : this.props.selectedToken.symbol}`,
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

  onReceivePress = () => {
    this.props.setRoute("Receive");
    this.props.navigation.navigate("Receive")
};

onHamBurgerPress = () => {
    this.props.setRoute("Settings");
    this.props.navigation.navigate("Settings")
};

  render() {
    let walletReceiveAddress = this.props.walletAddress;
    if(this.props.selectedToken.name === 'XDCE') {
      walletReceiveAddress = this.props.walletAddress;
    } else {
      if (walletReceiveAddress.substring(0,2) === '0x') {
        walletReceiveAddress = "xdc" + walletReceiveAddress.substring(2);
      }
    }

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
              title="Send" />
          
            <BalanceRow
              currentBalance={this.state.currentBalance}
              selectedToken={this.props.selectedToken}
            />
          </LinearGradient>

          <View style={styles.containerScrollView}>
            <View
              style={{
                position: "relative",
                flex: 1,
                top: -20,
                backgroundColor: "#ccc",
                alignContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  paddingLeft: 15,
                  paddingRight: 15,
                  position: "absolute",
                  top: -25
                }}
              >
                {/* <ReceiveForm walletReceiveAddress={walletReceiveAddress} /> */}
                <SafeAreaView style={styles.formContainer}>
                  <View style={styles.formContainerInside}>
                    <ScrollView>
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

                      <View style={styles.buttonContainer}>
                        <SecondaryButton
                          disabled={!this.addressIsValid() || !this.amountIsValid()}
                          isLoading={this.state.isLoading}
                          onPress={this.sendTransaction}
                          text="Continue"
                        />
                      </View>
                      </ScrollView>
                    </View>
                  </SafeAreaView>
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
)(WalletSend);
