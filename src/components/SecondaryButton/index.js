import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    height: 45,
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#359cf8",
    justifyContent: "center",
    width: '50%',
    marginLeft:  '25%'
  },
  text: {
    backgroundColor: 'transparent',
    fontFamily: 'Roboto',
    fontSize: 22,
    color: "#ffffff"
  },
});

export default class SecondaryButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    disabled: false,
    isLoading: false,
  };

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        style={{
          opacity: this.props.disabled ? 0.5 : 1,
        }}
      >
        <View style={styles.container}>
          {this.props.isLoading ? (
            <ActivityIndicator color="#4D00FF" />
          ) : (
            <Text style={styles.text}>{this.props.text}</Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}
