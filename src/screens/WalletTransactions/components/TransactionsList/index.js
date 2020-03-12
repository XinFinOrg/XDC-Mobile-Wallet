import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text as RNText,
  Linking,
} from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { Text } from "../../../../components";
import Modal from "react-native-modal";
import send from "../TransactionsList/Send.png";
import receive from "../TransactionsList/Receive.png";
import {dimHeight} from '../../../../utils/constants';

import useTheme from './AppStyles';

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
    darkTheme: PropTypes.bool,
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
    const styles = useTheme(this.props.darkTheme);

    let {
      onRefresh,
      refreshing,
      selectedToken,
      transactions,
      walletAddress,
      darkTheme
    } = this.props;

    if(selectedToken.network != 'public') {
      if(walletAddress.substring(0, 2) === '0x') {
        walletAddress = 'xdc' + walletAddress.substring(2)
      }
    }

    let API_URL;
    const txHash = this.state.data ? this.state.data.transactionHash : '';
    if(selectedToken.network == 'mainnet') {
      API_URL = `https://explorer.xinfin.network/tx/${txHash}`;
    } else if(this.props.selectedToken.network == 'private') {
      API_URL = `https://explorer.apothem.network/tx/${txHash}`;
    } else if(this.props.selectedToken.network == 'public') {
      API_URL = `https://etherscan.io/tx/${txHash}`;
    }

    return (
          <>
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
                    underlayColor="transparent"
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
                              width: 21,
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
                              color: `${darkTheme ? "#fff" : '#000'}`
                            }}
                          >
                            {item.from === walletAddress ? 'Sent' : 'Received'}
                          </Text>
                          <Text style={{ fontSize: 12, color: `${darkTheme ? "#fff" : '#000'}` }}>From : {item.from}</Text>
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
                          <Text style={{fontSize: 12, color: `${darkTheme ? "#fff" : '#000'}`}}>{moment(item.timestamp * 1000).fromNow()} </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            
            <Modal 
              onBackdropPress={() => this.toggleModal(null)}
              deviceHeight={dimHeight}
              isVisible={this.state.isModalVisible} 
              style={styles.ModalContainer}>
              <View style={styles.ModalView}>
                <Text style={styles.ModalItem}>
                  <Text style={styles.ModalItemTitle}>To: </Text>{this.state.data ? this.state.data.to : ''}
                </Text>
                <Text style={styles.ModalItem}>
                  <Text style={styles.ModalItemTitle}>Time: </Text>{this.state.data ? moment(this.state.data.timestamp * 1000).fromNow() : ''}
                </Text>
                <Text style={styles.ModalItem}>
                  <RNText style={styles.ModalItemTitle} onPress = {() => {Linking.openURL(API_URL)}}>Hash: <Text style={styles.ModalItemTitleLink}>{this.state.data ? this.state.data.transactionHash : ''}</Text></RNText>
                </Text>
                <Text style={styles.ModalItem}>
                  <Text style={styles.ModalItemTitle}>Amount: </Text>{this.state.data ? this.state.data.value : ''}
                </Text>
                <Text style={styles.ModalItem}>
                  <Text style={styles.ModalItemTitle}>Status: </Text>Completed
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    underlayColor="transparent"
                    activeOpacity={0.8}
                    onPress={() => this.toggleModal(null)}
                    style={styles.createWalletBtn}
                  >
                    <View>
                      <Text style={styles.createButtonText}>Close</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
    );  
  }
}
