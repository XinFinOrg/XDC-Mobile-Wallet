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
import {NavigationActions, DrawerItems, DrawerItem} from 'react-navigation';
import LinearGradient from "react-native-linear-gradient";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GradientBackground, Header, Menu, Text } from "../../components";
import { LOGOUT, SET_CURRENT_ROUTE } from "../../config/actionTypes";
import { persistor } from "../../config/store";
import Footer from "../UIComponents/Footer/index";
import { DrawerActions } from "react-navigation";
import back from "./Images/ic_back.png";
import bell from "./Images/ic_bell.png";
import next from "./Images/ic_next.png";
import circle from "./Images/ic_circle.png";
import Passcode from "./Images/ic_passcode.png";
import Community from "./Images/ic_community.png";
import LoginWebWallet from "./Images/ic_loginwebwallet.png";
import Terms from "./Images/ic_terms.png";
import Support from "./Images/ic_support.png";
import Setting from "./Images/ic_setting.png";
import Logout from "./Images/ic_logout.png";
import _addToken from "./Images/addtoken.png";
import _privateKey from "./Images/private.png";
import _currency from "./Images/webwallet.png";
import _createNewToken from "./Images/createNewToken.png";
import _defaultCurrency from "./Images/defaultCurrency.png";
import _masterNode from "./Images/masterNode.png";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#359ff8",
    zIndex: 100
  },
  networkNameContainer: {
    alignItems: "center"
  },
  networkName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto"
  },
  headerText: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "montserratregular",
    textAlign: "left",
    left: 20
  },
  headerArrow: {
    height: 22,
    marginVertical: 4,
    width: 22
  },
  settingsContainer: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  settingsPadding: {
    padding: 10,
    paddingLeft: 10,
  },
  bellImage: {
    width: 20,
    height: 20
  },
  ImageWidth: {
    width: 20,
    height: 20
  },
  ImageWidthEnd: {
    width: 20,
    height: 20,
    alignSelf: "flex-end"
  },
  buttonCont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center"
  },
  linkText: {
    textAlign: 'left',
  },
  iconCont: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  xdcText: { fontSize: 18, textAlign: "center", paddingVertical: 20 },
  menuTitleWrap: { paddingTop: 15, marginLeft: 10, paddingBottom: 15 },
  menuTitleText: { color: "#000000", fontSize: 18, fontFamily: "bold" },

});

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

  menuOptions = [
    {
      title: "Change PIN",
      onPress: () => {
        this.props.navigation.navigate("CreateWallet", {
          editMode: true
        });
      }
    },
    {
      title: "Change network",
      onPress: () => {
        this.props.navigation.navigate("NetworkPicker");
      }
    },
    {
      title: "View private key",
      onPress: () => {
        this.props.navigation.navigate("PrivateKey");
      }
    },
    {
      title: "Logout",
      onPress: () => {
        Alert.alert(
          "Logout",
          "Your wallet will be erased from your device. Make sure to backup your private key before going further.",
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel"
            },
            {
              text: "OK",
              onPress: async () => {
                await this.props.logout();

                this.props.navigation.navigate("Welcome");
              }
            }
          ],
          { cancelable: false }
        );
      }
    }
  ];

  getNetworkName = () => {
    switch (this.props.network) {
      // case 'ropsten':
      //   return 'ETH Ropsten';
      // case 'kovan':
      //   return 'ETH Kovan';
      // case 'rinkeby':
      //   return 'ETH Rinkeby';
      default:
        return "XDC [public]";
    }
  };

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

  render() {
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
            <ScrollView style={{ backgroundColor: "#f3f3f5" }}>
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

                  {/* <View style={styles.iconCont} >
                    <Image source={next} style={styles.ImageWidthEnd} />
                  </View> */}
                </View>
              </TouchableOpacity>
            </View>

            {this.subMenu("ExportPrivateKey", "Export Private Key", 'PrivateKey', false, null)}

            {this.menuTitle("APP")}

            {this.subMenu("CreateNewToken", "Create New Token", 'https://www.mycontract.co', true, null)}

            {this.subMenu("CreateStableCoin", "Create Stable Coin", 'https://st.mycontract.co', true, null)}

            {this.subMenu("AddNewToken", "Add New Token", 'AddToken', false, null)}

            {this.subMenu("SetDefaultCurrency", "Set Default Currency", 'CurrencyPicker', false, null)}

            {this.subMenu("LoginWebWallet", "Login To Web Wallet", 'https://xinfin.network/#webWallet', true, null)}

            {this.menuTitle("ABOUT")}

            {this.subMenu("setUpMasterNode", "Set Up MasterNode", 'https://www.xinfin.org/setup-masternode.php', true, null)}

            {this.subMenu("Support", "Support", 'https://xinfin.org/contactus.php', true, null)}

            {this.subMenu("Logout", "Log Out", '', false, 'logout')}

            <Text style={styles.xdcText}>
              XDC Wallet
            </Text>
          </ScrollView>
          </LinearGradient>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  menuTitle(heading) {
    return (
      <View style={styles.menuTitleWrap}>
        <Text style={styles.menuTitleText}>
          {heading}
        </Text>
      </View>
    );
  }

  subMenu(image, headingTitle, headingScreen, isExternal, isLogout) {
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
                          {/* <Text style={{ fontSize: 16 }}>{headingTitle}</Text> */}
                          <Text style={styles.linkText}>{headingTitle}</Text>
                          {/* <View style={{ alignContent: "center", alignItems: "center" }} >
                            <Image source={next} style={styles.ImageWidthEnd} ></Image>
                          </View> */}
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
                          {/* <Text style={{ fontSize: 16 }}>{headingTitle}</Text> */}
                          <Text style={styles.linkText}>{headingTitle}</Text>
                          {/* <View style={{ alignContent: "center", alignItems: "center" }} >
                            <Image source={next} style={styles.ImageWidthEnd} ></Image>
                          </View> */}
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
  network: state.network
});

const mapDispatchToProps = dispatch => ({
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route }),
  logout: async () => {
    dispatch({ type: LOGOUT });
    await persistor.flush();
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
