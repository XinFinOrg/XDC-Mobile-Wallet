import React, { Component } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { GradientBackground, Header, Menu, Text } from "../../components";
import { LOGOUT } from "../../config/actionTypes";
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
  }
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

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity>
              <Image source={back} style={styles.headerArrow} />
            </TouchableOpacity>

            <Text style={styles.headerText}>Setting</Text>
          </View>
          <ScrollView style={{ backgroundColor: "#f3f3f5" }}>
            {this.renderHeading("SECURITY")}
            <View
              style={{
                flex: 1,
                height: 50,
                flexDirection: "row",
                backgroundColor: "#ffffff",
                alignContent: "center",
                alignItems: "center",
                marginBottom: 4
              }}
            >
              <View
                style={{
                  padding: 10,
                  paddingLeft: 10
                }}
              >
                <Image
                  source={bell}
                  style={{
                    width: 30,
                    height: 30
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 22 }}>Enable Notification</Text>

                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={next}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "flex-end"
                    }}
                  ></Image>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                height: 50,
                flexDirection: "row",
                backgroundColor: "#ffffff",
                alignContent: "center",
                alignItems: "center",
                marginBottom: 4
              }}
            >
              <View
                style={{
                  padding: 10,
                  paddingLeft: 10
                }}
              >
                <Image
                  source={Passcode}
                  style={{
                    width: 30,
                    height: 30
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 22 }}>Create Passcode</Text>

                <View
                  style={{
                    alignContent: "center",
                    alignItems: "center",
                    flexDirection: "row"
                  }}
                >
                  <Image
                    source={circle}
                    style={{
                      width: 10,
                      height: 10
                    }}
                  />
                  <Image
                    source={next}
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: "flex-end"
                    }}
                  />
                </View>
              </View>
            </View>

            {this.renderHeading("ABOUT")}

            {this.renderView("Community", "Community")}

            {this.renderView("LoginWebWallet", "Login To Web Wallet")}

            {this.renderView("Terms", "Terms & Privacy")}

            {this.renderHeading("APP")}

            {this.renderView("Support", "Support")}

            {this.renderView("Setting", "Advanced Setting")}

            {this.renderView("Logout", "Log Out")}

            <Text style={{ fontSize: 18, textAlign: "center", paddingTop: 10 }}>
              XDC Wallet - V0.1.2
            </Text>
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    );
  }

  renderHeading(heading) {
    return (
      <View style={{ paddingTop: 15, marginLeft: 10, paddingBottom: 15 }}>
        <Text style={{ color: "#000000", fontSize: 18, fontFamily: "bold" }}>
          {heading}
        </Text>
      </View>
    );
  }

  renderView(image, headingTitle) {
    if (image === "Community") {
      image = Community;
    } else if (image === "LoginWebWallet") {
      image = LoginWebWallet;
    } else if (image === "Terms") {
      image = Terms;
    } else if (image === "Support") {
      image = Support;
    } else if (image === "Setting") {
      image = Setting;
    } else if (image === "Logout") {
      image = Logout;
    }
    return (
      <View
        style={{
          flex: 1,
          height: 50,
          flexDirection: "row",
          backgroundColor: "#ffffff",
          alignContent: "center",
          alignItems: "center",
          marginBottom: 4
        }}
      >
        <View
          style={{
            padding: 10,
            paddingLeft: 10
          }}
        >
          <Image
            source={image}
            style={{
              width: 30,
              height: 30
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ fontSize: 22 }}>{headingTitle}</Text>

          <View
            style={{
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={next}
              style={{
                width: 30,
                height: 30,
                alignSelf: "flex-end"
              }}
            ></Image>
          </View>
        </View>
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
