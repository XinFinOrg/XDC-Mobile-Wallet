import {StyleSheet} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../../../utils/constants';

const cColors = {
    lightFromTextC: "#71869a",
    lightErrorTextC: "#ff9b22",
    lightContinueButtonBG: "#359cf8",
    darkFromTextC: "#71869a",
    darkErrorTextC: "#ff9b22",
    darkContinueButtonBG: "#359cf8",
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
      arrowIcon: {
        height: 10,
        width: 11,
        marginLeft: 10,
      },
      arrowIcon: {
        height: 10,
        width: 11,
        marginLeft: 10
      },
});

const lightStyles = StyleSheet.create({
    formInput: {
        color: Colors.dark,
        flex: 1,
        flexGrow: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
        paddingRight: 40,
      },
      tokenSymbol: {
        color: Colors.dark,
        fontSize: 18,
      },
      container: {
        flex: 1,
        borderRadius: 3,
        height: "100%",
        width: "100%",
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 10,
        backgroundColor: Colors.light
      },
      
      fromText: {
        color: cColors.lightFromTextC,
        fontSize: 18,
        textAlign: "left"
      },
      errorText: {
        color: cColors.lightErrorTextC
      },
      tokenSymbol: {
        color: Colors.dark,
        fontSize: 18
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
});

const darkStyles = StyleSheet.create({
    formInput: {
        color: Colors.light,
        flex: 1,
        flexGrow: 1,
        fontFamily: 'Roboto',
        fontSize: 16,
        paddingRight: 40,
      },
      tokenSymbol: {
        color: Colors.light,
        fontSize: 18,
      },
      container: {
        flex: 1,
        borderRadius: 3,
        height: "100%",
        width: "100%",
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 10,
        backgroundColor: Colors.dark
      },
      
      fromText: {
        color: cColors.darkFromTextC,
        fontSize: 18,
        textAlign: "left"
      },
      errorText: {
        color: cColors.darkErrorTextC
      },
      tokenSymbol: {
        color: Colors.light,
        fontSize: 18
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
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}