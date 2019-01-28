import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
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
    ontransactionsPress: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
  };

  render() {
    const { onReceivePress, onSendPress, onHomePress, ontransactionsPress, activeTab } = this.props;

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
            onPress={onHomePress}
            style={activeTab === "home" ? activeTabStyle : normalTabStyle}
          >
            <Image style={styles.buttonIcon} source={qrcodeIcon} />
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          

          <TouchableOpacity
            onPress={onSendPress}
            style={activeTab === "send" ? activeTabStyle : normalTabStyle}
          >
            <Image style={styles.buttonIcon} source={sendIcon} />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onReceivePress}
            style={activeTab === "receive" ? activeTabStyle : normalTabStyle}
          >
            <Image style={styles.buttonIcon} source={qrcodeIcon} />
            <Text style={styles.buttonText}>Receive</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ontransactionsPress}
            style={activeTab === "transactions" ? activeTabStyle : normalTabStyle}
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


export default Footer;