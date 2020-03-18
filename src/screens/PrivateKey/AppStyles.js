import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../utils/constants';

const cColors = {
    lightPrivateKeyC: "#9d9d9d",
    darkPrivateKeyC: "#727272",
}

const common = StyleSheet.create({
    
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
      container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.light
      },
      privateKey: {
        paddingHorizontal: 15,
        color: cColors.lightPrivateKeyC,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
      privateKeyWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.light
      },
      warning:{
        paddingHorizontal:20,
        paddingBottom: 20,
        color: Colors.dark,
        textAlign:"center",
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
      container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: Colors.darkPrimary
      },
      privateKey: {
        paddingHorizontal: 15,
        color: cColors.darkPrivateKeyC,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
      privateKeyWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.darkPrimary
      },
      warning:{
        paddingHorizontal:20,
        paddingBottom: 20,
        color: Colors.light,
        textAlign:"center",
        fontFamily: 'Roboto',
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}