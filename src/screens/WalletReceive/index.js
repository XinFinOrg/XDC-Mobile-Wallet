import React, { Component } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";
import {
  GradientBackground,
  Header,
  BalanceRow
} from "../../components";
import WalletUtils from "../../utils/wallet";
import Footer from "../UIComponents/Footer/index";
import { SET_CURRENT_ROUTE } from "../../config/actionTypes";
import ReceiveForm from "../WalletReceive/Form";
import {gradientColors} from '../../utils/constants';

import useTheme from './AppStyles';

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
    this.fetchBalance();
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

  onReceivePress = () => {
    this.props.setRoute("Receive");
    this.props.navigation.navigate("Receive")
};

onHamBurgerPress = () => {
    this.props.setRoute("Settings");
    this.props.navigation.navigate("Settings")
};
  
  renderIf = (condition, content) => {
    if (condition) {
      return content;
    } else {
      return null;
    }
  };

  render() {
    const styles = useTheme(this.props.darkTheme);

    let walletReceiveAddress = this.props.walletAddress;
    if(this.props.selectedToken.network === 'public') {
      walletReceiveAddress = this.props.walletAddress;
    } else {
      if (walletReceiveAddress.substring(0,2) === '0x') {
        walletReceiveAddress = "xdc" + walletReceiveAddress.substring(2);
      }
    }

    return (
      <GradientBackground>
        <ScrollView 
          contentContainerStyle={styles.container}
          refreshControl = {
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
              title="Loading..."
              />
          }>
          <LinearGradient
            colors={this.props.darkTheme ? gradientColors.dark : gradientColors.light}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientHeader}
          >
          
            <Header 
              hamBurgerPress={() => this.onHamBurgerPress()}
              onBackPress={() => this.goBack()} 
              title="Receive" />
          
            <BalanceRow
              currentBalance={this.state.currentBalance}
              selectedToken={this.props.selectedToken}
            />
          </LinearGradient>

          <View style={styles.containerScrollView}>
            <View
              style={styles.containerScrollViewChild}
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
                <ReceiveForm walletReceiveAddress={walletReceiveAddress} />
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
        </ScrollView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
  selectedToken: state.selectedToken,
  darkTheme: state.darkTheme,
});

const mapDispatchToProps = dispatch => ({
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WalletReceive);
