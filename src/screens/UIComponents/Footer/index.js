import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_CURRENT_ROUTE } from '../../../config/actionTypes';
import { Text } from '../../../components';
import sendIcon from './images/send.png';
import qrcodeIcon from './images/qrcode.png';
import transfer from './images/transfer.png';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  gradientHeader: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'relative',
  },
  gradientHeaderShadow: {
    position: 'absolute',
    width: '92%',
    marginLeft: '4%',
    top: -10,   
    height: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  gradientHeaderShadowTwo: {
    position: 'absolute',
    width: '86%',
    marginLeft: '7%',
    top: -20,   
    height: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonIcon: {
    height: 18,
    width: 18,
  },
  buttonText: {
    color: '#9D9D9D',
    paddingTop: 5,
  },
  button: {
    alignItems: 'center',
    borderColor: '#3C3749',
    paddingVertical: 15,
    width: '25%',
  },
  sendButton: {
    // borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: '#fff',
  },
  receiveButton: {
    // borderLeftWidth: 1,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#fff',
  }
});

class Footer extends Component {
  static propTypes = {
    onReceivePress: PropTypes.func.isRequired,
    onSendPress: PropTypes.func.isRequired,
    onHomePress: PropTypes.func.isRequired,
    onTransactionsPress: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
  };

  onHomePress = () => {
    this.props.setRoute('WalletHome');
    this.props.onHomePress();
  }

  onSendPress = () => {
    this.props.setRoute('Send');
    this.props.onSendPress();
  }

  onReceivePress = () => {
    this.props.setRoute('Receive');
    this.props.onReceivePress();
  }

  onTransactionsPress = () => {
    this.props.setRoute('WalletTransactions');
    this.props.onTransactionsPress();
  }

  render() {
    const { onReceivePress, onSendPress, onHomePress, onTransactionsPress, activeTab } = this.props;

    let activeTabStyle = [styles.button, styles.activeTab];
    let normalTabStyle = [styles.button];

    return (
      <LinearGradient
                colors={['#254a81', '#254a81']}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientHeader}
              >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.onHomePress}
            style={activeTab === "WalletHome" ? activeTabStyle : normalTabStyle}
          >
            <Image style={styles.buttonIcon} source={qrcodeIcon} />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          

          <TouchableOpacity
            onPress={this.onSendPress}
            style={activeTab === "Send" ? activeTabStyle : normalTabStyle}
          >
            <Image style={styles.buttonIcon} source={sendIcon} />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onReceivePress}
            style={activeTab === "Receive" ? activeTabStyle : normalTabStyle}
          >
            <Image style={styles.buttonIcon} source={qrcodeIcon} />
            <Text style={styles.buttonText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onTransactionsPress}
            style={activeTab === "WalletTransactions" ? activeTabStyle : normalTabStyle}
          >
            <Image source={transfer} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Transactions</Text>
          </TouchableOpacity>
          
        </View>
        {/* <LinearGradient
            colors={['rgba(127,15,201,0.7)', 'rgba(77,0,255,0.7)']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientHeaderShadow}
          ></LinearGradient>
          <LinearGradient
            colors={['rgba(127,15,201,0.5)', 'rgba(77,0,255,0.5)']}
            locations={[0, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientHeaderShadowTwo}
          ></LinearGradient> */}
      </LinearGradient>
    );
  }
}



const mapDispatchToProps = dispatch => ({
  setRoute: route => dispatch({ type: SET_CURRENT_ROUTE, route })
});

export default connect(
  null,
  mapDispatchToProps,
)(Footer);