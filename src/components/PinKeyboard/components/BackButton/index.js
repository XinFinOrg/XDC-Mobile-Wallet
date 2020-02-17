import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, Platform, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Modal from 'react-native-modal';
import Text from '../../../Text';
import arrowIcon from './images/arrow.png';
import touchIdIcon from './images/touchid.png';
import fingerPrint from './images/fingerPrint.png';
import {dimHeight} from '../../../../utils/constants';

const styles = StyleSheet.create({
  keyboardKey: {
    flex: 1,
    flexGrow: 1,
    paddingVertical: 10,
    height: null
  },
  textPlaceholder: {
    color: 'transparent',
    fontSize: 30,
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
    fontFamily: 'Roboto',
  },
  AuthModalContainer: {
    backgroundColor:"transparent",
    justifyContent: 'center',
    alignItems: 'center',
    height: null
  },
  AuthModalView: {
    backgroundColor:'#fff',
    paddingVertical: 0,
    paddingHorizontal: 30,
    width: 300
  },
  AuthModalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 20,
    fontFamily: 'Roboto',
  },
  AuthModalClose: {
    color: '#359ff8',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
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
    doubleModalIssue: true,
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible}, function() {
      if(!this.state.isModalVisible) {
        FingerprintScanner.release();
      }
    });
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
      console.log('FINGERPRINT ERROR:::::::::::::::::::::::::::::::::::::::', error);
      FingerprintScanner.release();
      this.toggleModal();
    }
  };

  checkTouchIdSupport = async () => {
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
          underlayColor="transparent"
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
            underlayColor="transparent"
            style={[styles.keyboardKey, styles.arrowKey]}
            onPress={this.onTouchIdClick}
          >
            <Image source={touchIdIcon} style={styles.touchIdIcon} />
          </TouchableOpacity>

          <Modal
          transparent={true}
          isVisible={this.state.isModalVisible && this.state.doubleModalIssue}
          deviceHeight={dimHeight} 
          style={styles.AuthModalContainer}>
            <View style={styles.AuthModalView}>
              <Text style={styles.AuthModalHeaderText}>Fingerprint Authentication</Text>
              <Text style={styles.AuthModalItemTitle}>Touch fingerprint sensor to unlock your wallet</Text>
              <View style={styles.fingerPrintWrap}>
                <Image source={fingerPrint} style={styles.fingerPrint} />
              </View>
              <TouchableOpacity
                underlayColor="transparent"
                style={styles.AuthModalItemTitle}
                onPress={() => this.toggleModal()}
              >
                <Text style={styles.AuthModalClose}>Use PIN</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      );
    }

    return (
      <TouchableOpacity underlayColor="transparent" style={styles.keyboardKey}>
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
