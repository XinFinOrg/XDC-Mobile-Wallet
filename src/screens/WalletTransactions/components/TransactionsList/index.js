import React, { Component } from "react";
import {
  FlatList,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { Text } from "../../../../components";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
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
  container: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 10,
    backgroundColor: "#fff"
  },

  containerInside: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
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
    fontSize: 16,
    fontFamily: "Roboto"
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  createWalletBtn: {
    height: 40,
    width: '50%',
    alignItems: "center",
    borderRadius: 30,
    fontFamily: "montserratregular",
    backgroundColor: "#359cf8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  createButtonText: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  timeText: {
    fontSize: 12
  },
  fontSend: {
    fontSize: 14,
    fontFamily: "bold",
    color: "#ff9b22"
  },
  fontReceive: {
    fontSize: 14,
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
              data={transactions}
              ListEmptyComponent={
                <View style={styles.itemContainer}>
                      <View
                        style={{
                          height: 50,
                          flex: 1,
                          flexDirection: "row",
                          alignContent: "center",
                          alignItems: "center"
                        }}
                      >
                      <Text style={styles.emptyListText}>No transactions to show</Text>
                    </View>
                </View>
              }
              keyExtractor={item => item.transactionHash}
              onRefresh={onRefresh}
              refreshing={refreshing}
              renderItem={({ item }) => (
                <View>
                   <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.toggleModal(item)}>
                    <View style={styles.itemContainer}>
                      <View
                        style={{
                          height: 50,
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
                              width: 20,
                              height: 20
                            }}
                            source={
                              item.from === walletAddress ? send : receive
                            }
                          />
                        </View>
                        <View
                          style={{
                            flex: 0.6,
                            paddingLeft: 20,
                            paddingRight: 10,
                            flexDirection: "column",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "bold",
                              color: "#000"
                            }}
                          >
                            {item.from === walletAddress ? 'Sent' : 'Received'}
                          </Text>
                          <Text style={{ fontSize: 12 }}>From : {item.from}</Text>
                        </View>
                        <View style={{ flex: 0.3, flexDirection: "column" }}>
                          <Text
                            style={
                              item.from === walletAddress
                                ? styles.fontSend
                                : styles.fontReceive
                            }
                          >
                            {item.from === walletAddress
                              ? `- ${item.value} ${selectedToken.symbol}`
                              : `+ ${item.value} ${selectedToken.symbol}`}
                          </Text>
                          <Text style={styles.timeText}>{moment(item.timestamp * 1000).fromNow()} </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>

                  <Modal 
                    onBackdropPress={() => this.toggleModal(null)}
                    isVisible={this.state.isModalVisible} 
                    style={styles.ModalContainer}>
                    <View style={styles.ModalView}>
                      <Text style={styles.ModalItem}>
                        <Text style={styles.ModalItemTitle}>To: </Text>{this.state.data ? 'xdc' + this.state.data.to.substring(2) : ''}
                      </Text>
                      <Text style={styles.ModalItem}>
                        <Text style={styles.ModalItemTitle}>Time: </Text>{this.state.data ? moment(this.state.data.timestamp * 1000).fromNow() : ''}
                      </Text>
                      <Text style={styles.ModalItem}>
                        <Text style={styles.ModalItemTitle}>Hash: </Text>{this.state.data ? this.state.data.transactionHash : ''}
                      </Text>
                      <Text style={styles.ModalItem}>
                        <Text style={styles.ModalItemTitle}>Amount: </Text>{this.state.data ? this.state.data.value : ''}
                      </Text>
                      <Text style={styles.ModalItem}>
                        <Text style={styles.ModalItemTitle}>Status: </Text>Completed
                      </Text>

                      <View style={styles.buttonContainer}>
                        <TouchableHighlight
                          activeOpacity={0.8}
                          onPress={() => this.toggleModal(null)}
                          style={styles.createWalletBtn}
                        >
                          <View>
                            <Text style={styles.createButtonText}>Close</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </Modal>
                </View>
              )}
            />
    );  
  }
}
