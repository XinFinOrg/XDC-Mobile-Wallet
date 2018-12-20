import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Button = (props) => {
    return(
        <View style={props.style}>
            <Text style={styles.btnText}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    btnText: {
        fontSize: 16,
        color: '#333',
    }
});

export default Button;