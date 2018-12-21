import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../UI/Button';

class SignUp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.btns}>
                    <Button onPress={() => console.log('abc')} text="Sign Up with Google" />
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