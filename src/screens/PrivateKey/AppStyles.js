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
      },
      privateKeyWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      },
      rowIcon: {
        backgroundColor: 'transparent',
        paddingHorizontal: 10,
        height: 25,
        width: 25,
      },
      buttonContainer: {
        paddingHorizontal: 15,
        paddingTop: 40,
      },
      privateKeyWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%'
      },
      warning:{
        paddingHorizontal:20,
        paddingBottom: 20,
        color: "#000",
        textAlign:"center",
        fontFamily: 'Roboto',
      },
      
});

const lightStyles = StyleSheet.create({
    privateKeyTitle: {
        paddingHorizontal: 15,
        color: Colors.dark,
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 18,
        fontFamily: 'Roboto',
      },
      privateKey: {
        paddingHorizontal: 15,
        color: cColors.lightPrivateKeyC,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
});

const darkStyles = StyleSheet.create({
    privateKeyTitle: {
        paddingHorizontal: 15,
        color: Colors.light,
        textAlign: 'center',
        paddingBottom: 20,
        fontSize: 18,
        fontFamily: 'Roboto',
      },
      privateKey: {
        paddingHorizontal: 15,
        color: cColors.darkPrivateKeyC,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}