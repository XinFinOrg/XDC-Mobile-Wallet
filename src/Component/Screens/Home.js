import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../UI/Button';
import {Actions} from 'react-native-router-flux';

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>XDC Wallet</Text>
                <View style={styles.btns}>
                    <Button onPress={() => Actions.signUpOptions()} text="Create Wallet" />
                    <Button onPress={() => console.log('aaa')} text="Import Wallet" />
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
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
      color: '#fff',
    },
    btns: {
        width: '90%',
        position: 'absolute',
        bottom: 20,
    }
  });

export default Home;