import React, { Component } from 'react';
import { Alert, SafeAreaView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation';
import PropTypes from 'prop-types';
import WalletUtils from '../../utils/wallet';
import {
  GradientBackground,
  Header,
  PinIndicator,
  PinKeyboard,
  Text,
} from '../../components';

import LinearGradient from "react-native-linear-gradient";

import { SET_PIN_CODE, SET_CURRENT_ROUTE } from '../../config/actionTypes';
import Footer from '../UIComponents/Footer/';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  explanatoryTextContainer: {
    height: 120,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  explanatoryText: {
    color: '#ffffff',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  createPINText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  dotsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  dot: {
    height: 20,
    width: 20,
    marginHorizontal: 10,
  },
});

class CreateWallet extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    setPinCode: PropTypes.func.isRequired,
  };

  state = {
    confirmationPinCode: '',
    pinCode: '',
    isConfirmation: false,
    isDisabled: false,
  };

  onBackPress = () => {
    this.setState({
      isDisabled: false,
    })
    if (!this.state.isConfirmation) {
      this.setState(prevState => ({
        pinCode: prevState.pinCode.slice(0, -1),
      }));
    } else {
      this.setState(prevState => ({
        confirmationPinCode: prevState.confirmationPinCode.slice(0, -1),
      }));
    }
  };

  onKeyPress = n => {
    if (!this.state.isConfirmation) {
      this.updatePinCode(n);
    } else {
      this.updateConfirmationPinCode(n);
    }
  };

  updatePinCode = n => {
    this.setState(
      prevState => ({
        pinCode: `${prevState.pinCode}${n}`,
      }),
      () => {
        if (this.state.pinCode.length === 4) {
          this.setState({
            isConfirmation: true,
          });
        }
      },
    );
  };

  updateConfirmationPinCode = n => {
    this.setState(
      prevState => ({
        confirmationPinCode: `${prevState.confirmationPinCode}${n}`,
      }),
      async () => {
        if (
          this.state.confirmationPinCode.length === 4 &&
          this.state.pinCode === this.state.confirmationPinCode
        ) {
          this.setState({
            isDisabled: true
          })
          this.props.setPinCode(this.state.pinCode);
          
          if (this.props.navigation.getParam('recoverMode', false)) {
            this.props.navigation.navigate('RecoverWallet');
            return;
          }

          if (
            !this.props.navigation.getParam('editMode', false) &&
            !this.props.navigation.getParam('migrationMode', false) &&
            !this.props.pinCode != ""
          ) {
            console.log('generate wallet')
            WalletUtils.generateWallet();
          }

          if (this.props.navigation.getParam('editMode', false) || this.props.pinCode != "") {
            this.props.setRoute('WalletHome');
            this.props.navigation.navigate('WalletHome');
            return;
          }

          setTimeout(() => {
            this.props.setRoute('WalletHome');
            this.props.navigation.navigate('WalletHome');
          });
        } else if (this.state.confirmationPinCode.length === 4) {
          this.setState(
            {
              pinCode: '',
              confirmationPinCode: '',
              isConfirmation: false,
              isDisabled: false,
            },
            () => {
              Alert.alert(
                'PIN Code',
                "Your PIN code doesn't match. Please try again.",
              );
            },
          );
        }
      },
    );
  };

  goBack = () => {
    const stackLength = this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    const stackRoute = this.props.navigation.dangerouslyGetParent().state.routes[stackLength].routeName;
    this.props.setRoute(stackRoute)
    this.props.navigation.navigate(stackRoute)
  };

  render() {
    const pinCode = this.state.isConfirmation
      ? this.state.confirmationPinCode
      : this.state.pinCode;

      
    const originalTitle = this.props.navigation.getParam('editMode', false)
      ? 'Change PIN'
      : 'Create PIN';

    const IsFooter = this.props.navigation.getParam('editMode', false) ?
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
    : null;

    // const stackLength = this.props.navigation.dangerouslyGetParent().state.routes.length - 2;
    // const stackRoute = this.props.navigation.dangerouslyGetParent().state.routes[stackLength].routeName;
    
    return (
      <LinearGradient colors={["#359ff8", "#325efd"]} style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* <Header
            hamBurgerPress={this.props.navigation.getParam('editMode', false) ? () => this.props.navigation.dispatch(DrawerActions.openDrawer()) : null}
            onBackPress={
              this.props.navigation.getParam('migrationMode', false)
                ? null
                : () => this.goBack()
            }
            title={this.state.isConfirmation ? 'Repeat PIN' : originalTitle}
          /> */}
          <View style={styles.topContainer}>
            <View style={styles.explanatoryTextContainer}>
              <Text style={styles.explanatoryText}>
                {this.state.isConfirmation
                  ? "Just to make sure it's correct"
                  : "This PIN will be used to access your XDCWALLET. If you forget it, you won't be able to access your wallet."}
              </Text>
            </View>
            
            <View>
              <Text style={styles.createPINText}>
                {this.state.isConfirmation
                  ? "Confirm PIN"
                  : "Create PIN"}
              </Text>
              <PinIndicator length={pinCode.length} />
            </View>
            
            <PinKeyboard
              onBackPress={this.onBackPress}
              onKeyPress={this.onKeyPress}
              showBackButton={pinCode.length > 0}
              isDisabled={this.state.isDisabled}
            />
          </View>
          
          {IsFooter}
          
        </SafeAreaView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  pinCode: state.pinCode,
  currentRoute: state.currentRoute,
});

const mapDispatchToProps = dispatch => ({
  setPinCode: pinCode => dispatch({ type: SET_PIN_CODE, pinCode }),
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateWallet);
