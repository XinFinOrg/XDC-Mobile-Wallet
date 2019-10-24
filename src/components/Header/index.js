import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Text from "../Text";
import qrarrow from "./images//ic_qr.png";
import menu from "./images/menu.png";
import Settings from "../../screens/Settings";

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#359ff8",
    zIndex: 100
  },
  centeredContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    backgroundColor: "#254a81",
    zIndex: 100
  },

  headerExtremity: {},

  headerText: {
    color: "#fff",
    fontSize: 27,
    fontFamily: "montserratregular",
    textAlign: "left",
    left: 5,
    marginBottom: 10
  },

  firstView: {
    flexDirection: "row"
  },
  headerArrow: {
    height: 22,
    marginVertical: 4,
    width: 22
  },

  headerQrArrow: {
    height: 40,
    marginVertical: 4,
    width: 40
  }
});

export default class Header extends Component {
  static propTypes = {
    onBackPress: PropTypes.func,
    hamBurgerPress: PropTypes.func,
    title: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired
  };

  static defaultProps = {
    onBackPress: null,
    hamBurgerPress: null
  };

  renderMainView() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.firstView}>
          <TouchableOpacity
            style={styles.headerExtremity}
            onPress={this.props.hamBurgerPress}
          >
            <Image source={menu} style={styles.headerArrow} />
          </TouchableOpacity>
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>
        <TouchableOpacity style={styles.headerExtremity} activeOpacity={0.8}>
          <Image source={qrarrow} style={styles.headerQrArrow} />
        </TouchableOpacity>
      </View>
    );
  }

  renderTitleView() {
    return (
      <View
        style={{
          alignItems: "center",
          alignContent: "center",
          backgroundColor: "#359ff8",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 27,
            fontFamily: "montserratregular",
            textAlign: "center"
          }}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
  renderView = condition => {
    if (condition === "Dashboard") {
      return this.renderMainView();
    } else if (condition === "Send") {
      return this.renderMainView();
    } else if (condition === "Transactions") {
      return this.renderMainView();
    } else if (condition === "Receive") {
      return this.renderMainView();
    } else if (condition === "Create PIN") {
      return this.renderTitleView();
    } else if (condition === "Repeat PIN") {
      return this.renderTitleView();
    } else if (condition === "Enter Pin") {
      return this.renderTitleView();
    }
  };
  render() {
    return <View>{this.renderView(this.props.title)}</View>;
  }
}
