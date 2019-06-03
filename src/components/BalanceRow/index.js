import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, Picker, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Text } from '../index';
import Modal from 'react-native-modal'
import TokenPicker from '../../screens/TokenPicker';

import switchIcon from './images/switch.png';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'transparent',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  balance: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingRight: 5,
  },
  coinSymbol: {
    alignSelf: 'flex-end',
    color: '#fff',
    fontSize: 15,
    paddingBottom: 2,
    paddingLeft: 10,
  },
  switchIcon: {
    height: 24,
    marginRight: 20,
    marginTop: 1,
    width: 24,
  },
  tokensWrap: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    padding: 5,
  },
  balanceRow: {
    padding: 5,
  },
  tokenTitle: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenBalance: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tokenText: {
    color: '#fff',
    fontFamily: 'Roboto',
  },
  ModalContainer: {
    backgroundColor: 'transparent',
    padding: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalView: {
    backgroundColor: '#fff',
    width: '90%',
    height: 200,
  },
});

class BalanceRow extends Component {
  state = {
    isModalVisible: false,
    data: null
  };
  static propTypes = {
    currentBalance: PropTypes.object.isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
    }).isRequired,
  };

  toggleModal = (transactionDetails) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, data: transactionDetails });
  }

  render() {
    const {
      currentBalance,
      selectedToken,
    } = this.props;
    return (
      <View style={styles.container}>

        <TouchableHighlight onPress={() => this.toggleModal(null)} style={styles.tokensWrap}>
          <View style={styles.balanceRow}>
            <View style={styles.tokenBalance}>
              <Text style={styles.tokenText}>
                {currentBalance.balance} {selectedToken.name}
              </Text>
            </View>

            <View style={styles.tokenTitle}>
              <Text style={styles.tokenText}>
                {selectedToken.type ? selectedToken.type : selectedToken.name}
              </Text>
              <View>
                <Image source={switchIcon} style={styles.switchIcon} />
              </View>
            </View> 
          </View>
        </TouchableHighlight>

        <Modal 
          onBackdropPress={() => this.toggleModal(null)}
          isVisible={this.state.isModalVisible} 
          style={styles.ModalContainer}>
          {/* <View style={styles.ModalView}> */}
            <TokenPicker toggleModal={this.toggleModal} />
          {/* </View> */}
        </Modal>

      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   selectedToken: state.selectedToken,
// });

export default BalanceRow;
