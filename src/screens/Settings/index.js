import React, { Component } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";
import {NavigationActions} from 'react-navigation';
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GradientBackground, Header, Text } from "../../components";
import { LOGOUT, SET_CURRENT_ROUTE, DARK_THEME } from "../../config/actionTypes";
import { persistor } from "../../config/store";
import Passcode from "./Images/ic_passcode.png";
import Community from "./Images/ic_community.png";
import LoginWebWallet from "./Images/ic_loginwebwallet.png";
import Terms from "./Images/ic_terms.png";
import Support from "./Images/ic_support.png";
import Logout from "./Images/ic_logout.png";
import _addToken from "./Images/addtoken.png";
import _privateKey from "./Images/private.png";
import _currency from "./Images/webwallet.png";
import _createNewToken from "./Images/createNewToken.png";
import _defaultCurrency from "./Images/defaultCurrency.png";
import _masterNode from "./Images/masterNode.png";

import useTheme from './AppStyles';

class Settings extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired
    }).isRequired,
    network: PropTypes.string.isRequired
  };

  navigateToScreen = (route, editMode) => () => {
    const navigateAction = NavigationActions.navigate({
        routeName: route,
        params: {
            editMode: editMode
        },
    });
    this.props.setRoute(route);

    if(route === "PrivateKey" || route === "CreateWallet") {
        this.props.navigation.navigate('PinCode');
    } else {
        this.props.navigation.dispatch(navigateAction);
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

  onReceivePress = () => {
    this.props.setRoute("Receive");
    this.props.navigation.navigate("Receive")
  };

  onHamBurgerPress = () => {
    this.props.setRoute("Settings");
    this.props.navigation.navigate("Settings")
  };

  toggleTheme = () => {
    console.log('Dark Theme::', !this.props.darkTheme)
    this.props.setDarkTheme(!this.props.darkTheme)
  }

  render() {
    // console.log('settings>>>>>>>>>>>>>>', this.props.darkTheme);
    const styles = useTheme(this.props.darkTheme);
    // console.log('@@@@@@@@@@@@@@@@@@', styles)
    return (
      <GradientBackground>
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <LinearGradient
            colors={['#359ff8', '#325efd']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{flex: 1}}
          >
            <Header
              hamBurgerPress={() => this.goBack()}
              onBackPress={() => this.goBack()}
              title="Settings"
            />
            <ScrollView style={styles.backWrap}>
            {this.menuTitle("SECURITY")}
            <View style={styles.settingsContainer} >
              <TouchableOpacity
                    underlayColor="transparent"
                    style = {styles.settingsContainer}
                    onPress = {this.navigateToScreen('CreateWallet', false)} >
                <View style={styles.settingsPadding} >
                  <Image source={Passcode} style={styles.ImageWidth} />
                </View>
                <View style={styles.buttonCont} >
                  <Text style={styles.linkText}>Change Pin</Text>
                </View>
              </TouchableOpacity>
            </View>

            {this.subMenu(styles, "ExportPrivateKey", "Export Private Key", 'PrivateKey', false, null)}

            {this.menuTitle(styles, "APP")}

            <TouchableOpacity
                      underlayColor="transparent"
                      style={styles.settingsContainer}
                      onPress = { () => 
                          Alert.alert(
                            'Change Theme',
                            `Do you want to change the theme from ${this.props.darkTheme ? 'Dark to Light' : 'Light to Dark'}?`,
                            [
                              {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                              },
                              {
                                text: 'OK',
                                onPress: async () => {
                                  await this.toggleTheme();
                                },
                              },
                            ],
                            { cancelable: false },
                          )
                      }
                  >
              <View style={styles.settingsPadding} >
                <Image source={_addToken} style={styles.ImageWidth} />
              </View>
              <View style={styles.buttonCont} >
                <Text style={styles.linkText}>Change Theme</Text>
              </View>
            </TouchableOpacity>

            {this.subMenu(styles, "CreateNewToken", "Create New Token", 'https://www.mycontract.co', true, null)}

            {this.subMenu(styles, "CreateStableCoin", "Create Stable Coin", 'https://st.mycontract.co', true, null)}

            {this.subMenu(styles, "AddNewToken", "Add New Token", 'AddToken', false, null)}

            {this.subMenu(styles, "SetDefaultCurrency", "Set Default Currency", 'CurrencyPicker', false, null)}

            {this.subMenu(styles, "LoginWebWallet", "Login To Web Wallet", 'https://xinfin.network/#webWallet', true, null)}

            {this.menuTitle(styles, "ABOUT")}

            {this.subMenu(styles, "setUpMasterNode", "Set Up MasterNode", 'https://www.xinfin.org/setup-masternode.php', true, null)}

            {this.subMenu(styles, "Support", "Support", 'https://xinfin.org/contactus.php', true, null)}

            {this.subMenu(styles, "Logout", "Log Out", '', false, 'logout')}

            <Text style={styles.xdcText}>
              XDC Wallet
            </Text>
          </ScrollView>
          </LinearGradient>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  menuTitle(styles, heading) {
    return (
      <View style={styles.menuTitleWrap}>
        <Text style={styles.menuTitleText}>
          {heading}
        </Text>
      </View>
    );
  }

  subMenu(styles, image, headingTitle, headingScreen, isExternal, isLogout) {
    if (image === "Community") {
      image = Community;
    } else if (image === "LoginWebWallet") {
      image = LoginWebWallet;
    } else if (image === "Terms") {
      image = Terms;
    } else if (image === "Support") {
      image = Support;
    } else if (image === "AddNewToken") {
      image = _addToken;
    } else if (image === "SetDefaultCurrency") {
      image = _defaultCurrency;
    } else if (image === "ExportPrivateKey") {
      image = _privateKey;
    } else if (image === "CreateNewToken") {
      image = _createNewToken;
    } else if (image === "CreateStableCoin") {
      image = _createNewToken;
    } else if (image === "setUpMasterNode") {
      image = _masterNode;
    } else if (image === "Logout") {
      image = Logout;
    }

    let settingText;
    if(isLogout == "logout") {
      settingText = <TouchableOpacity
                      underlayColor="transparent"
                      style={styles.settingsContainer}
                      onPress = { () => 
                          Alert.alert(
                            'Logout',
                            'Your wallet will be erased from your device. Make sure to backup your private key before going further.',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => {},
                                style: 'cancel',
                              },
                              {
                                text: 'OK',
                                onPress: async () => {
                                  await this.props.logout();
                                  this.props.navigation.navigate('Home');
                                },
                              },
                            ],
                            { cancelable: false },
                          )
                      }
                  >
                    <View style={styles.settingsPadding} >
                      <Image source={image} style={styles.ImageWidth} />
                    </View>
                    <View style={styles.buttonCont} >
                      <Text style={styles.linkText}>Logout</Text>
                    </View>
                  </TouchableOpacity>
    } else {
      if(isExternal) {
        settingText = <TouchableOpacity
                      underlayColor="transparent"
                      style={styles.settingsContainer}
                      onPress = {() => {Linking.openURL(headingScreen)}} >
                        <View style={styles.settingsPadding} >
                          <Image source={image} style={styles.ImageWidth} />
                        </View>
                        <View style={styles.buttonCont} >
                          <Text style={styles.linkText}>{headingTitle}</Text>
                        </View>
                      </TouchableOpacity>
      } else {
        settingText = <TouchableOpacity
                        underlayColor="transparent"
                        style={styles.settingsContainer}
                        onPress = {this.navigateToScreen(headingScreen, false)} >
                        <View style={styles.settingsPadding} >
                          <Image source={image} style={styles.ImageWidth} />
                        </View>
                        <View style={styles.buttonCont} >
                          <Text style={styles.linkText}>{headingTitle}</Text>
                        </View>
                      </TouchableOpacity>
      }
    }

    return (
      <View style={styles.settingsContainer} >
        {settingText}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  network: state.network,
  darkTheme: state.darkTheme,
});

const mapDispatchToProps = dispatch => ({
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
  setDarkTheme: darkTheme => dispatch({ type: DARK_THEME, darkTheme }),
  logout: async () => {
    dispatch({ type: LOGOUT });
    await persistor.flush();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
