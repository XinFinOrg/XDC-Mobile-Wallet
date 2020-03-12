import {StyleSheet} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../../utils/constants';

const cColors = {
    lightFromTextC: "#71869a",
    lightErrorTextC: "#ff9b22",
    lightContinueButtonBG: "#359cf8",
    lightWalletAddressC: "#9d9d9d",
    darkFromTextC: "#71869a",
    darkErrorTextC: "#ff9b22",
    darkContinueButtonBG: "#359cf8",
    darkWalletAddressC: "#727272",
}

const common = StyleSheet.create({
      
    containerInside: {
        flex: 1,
        flexDirection: "row"
      },
      image: {
        height: 20,
        width: 15
      },
      buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
      },
      
});

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 10,
        backgroundColor: Colors.light
      },
      fromText: {
        color: cColors.lightFromTextC,
        fontSize: 20,
        top: 20
      },
      continueButton: {
        height: 45,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: cColors.lightContinueButtonBG,
        justifyContent: "center",
        marginLeft: 25,
        marginRight: 25
      },
      stackedContainer: {
        backgroundColor: Colors.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        padding: 10
      },
      qrcodeContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: Colors.light,
        paddingVertical: 5,
        width: 160,
      },
      walletAddress: {
        // paddingHorizontal: 15,
        color: cColors.lightWalletAddressC,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
      createWalletBtn: {
        height: 40,
        width: '50%',
        alignItems: "center",
        borderRadius: 30,
        fontFamily: "montserratregular",
        backgroundColor: cColors.lightContinueButtonBG,
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
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 10,
        backgroundColor: Colors.dark
      },
      fromText: {
        color: cColors.darkFromTextC,
        fontSize: 20,
        top: 20
      },
      continueButton: {
        height: 45,
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: cColors.darkContinueButtonBG,
        justifyContent: "center",
        marginLeft: 25,
        marginRight: 25
      },
      stackedContainer: {
        backgroundColor: Colors.dark,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        padding: 10
      },
      qrcodeContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: Colors.dark,
        paddingVertical: 5,
        width: 160,
      },
      walletAddress: {
        // paddingHorizontal: 15,
        color: cColors.darkWalletAddressC,
        textAlign: 'center',
        fontFamily: 'Roboto',
      },
      createWalletBtn: {
        height: 40,
        width: '50%',
        alignItems: "center",
        borderRadius: 30,
        fontFamily: "montserratregular",
        backgroundColor: cColors.darkContinueButtonBG,
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
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}