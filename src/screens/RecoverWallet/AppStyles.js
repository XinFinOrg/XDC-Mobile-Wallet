import {StyleSheet, Platform} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../utils/constants';

const cColors = {
    lightcreateWalletBtnBG: "#359cf8",
    darkcreateWalletBtnBG: "#359cf8",
}

const common = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 15,
      },
      formInputRow: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      buttonContainer: {
        paddingHorizontal: 15,
        paddingTop: 40,
      },
      warningContainer:{
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
      },
      
});

const lightStyles = StyleSheet.create({
    formElement: {
        borderBottomColor: Colors.light,
        borderBottomWidth: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 0,
        marginHorizontal: 10
      },
      labelText: {
        fontSize: 20,
        color: Colors.light,
        fontFamily: 'Roboto',
      },
      formInput: {
        color: Colors.light,
        flex: 1,
        flexGrow: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
      },
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
        backgroundColor: cColors.lightcreateWalletBtnBG,
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
        color: cColors.lightcreateWalletBtnBG,
        fontSize: 18,
        fontFamily: 'Roboto',
      },
      warning:{
        padding:10,
        paddingVertical: 50,
        color: Colors.light,
        zIndex: 1,
        fontFamily: 'Roboto',
      },
});

const darkStyles = StyleSheet.create({
    formElement: {
        borderBottomColor: Colors.dark,
        borderBottomWidth: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 0,
        marginHorizontal: 10
      },
      labelText: {
        fontSize: 20,
        color: Colors.dark,
        fontFamily: 'Roboto',
      },
      formInput: {
        color: Colors.dark,
        flex: 1,
        flexGrow: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
      },
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
        backgroundColor: cColors.darkcreateWalletBtnBG,
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
        color: cColors.darkcreateWalletBtnBG,
        fontSize: 18,
        fontFamily: 'Roboto',
      },
      warning:{
        padding:10,
        paddingVertical: 50,
        color: Colors.dark,
        zIndex: 1,
        fontFamily: 'Roboto',
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}