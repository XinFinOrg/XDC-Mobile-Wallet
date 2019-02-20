import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text';
import arrow from './images/arrow.png';
import menu from './images/menu.png';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#254a81',
    zIndex: 100,
  },
  centeredContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: '#254a81',
    zIndex: 100,
  },
  headerExtremity: {

  },
  headerText: {
    color: '#fff',
    fontSize: 27,
  },
  headerArrow: {
    height: 22,
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
            : styles.centeredContainer
        }
      >
        
        {this.props.hamBurgerPress ? (
          <TouchableOpacity
            style={styles.headerExtremity}
            onPress={this.props.hamBurgerPress}
          >
            <Image source={menu} style={styles.headerArrow} />
          </TouchableOpacity>
        ) : null}
        
        <Text style={styles.headerText}>{this.props.title}</Text>

        {this.props.onBackPress ? (
          <TouchableOpacity
            style={styles.headerExtremity}
            onPress={this.props.onBackPress}
          >
            <Image source={arrow} style={styles.headerArrow} />
          </TouchableOpacity>
        ) : <View style={styles.headerExtremity} />}

      </View>
    );
  }
}
