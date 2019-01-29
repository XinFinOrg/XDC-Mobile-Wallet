import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GradientBackground, Header, Menu } from '../../components';
import { DELETE_TOKEN, SET_DEFAULT_TOKEN } from '../../config/actionTypes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
});

class TokenPicker extends Component {
  static propTypes = {
    availableTokens: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
      }),
    ).isRequired,
    // navigation: PropTypes.shape({
    //   goBack: PropTypes.func.isRequired,
    //   navigate: PropTypes.func.isRequired,
    // }).isRequired,
    onDeleteToken: PropTypes.func.isRequired,
    onTokenChange: PropTypes.func.isRequired,
    network: PropTypes.string.isRequired,
  };

  state = {
    tokenList: [],
    menuOptions: [],
  }

  componentWillMount() {
    const currentNetwork = this.props.network;
    this.setState({
      tokenList: this.props.availableTokens,
    })
    AsyncStorage.setItem('availableTokens', JSON.stringify(this.props.availableTokens));
    AsyncStorage.getItem('availableTokens')
      .then(r => {
        this.setState({
          tokenList: JSON.parse(r),
        });
        const listOfTokens = this.state.tokenList;  
        const menuOptions = [
          ...listOfTokens.
          // filter(token => token.network === currentNetwork).
          map(token => ({
            onDeletePress: () => {
              this.props.onDeleteToken(token);
            },
            onPress: () => {
              this.props.onTokenChange(token);
              this.props.toggleModal(true);
              // this.props.navigation.goBack();
            },
            swipeToDelete: !['ELT', 'ETH'].includes(token.symbol),
            title: token.name,
          })),
          // {
          //   onPress: () => {
          //     this.props.navigation.navigate('AddToken');
          //   },
          //   title: 'Add new token',
          // },
        ];

        this.setState({
          menuOptions: menuOptions,
        });
      })
      .catch(e=>console.log(e));
  }
  
  render() {  
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          {/* <Header
            onBackPress={() => this.props.toggleModal(true)}
            title="Select coin"
          /> */}
          <Menu options={this.state.menuOptions} />
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const mapStateToProps = state => ({
  availableTokens: state.availableTokens,
  network: state.network,
});

const mapDispatchToProps = dispatch => ({
  onDeleteToken: token => dispatch({ type: DELETE_TOKEN, token }),
  onTokenChange: token => dispatch({ type: SET_DEFAULT_TOKEN, token }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TokenPicker);
