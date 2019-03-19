import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Modal from 'react-native-modal';
import Text from '../../../Text';
import arrowIcon from './images/arrow.png';
import touchIdIcon from './images/touchid.png';
import fingerPrint from './images/fingerPrint.png'

const styles = StyleSheet.create({
  keyboardKey: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 10,
  },
  textPlaceholder: {
    color: 'transparent',
    fontSize: 40,
    fontFamily: 'Roboto',
  },
  arrowKey: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    height: 24,
    width: 24,
  },
  touchIdIcon: {
    height: 40,
    width: 40,
  },
  fingerPrintWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  fingerPrint: {
    height: 60,
    width: 60,
  },
  AuthModalItem: {
    color: '#000',
    paddingVertical: 5,
  },
  AuthModalItemTitle: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  AuthModalContainer: {
    backgroundColor:"#fff",
  },
  AuthModalView: {
    backgroundColor:'#fff',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  AuthModalClose: {
    color: '#4d00ff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    fontFamily: 'Roboto',
  }
});

class PinKeyboard extends Component {
  static propTypes = {
    onBackPress: PropTypes.func.isRequired,
    onAuthSuccess: PropTypes.func,
    showBackButton: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    onAuthSuccess: null,
  };

  state = {
    isTouchIdSupported: false,
    isModalVisible: false,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible});
  }

  componentDidMount() {
    if (this.props.onAuthSuccess) {
      this.checkTouchIdSupport();
    }
  }

  onTouchIdClick = async () => {
    
    
    try {
      if (Platform.OS === 'android') {
        this.toggleModal(); 

        await FingerprintScanner.authenticate({
          onAttempt: () => {},
        });

        this.props.onAuthSuccess();
      } else {
        await FingerprintScanner.authenticate({
          description: 'Wallet access',
        });

        this.props.onAuthSuccess();
      }
    } catch (error) {
      console.log('error:::'. error);
    }
  };

  checkTouchIdSupport = async () => {
    console.log('check touch support');
    if(this.props.currentRoute == "CreateWallet") {

    } else {
      try {
        const isSensorAvailable = await FingerprintScanner.isSensorAvailable();

        if (isSensorAvailable) {
          this.setState({
            isTouchIdSupported: true,
          });

          this.onTouchIdClick();
        }
      } catch (error) {
        // An error happened during biometric detection
      }
    }
  };

  render() {
    if (this.props.showBackButton) {
      return (
        <TouchableOpacity
          style={[styles.keyboardKey, styles.arrowKey]}
          onPress={this.props.onBackPress}
        >
          <Image source={arrowIcon} style={styles.arrowIcon} />
        </TouchableOpacity>
      );
    }

    if (this.state.isTouchIdSupported) {
      return (
        <View style={styles.keyboardKey}>
          <TouchableOpacity
            style={[styles.keyboardKey, styles.arrowKey]}
            onPress={this.onTouchIdClick}
          >
            <Image source={touchIdIcon} style={styles.touchIdIcon} />
          </TouchableOpacity>

          <Modal
          isVisible={this.state.isModalVisible} 
          style={styles.AuthModalContainer}>
          <View style={styles.AuthModalView}>
            <View style={styles.fingerPrintWrap}>
              <Image source={fingerPrint} style={styles.fingerPrint} />
            </View>
            <Text style={styles.AuthModalClose}>Fingerprint Authentication</Text>
            <Text style={styles.AuthModalItemTitle}>Touch fingerprint sensor to unlock your wallet</Text>
            <TouchableOpacity
              style={styles.AuthModalItemTitle}
              onPress={() => this.toggleModal()}
            >
              <Text style={styles.AuthModalClose}>Use MPIN to Unlock</Text>
            </TouchableOpacity>
          </View>
          </Modal>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.keyboardKey}>
        <Text style={styles.textPlaceholder}> 0 </Text>
      </TouchableOpacity>
    );
  }
}


const mapStateToProps = state => ({
  currentRoute: state.currentRoute,
});

export default connect(
  mapStateToProps,
  null,
)(PinKeyboard);
