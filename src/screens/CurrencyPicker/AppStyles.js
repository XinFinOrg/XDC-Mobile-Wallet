import {StyleSheet, Platform} from 'react-native';
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
      
});

const lightStyles = StyleSheet.create({
    
});

const darkStyles = StyleSheet.create({
   
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}