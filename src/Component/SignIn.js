import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from './UI/Button';

class SignIn extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>XDC Wallet</Text>
                <Button style={styles.btn} text="Sign In with Google" />
                <Button style={styles.btnSignin} text="Create Wallet" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    btn: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
        width: '90%',
        position: 'absolute',
        bottom: 80,
        height: 60,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSignin: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333',
        width: '90%',
        position: 'absolute',
        bottom: 10,
        height: 60,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default SignIn;