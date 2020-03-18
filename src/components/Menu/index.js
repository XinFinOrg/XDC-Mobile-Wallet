import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import Text from '../Text';
import arrow from './images/arrow.png';
import check from './images/success.png'

import useTheme from './AppStyles';

class Menu extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        swipeToDelete: PropTypes.bool,
        onDeletePress: PropTypes.func,
      }),
    ).isRequired,
  };

  renderOption = (option, index) => {
    
    const styles = useTheme(this.props.darkTheme);

    if (option.swipeToDelete) {
      const swipeoutButtons = [
        {
          onPress: option.onDeletePress,
          text: 'Delete',
          type: 'delete',
        },
      ];

      return (
        <Swipeout
          backgroundColor="transparent"
          right={swipeoutButtons}
          key={index}
        >
          <TouchableWithoutFeedback onPress={option.onPress}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowText}>{option.title}</Text>
              <Image source={arrow} style={styles.rowIcon} />
            </View>
          </TouchableWithoutFeedback>
        </Swipeout>
      );
    }

    return (
      <TouchableOpacity underlayColor="transparent" onPress={option.onPress} key={index}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>{option.title}</Text>
          {this.props.defaultCurrency === option.title ? <Image source={check} style={styles.rowIcon} /> : null }
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    
    const styles = useTheme(this.props.darkTheme);

    return (
      <ScrollView style={styles.listContainer}>
        {this.props.options.map(this.renderOption)}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  defaultCurrency: state.currentCurrency,
  darkTheme: state.darkTheme,
});

export default connect(mapStateToProps)(Menu);

