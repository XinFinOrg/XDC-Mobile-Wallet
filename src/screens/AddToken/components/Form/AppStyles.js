import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../../../utils/constants';

const cColors = {
    lightPrivateKeyC: "#9d9d9d",
    darkPrivateKeyC: "#727272",
}

const common = StyleSheet.create({
    formInputRow: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      cameraIcon: {
        height: 23,
        width: 30,
      },
});

const lightStyles = StyleSheet.create({
    formElement: {
        borderBottomColor: Colors.dark,
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'ios' ? 20 : 30,
        paddingBottom: 15,
      },
      formLabel: {
        color: Colors.dark,
        fontFamily: 'Roboto',
        paddingLeft: Platform.OS === 'ios' ? 0 : 4,
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
      },
      formInput: {
        color: Colors.dark,
        flex: 1,
        flexGrow: 1,
        // fontFamily: 'Roboto',
      },
      formInputNetwork: {
        color: Colors.dark,
        flex: 1,
        flexGrow: 1,
        fontFamily: 'Roboto',
      },
});

const darkStyles = StyleSheet.create({
    formElement: {
        borderBottomColor: Colors.light,
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'ios' ? 20 : 30,
        paddingBottom: 15,
      },
      formLabel: {
        color: Colors.light,
        fontFamily: 'Roboto',
        paddingLeft: Platform.OS === 'ios' ? 0 : 4,
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
      },
      formInput: {
        color: Colors.light,
        flex: 1,
        flexGrow: 1,
        // fontFamily: 'Roboto',
      },
      formInputNetwork: {
        color: Colors.light,
        flex: 1,
        flexGrow: 1,
        fontFamily: 'Roboto',
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}