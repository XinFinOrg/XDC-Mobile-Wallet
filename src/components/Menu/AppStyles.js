import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../utils/constants';

const cColors = {
    lightPrivateKeyC: "#9d9d9d",
    darkPrivateKeyC: "#727272",
}

const common = StyleSheet.create({
    rowIcon: {
        height: 25,
        width: 25,
      },
});

const lightStyles = StyleSheet.create({
    listContainer: {
        flexGrow: 0,
        backgroundColor: Colors.light,
      },
      rowContainer: {
        borderBottomWidth: 2,
        borderColor: '#359ff8',
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rowText: {
        color: Colors.dark,
        fontSize: 18,
        height: '100%',
        fontFamily: 'Roboto',
      },
});

const darkStyles = StyleSheet.create({
    listContainer: {
        flexGrow: 0,
        backgroundColor: Colors.darkPrimary,
      },
      rowContainer: {
        borderBottomWidth: 2,
        borderColor: '#359ff8',
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      rowText: {
        color: Colors.light,
        fontSize: 18,
        height: '100%',
        fontFamily: 'Roboto',
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}