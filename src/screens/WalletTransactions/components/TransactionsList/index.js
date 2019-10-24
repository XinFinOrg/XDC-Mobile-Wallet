import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableHighlight,
  Image
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { Text } from "../../../../components";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import { stat } from "fs";
import customData from "../TransactionsList/data.json";
import send from "../TransactionsList/Send.png";
import receive from "../TransactionsList/Receive.png";

const styles = StyleSheet.create({
  // itemContainer: {
  //   borderBottomWidth: 1,
  //   borderColor: "#372F49",
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   paddingHorizontal: 15,
  //   paddingVertical: 10
  // },

  itemContainer: {
    flex: 1,
    borderRadius: 3,
    paddingLeft: 17,
    paddingRight: 17,
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    backgroundColor: "#ffffff"
  },

  itemTitle: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Roboto"
  },
  itemStatus: {
    color: "#000",
    fontSize: 15,
    paddingTop: 5,
    fontFamily: "Roboto"
  },
  itemAmountContainer: {
    flexDirection: "row"
  },
  itemAmountSymbol: {
    color: "#000",
    fontSize: 20,
    paddingRight: 5,
    fontFamily: "Roboto"
  },
  itemAmount: {
    color: "#000",
    fontSize: 20,
    textAlign: "right",
    fontFamily: "Roboto"
  },
  itemTimestamp: {
    color: "#000",
    fontSize: 15,
    paddingTop: 5,
    textAlign: "right",
    fontFamily: "Roboto"
  },
  emptyListText: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 20,
    fontFamily: "Roboto"
  },
  ModalView: {
    backgroundColor: "#fff",
    padding: 20
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
    paddingVertical: 15,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Roboto"
  },

  fontSend: {
    fontSize: 20,
    fontFamily: "bold",
    color: "#ff9b22"
  },
  fontReceive: {
    fontSize: 20,
    fontFamily: "bold",
    color: "#15d291"
  }
});

export default class TransactionsList extends Component {
  state = {
    isModalVisible: false,
    data: null,
    walletAddress: "",
    value: "",
    price: "",
    Time: ""
  };

  static propTypes = {
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    selectedToken: PropTypes.shape({
      symbol: PropTypes.string.isRequired
    }).isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        transactionHash: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired
      })
    ).isRequired,
    walletAddress: PropTypes.string.isRequired
  };

  toggleModal = transactionDetails => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      data: transactionDetails
    });
  };

  render() {
    const {
      onRefresh,
      refreshing,
      selectedToken,
      transactions,
      walletAddress
    } = this.props;

    return (
      <FlatList
        data={customData}
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyListText}>No transactions to show</Text>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight>
              <View style={styles.itemContainer}>
                <View
                  style={{
                    height: 70,
                    flex: 1,
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      flex: 0.1,
                      width: "100%",
                      alignContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 30
                      }}
                      source={
                        item.wallet_Address === "Receive" ? receive : send
                      }
                    />
                  </View>
                  <View
                    style={{
                      flex: 0.6,
                      paddingLeft: 20,
                      flexDirection: "column"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "bold",
                        color: "#000000"
                      }}
                    >
                      {item.wallet_Address}
                    </Text>
                    <Text style={{ fontSize: 16 }}>From : {item.value}</Text>
                  </View>
                  <View style={{ flex: 0.3, flexDirection: "column" }}>
                    <Text
                      style={
                        item.wallet_Address === "Receive"
                          ? styles.fontReceive
                          : styles.fontSend
                      }
                    >
                      {item.wallet_Address === "Receive"
                        ? "+ " + item.price + " XDC"
                        : "- " + item.price + " XDC"}
                    </Text>
                    <Text>{item.Time} </Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />
    );
  }
}
