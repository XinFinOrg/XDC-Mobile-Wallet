import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/constants';

const cColors = {
    lightContainerBG: "#ccc",
    lightWalletAddressC: "#9d9d9d",
    darkContainerBG: "#333",
    darkWalletAddressC: "#9d9d9d",
}

const common = StyleSheet.create({
    
      buttonContainer: {
        paddingHorizontal: 15,
        paddingTop: 40
      },
    
      containerScrollView: {
        flex: 1,
      },
    
      buttonContainer: {
        paddingHorizontal: 15
      }
});

const lightStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 0,
        backgroundColor: cColors.lightContainerBG
      },
    
      walletAddress: {
        paddingHorizontal: 15,
        color: cColors.lightWalletAddressC,
        textAlign: "center",
        fontFamily: "Roboto"
      },
      containerScrollViewChild: {
        position: "relative",
        flex: 1,
        top: -20,
        backgroundColor: cColors.lightContainerBG,
        alignContent: "center",
        alignItems: "center"
      }
});

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingBottom: 0,
        backgroundColor: Colors.darkPrimary
      },
    
      walletAddress: {
        paddingHorizontal: 15,
        color: cColors.darkWalletAddressC,
        textAlign: "center",
        fontFamily: "Roboto"
      },
      containerScrollViewChild: {
        position: "relative",
        flex: 1,
        top: -20,
        backgroundColor: Colors.darkPrimary,
        alignContent: "center",
        alignItems: "center"
      }
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}