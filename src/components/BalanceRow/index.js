import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Picker, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text } from '../index';
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
  tokenTitle: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenText: {
    color: '#fff',
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
    onTokenChangeIconPress: PropTypes.func.isRequired,
    tokenChange: PropTypes.func.isRequired,
  };

  toggleModal = (transactionDetails) => {
    this.setState({ isModalVisible: !this.state.isModalVisible, data: transactionDetails });
  }
  // tokenChange = (data) => {
  //   console.log('token change balancerow', this.props);
  //   this.props.tokenChange(data)
  // }

  render() {
    const {
      currentBalance,
      selectedToken,
      onTokenChangeIconPress,
      tokenChange
    } = this.props;

    return (
      <View style={styles.container}>

      {/* <Picker
        selectedValue={selectedToken.name}
        style={{width: '100%', height: 50}}
        onValueChange={(itemValue, itemIndex) => tokenChange(itemValue)}>
        <Picker.Item label="XDC" value="xdc" />
        <Picker.Item label="ETH" value="eth" />
      </Picker> */}

      <TouchableHighlight onPress={() => this.toggleModal(null)} style={styles.tokensWrap}>
        <View style={styles.tokenTitle}>
          <Text style={styles.tokenText} letterSpacing={1}>
            {selectedToken.name}
          </Text>
          <View>
            <Image source={switchIcon} style={styles.switchIcon} />
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

        {/* <View style={styles.balanceContainer}>
          <Text style={styles.balance} letterSpacing={1}>
            {currentBalance.usdBalance.toFixed(2)}
          </Text>
          <Text style={styles.coinSymbol} letterSpacing={2}>
            {selectedToken.currencySymbol}
          </Text>
        </View>
        
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={onTokenChangeIconPress}>
            <Image source={switchIcon} style={styles.switchIcon} />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedToken: state.selectedToken,
});

export default connect(mapStateToProps)(BalanceRow);
