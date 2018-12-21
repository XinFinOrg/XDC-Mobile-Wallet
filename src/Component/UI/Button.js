import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const Button = (props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.btn}>
            <Text style={styles.btnText}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = {
    btn: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
        width: '100%',
        height: 60,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 16,
        color: '#fff',
    }
};

export default Button;