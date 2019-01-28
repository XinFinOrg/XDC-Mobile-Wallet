import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, View, Text, Platform, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import googleIcon from './images/google.png';
import slackIcon from './images/slack.png';
import {
  GradientBackground,
  PrimaryButton,
  SecondaryButton,
} from '../../components';
import OAuthManager from 'react-native-oauth';
const manager = new OAuthManager('XDCWallet');

class SignUp extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };


  signUp = (provider) => {

    let config
    let scopes

    if (Platform.OS === 'ios') {
      config = {
        google: {
          callback_url: `http://localhost/google`,
          client_id: '47621642897-0m87j98bjb3gmgqq1vb1sl81fsem9k62.apps.googleusercontent.com',
          client_secret: '8HPFSWc0D0xCk2sjNrYmiV7M'
        }
      }
      if(provider === 'google') {
        scopes = 'openid+email+profile'
      } else if(provider === 'slack') {
        scopes = 'read'
      }
    } else if (Platform.OS === 'android') { 
      config = {
        google: {
          callback_url: `http://localhost/google`,
          client_id: '47621642897-0m87j98bjb3gmgqq1vb1sl81fsem9k62.apps.googleusercontent.com',
          client_secret: '8HPFSWc0D0xCk2sjNrYmiV7M'
        },
        slack: {
          callback_url: `http://localhost/slack`,
          client_id: '194201140770.517349407841',
          client_secret: '1710f92423a014e039e44772f50a007d'
        }
      }
      if(provider === 'google') {
        scopes = 'email'
      } else if(provider === 'slack') {
        scopes = 'read'
      }
    }

    manager.configure(config);

    console.log(manager);

    const googleUrl = 'https://www.googleapis.com/plus/v1/people/me';
    const slackUrl = 'https://www.slack.com/api/users.identity';

    if(provider === 'google') {
      manager.authorize('google', { scopes })
        .then(
          resp => {
            console.log(resp);
            manager.makeRequest('google', googleUrl, resp)
              .then(resp => {
                console.log('Data -> ', resp.data);
                AsyncStorage.setItem('UserEmail', resp.data.emails[0].value);
                if(AsyncStorage.getItem('UserEmail')) {
                  this.props.navigation.navigate('Home');
                }
              })
              .catch(e => console.log(e));
          }
        )
        .catch(err => console.log(err));
    } else if(provider === 'slack') {
      manager.authorize('slack', { scopes })
        .then(resp => {
          console.log(resp);
          manager.makeRequest('slack', slackUrl, resp)
            .then(resp => {
              console.log(resp);
              AsyncStorage.setItem('UserEmail', resp.data.user.email);
              if(AsyncStorage.getItem('UserEmail')) {
                this.props.navigation.navigate('Home');
              }
            })
            .catch(e => console.log(e))
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <GradientBackground>
        <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>XDC Wallet</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.signUp('google')} style={styles.signUpBtn}>
                <Image source={googleIcon} style={styles.socialIcon} />
                <Text style={styles.buttonText}>Sign Up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.signUp('slack')} style={styles.signUpBtn}>
                <Image source={slackIcon} style={styles.socialIcon} />
                <Text style={styles.buttonText}>Sign Up with Slack</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </GradientBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: '65%',
  },
  logoText: {
    width: '90%',
    color: '#254a81',
    fontSize: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 15,
    width: '100%',
  },
  signUpBtn: {
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    paddingVertical: 20,
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor:'#333',
    borderWidth:1,

  },
  socialIcon: {
    width: 22,
    height: 22,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  buttonText: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  walletAddress: state.walletAddress,
});

export default connect(mapStateToProps)(SignUp);
