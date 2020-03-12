import {StyleSheet, Platform} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../utils/constants';

const cColors = {
    lightPrivateKeyC: "#9d9d9d",
    darkPrivateKeyC: "#727272",
}

const common = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 15,
      },
      
});

const lightStyles = StyleSheet.create({
    createPINText: {
        color: Colors.light,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
      },
});

const darkStyles = StyleSheet.create({
    createPINText: {
        color: Colors.light,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
    },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}