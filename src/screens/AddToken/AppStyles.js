import {StyleSheet, Platform} from 'react-native';
import {Colors} from '../../utils/constants';

const cColors = {
    lightPrivateKeyC: "#9d9d9d",
    darkPrivateKeyC: "#727272",
}

const common = StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 15,
        paddingTop: 40,
        paddingBottom: 20,
      },
});

const lightStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        flex: 1,
        justifyContent: 'space-between',
      },
});

const darkStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkPrimary,
        flex: 1,
        justifyContent: 'space-between',
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}