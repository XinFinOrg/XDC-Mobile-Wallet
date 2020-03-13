import {StyleSheet} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../../utils/constants';

const cColors = {
    lightButtonTextUnMarkC: "#9D9D9D",
    lightButtonTextMarkC: "#359cf8",
    lightButtonBC: "#3C3749",
    darkButtonTextUnMarkC: "#9D9D9D",
    darkButtonTextMarkC: "#359cf8",
    darkButtonBC: "#3C3749",
}

const common = StyleSheet.create({
    gradientHeader: {
        width: "100%",
        position: "relative",
    },
    
    gradientHeaderShadow: {
        position: "absolute",
        width: "92%",
        marginLeft: "4%",
        top: -10,
        height: 10,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    
    buttonIcon: {
        height: 15,
        width: 15
    },
      
});

const lightStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      },
      buttonTextUnMark: {
        color: cColors.lightButtonTextUnMarkC,
        paddingTop: 5,
        fontSize: RF(2),
        fontFamily: "Roboto"
      },
    
      buttonTextMark: {
        color: cColors.lightButtonTextMarkC,
        paddingTop: 5,
        fontSize: RF(2),
        fontFamily: "Roboto"
      },
    
      button: {
        alignItems: "center",
        borderColor: cColors.lightButtonBC,
        paddingVertical: 15,
        width: "25%",
      },
    
      activeTab: {
        borderBottomWidth: 2,
        borderColor: Colors.dark
      }
});

const darkStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkPrimaryVariant,
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
      },
      buttonTextUnMark: {
        color: cColors.darkButtonTextUnMarkC,
        paddingTop: 5,
        fontSize: RF(2),
        fontFamily: "Roboto"
      },
    
      buttonTextMark: {
        color: cColors.darkButtonTextMarkC,
        paddingTop: 5,
        fontSize: RF(2),
        fontFamily: "Roboto"
      },
    
      button: {
        alignItems: "center",
        borderColor: cColors.darkButtonBC,
        paddingVertical: 15,
        width: "25%",
      },
    
      activeTab: {
        borderBottomWidth: 2,
        borderColor: Colors.light
      }
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}