import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_DEFAULT_TOKEN } from '../../config/actionTypes';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'transparent',
  },
  balanceRow: {
    padding: 5,
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  tokenBalance: {
    padding: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  tokenText: {
    color: '#fff',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold'
  },
  totalText: {
    color: '#fff',
    fontFamily: 'Roboto',
  },
  buttonsContainer: {
		paddingTop: 10,
    paddingBottom: 50,
    display: 'flex',
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center"
  },
  horScroll: {
      // paddingHorizontal: 20,
      display: 'flex',
      justifyContent: 'flex-start'
  },
  xdcButtonMark: {
    height: 30,
    width: 80,
    borderRadius: 30,
    marginRight: 5,
    marginLeft: 5,
    padding: 15,
    backgroundColor: "#ff9b22",
    justifyContent: "center",
    alignItems: "center"
  },
  xdcButtonUnMark: {
    height: 30,
    width: 80,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 5,
    marginLeft: 5,
    padding: 15,
    borderColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  xdcButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontSize: 16
  },
});

class BalanceRow extends Component {
  state = {
    data: null,
	  tokenList: [],
    menuOptions: [],
    selectedDate: new Date(),
  };

  static propTypes = {
    currentBalance: PropTypes.object.isRequired,
    selectedToken: PropTypes.shape({
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
	}).isRequired,
	availableTokens: PropTypes.arrayOf(
		PropTypes.shape({
		  name: PropTypes.string.isRequired,
		  symbol: PropTypes.string.isRequired,
		}),
	).isRequired,
	onTokenChange: PropTypes.func.isRequired,
	network: PropTypes.string.isRequired,
  };

 	componentWillMount() {
		this.setState({
			tokenList: this.props.availableTokens,
		});
	}
	  
	changeToken = (token) => {
		this.props.onTokenChange(token)
	}

  render() {
    const {
      currentBalance,
      selectedToken,
	} = this.props;

	let _tokenBtns = this.state.tokenList.map((index, key) => {
		return (
			<TouchableOpacity
        underlayColor="transparent"
				key={key}
                activeOpacity={0.5}
                onPress={() => this.changeToken(index)}
                style={
                  selectedToken.tName === index.tName
                    ? styles.xdcButtonMark
                    : styles.xdcButtonUnMark
                }
              >
                <Text style={styles.xdcButtonText}>{index.symbol}</Text>
              </TouchableOpacity>
		);
	})

    return (
      <View style={styles.container}>

        <View style={styles.balanceRow}>

            <View style={styles.tokenBalance}>
              <Text style={styles.tokenText}>
                {currentBalance.balance.toFixed(2)} {selectedToken.tName}
              </Text>
            </View>

            <View style={styles.tokenBalance}>
              <Text style={styles.totalText}>
                Total Balance
              </Text>
            </View>

            <View style={styles.buttonsContainer}>
              <ScrollView horizontal={true} contentContainerStyle={styles.horScroll}>
                {_tokenBtns}
              </ScrollView>
            </View>
        </View>
        
      </View>
    );
  }
}

const mapStateToProps = state => ({
	availableTokens: state.availableTokens,
	network: state.network,
  });
  
  const mapDispatchToProps = dispatch => ({
	onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
  });
  
  export default connect(
	mapStateToProps,
	mapDispatchToProps,
  )(BalanceRow);
