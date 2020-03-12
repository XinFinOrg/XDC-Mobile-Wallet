import { StyleSheet } from 'react-native';
import {Colors} from '../../utils/constants';

const common = StyleSheet.create({
    settingsPadding: {
      padding: 10,
      paddingLeft: 10,
    },
    ImageWidth: {
      width: 20,
      height: 20
    },
    buttonCont: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignContent: "center",
      alignItems: "center"
    },
    menuTitleWrap: { paddingTop: 15, marginLeft: 10, paddingBottom: 15 },
});

const lightStyles = StyleSheet.create({
    settingsContainer: {
      flex: 1,
      height: 50,
      flexDirection: "row",
      backgroundColor: Colors.light,
      alignContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    linkText: {
        textAlign: 'left',
        color: Colors.dark
    },
    menuTitleText: { color: Colors.dark, fontSize: 18, fontFamily: "bold" },
    xdcText: { fontSize: 18, textAlign: "center", paddingVertical: 20, color: Colors.dark },
    backWrap: { backgroundColor: '#f3f3f5'},
});

const darkStyles = StyleSheet.create({
    settingsContainer: {
      flex: 1,
      height: 50,
      flexDirection: "row",
      backgroundColor: Colors.dark,
      alignContent: "center",
      alignItems: "center",
      marginBottom: 4,
    },
    linkText: {
        textAlign: 'left',
        color: Colors.light,
    },
    menuTitleText: { color: Colors.light, fontSize: 18, fontFamily: "bold" },
    xdcText: { fontSize: 18, textAlign: "center", paddingVertical: 20, color: Colors.light },
    backWrap: { backgroundColor: '#444444'},
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}