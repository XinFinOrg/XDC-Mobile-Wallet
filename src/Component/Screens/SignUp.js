import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../UI/Button';
import {GoogleSignin, GoogleSigninButton, statusCodes} from 'react-native-google-signin';

class SignUp extends Component {

    componentDidMount() {
        GoogleSignin.configure();
    }
    signIn = async () => {
        console.log('abc');
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          this.setState({ userInfo });
        } catch (error) {
            console.log('error:::',error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
    };

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.btns}>
                    <Button onPress={() => this.signIn()} text="Sign Up with Google" />
                    <Button onPress={() => console.log('aaa')} text="Sign Up with Email" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
    },
    btns: {
        width: '90%',
        position: 'absolute',
        bottom: 20,
    }
  });

export default SignUp;