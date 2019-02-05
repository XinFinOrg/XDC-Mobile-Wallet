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

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  rowContainer: {
    borderBottomWidth: 2,
    borderColor: '#254a81',
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowText: {
    color: '#000',
    fontSize: 18,
    height: '100%'
  },
  rowIcon: {
    height: 25,
    width: 25,
  },
});

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
      <TouchableOpacity onPress={option.onPress} key={index}>
        <View style={styles.rowContainer}>
          <Text style={styles.rowText}>{option.title}</Text>
          {this.props.defaultCurrency === option.title ? <Image source={check} style={styles.rowIcon} /> : null }
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ScrollView style={styles.listContainer}>
        {this.props.options.map(this.renderOption)}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  defaultCurrency: state.currentCurrency,
});

export default connect(mapStateToProps)(Menu);

