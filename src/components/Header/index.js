import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text';
import arrow from './images/arrow.png';
import qr from './images/ic_qr.png';
import menu from './images/menu.png';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  centeredContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  headerStart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerExtremity: {
    paddingRight: 20
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontFamily: 'Roboto',
  },
  headerArrow: {
    height: 22,
    marginVertical: 4,
    width: 22,
  },
  headerQr: {
    height: 35,
    marginVertical: 4,
    width: 22,
  },
});

export default class Header extends Component {
  static propTypes = {
    onBackPress: PropTypes.func,
    hamBurgerPress: PropTypes.func,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    onBackPress: null,
    hamBurgerPress: null,
  };

  render() {
    return (
      <View
        style={
          this.props.hamBurgerPress || this.props.onBackPress
            ? styles.headerContainer
            // : styles.centeredContainer
            : styles.headerContainer
        }
      >
        
        <View style={styles.headerStart}>
          {this.props.hamBurgerPress ? (
            <TouchableOpacity
              style={styles.headerExtremity}
              onPress={this.props.hamBurgerPress}
            >
              <Image source={menu} style={styles.headerArrow} />
            </TouchableOpacity>
          ) : null}
        
          <Text style={styles.headerText}>{this.props.title}</Text>
        </View>

        {this.props.onBackPress ? (
          <TouchableOpacity
            style={styles.headerExtremity}
            onPress={this.props.onBackPress}
          >
            <Image source={qr} style={styles.headerQr} />
          </TouchableOpacity>
        ) : <View style={styles.headerExtremity} />}

      </View>
    );
  }
}
