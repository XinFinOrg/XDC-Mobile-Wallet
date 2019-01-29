import React, { Component } from 'react';
import { FlatList, StyleSheet, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Text } from '../../../../components';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: 1,
    borderColor: '#372F49',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 30,
  },
  itemTitle: {
    color: '#fff',
    fontSize: 20,
  },
  itemStatus: {
    color: '#aaa',
    fontSize: 15,
    paddingTop: 5,
  },
  itemAmountContainer: {
    flexDirection: 'row',
  },
  itemAmountSymbol: {
    color: '#4D00FF',
    fontSize: 20,
    paddingRight: 5,
  },
  itemAmount: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'right',
  },
  itemTimestamp: {
    color: '#aaa',
    fontSize: 15,
    paddingTop: 5,
    textAlign: 'right',
  },
  emptyListText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 20,
  },
  ModalView: {
    backgroundColor: '#fff',
    padding: 20,
  },
  ModalItem: {
    padding: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  ModalItemTitle: {
    color: '#000',
    fontSize: 18
  },
  ModalClose: {
    width: '90%',
    marginLeft: '5%',
    marginTop: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  ModalCloseButton: {
    textAlign: 'center',
    paddingVertical: 15,
    color: '#fff',
    fontSize: 20,
  }
});

export default class TransactionsList extends Component {
  state = {
    isModalVisible: false,
    data: null
  };

  static propTypes = {
    onRefresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    selectedToken: PropTypes.shape({
      symbol: PropTypes.string.isRequired,
    }).isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        transactionHash: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        timestamp: PropTypes.string.isRequired,
      }),
    ).isRequired,
    walletAddress: PropTypes.string.isRequired,
  };

  toggleModal = (transactionDetails) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, data: transactionDetails });
  }

  render() {
    const {
      onRefresh,
      refreshing,
      selectedToken,
      transactions,
      walletAddress,
    } = this.props;

    return (
      <FlatList
        data={transactions}
        keyExtractor={item => item.transactionHash}
        ListEmptyComponent={
          <View>
            <Text style={styles.emptyListText}>No transactions to show</Text>
          </View>
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <View>
            <TouchableHighlight onPress={() => this.toggleModal(item)}>
              <View style={styles.itemContainer}>
                <View>
                  <Text style={styles.itemTitle}>
                    {item.from === walletAddress
                      ? `Send ${selectedToken.symbol}`
                      : `Received ${selectedToken.symbol}`}
                  </Text>
                  <Text style={styles.itemStatus}>Completed</Text>
                </View>
                <View>
                  <View style={styles.itemAmountContainer}>
                    <Text style={styles.itemAmountSymbol}>
                      {item.from === walletAddress ? '-' : '+'}
                    </Text>
                    <Text style={styles.itemAmount}>
                      {`${item.value} ${selectedToken.symbol}`}
                    </Text>
                  </View>
                  <Text style={styles.itemTimestamp}>
                    {moment(item.timestamp * 1000).fromNow()}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            
            <Modal 
              onBackdropPress={() => this.toggleModal(null)}
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
                  <Text style={styles.ModalItemTitle}>Hash: </Text>{this.state.data ? this.state.data.transactionHash : ''}
                </Text>
                <Text style={styles.ModalItem}>
                  <Text style={styles.ModalItemTitle}>Amount: </Text>{this.state.data ? this.state.data.value : ''}
                </Text>
                <Text style={styles.ModalItem}>
                  <Text style={styles.ModalItemTitle}>Status: </Text>Completed
                </Text>
                <LinearGradient
                  colors={['#7f0fc9', '#4d00ff']}
                  locations={[0, 1]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.ModalClose}
                >
                  <TouchableHighlight
                    activeOpacity={0.8}
                    onPress={() => this.toggleModal(null)}
                  >
                    <View>
                      <Text style={styles.ModalCloseButton}>Close</Text>
                    </View>
                  </TouchableHighlight>
                </LinearGradient>
              </View>
            </Modal>

          </View>
        )}
      />
    );
  }
}
