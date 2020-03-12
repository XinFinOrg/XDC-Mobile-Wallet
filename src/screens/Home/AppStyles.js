import {StyleSheet, Platform} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../utils/constants';

const cColors = {
    lightCreateWalletBtnBG: "#359cf8",
    darkCreateWalletBtnBG: "#727272",
}

const common = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        flex: 1,
        paddingBottom: 20
      },
      logoContainer: {
        paddingTop: 120,
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        width: "100%"
      },
      buttonsContainer: {
        paddingHorizontal: 15,
        paddingBottom: 50,
        width: "100%"
      },
      logoIcon: {
        width: 160,
        height: 160
      },
      
});

const lightStyles = StyleSheet.create({
    recoverWalletBtn: {
        height: 50,
        alignItems: "center",
        borderRadius: 30,
        fontFamily: "montserratregular",
        backgroundColor: Colors.light,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      },
      createWalletBtn: {
        height: 50,
        alignItems: "center",
        borderRadius: 30,
        marginBottom: 20,
        fontFamily: "montserratregular",
        backgroundColor: cColors.lightCreateWalletBtnBG,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
      createButtonText: {
        backgroundColor: 'transparent',
        color: Colors.light,
        fontSize: 18,
        fontFamily: 'Roboto',
      },
      recoverButtonText: {
        backgroundColor: 'transparent',
        color: cColors.lightCreateWalletBtnBG,
        fontSize: 18,
        fontFamily: 'Roboto',
      }
});

const darkStyles = StyleSheet.create({
    recoverWalletBtn: {
        height: 50,
        alignItems: "center",
        borderRadius: 30,
        fontFamily: "montserratregular",
        backgroundColor: Colors.dark,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      },
      createWalletBtn: {
        height: 50,
        alignItems: "center",
        borderRadius: 30,
        marginBottom: 20,
        fontFamily: "montserratregular",
        backgroundColor: cColors.darkCreateWalletBtnBG,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
      createButtonText: {
        backgroundColor: 'transparent',
        color: Colors.dark,
        fontSize: 18,
        fontFamily: 'Roboto',
      },
      recoverButtonText: {
        backgroundColor: 'transparent',
        color: cColors.darkCreateWalletBtnBG,
        fontSize: 18,
        fontFamily: 'Roboto',
      }
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}