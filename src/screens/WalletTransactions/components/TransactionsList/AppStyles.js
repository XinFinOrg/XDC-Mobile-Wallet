import {StyleSheet} from 'react-native';
import RF from "react-native-responsive-fontsize";
import {Colors} from '../../../../utils/constants';

const cColors = {
    lightModalItemC: "#555",
    lightModalItemTitleLinkC: "#2C7ACB",
    lightCreateWalletBtn: "#359cf8",
    lightFontSend: "#ff9b22",
    lightFontReceive: "#15d291",
    darkModalItemC: "#555",
    darkModalItemTitleLinkC: "#2C7ACB",
    darkCreateWalletBtn: "#359cf8",
    darkFontSend: "#ff9b22",
    darkFontReceive: "#15d291",
}

const common = StyleSheet.create({
      
    ModalClose: {
        width: "90%",
        marginLeft: "5%",
        marginTop: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
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
    
      itemContainer: {
        flex: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        backgroundColor: Colors.light
      },
    
      itemTitle: {
        color: Colors.dark,
        fontSize: 20,
        fontFamily: "Roboto"
      },
      emptyListText: {
        color: Colors.dark,
        textAlign: "center",
        fontSize: 20,
        paddingTop: 20,
        fontFamily: "Roboto"
      },
      ModalView: {
        backgroundColor: Colors.light,
        padding: 20
      },
      ModalItem: {
        padding: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: cColors.lightModalItemC,
        fontFamily: "Roboto"
      },
      ModalItemTitle: {
        color: Colors.dark,
        fontSize: 18,
        fontFamily: "Roboto"
      },
      ModalItemTitleLink: {
        color: cColors.lightModalItemTitleLinkC,
        fontSize: 18,
        fontFamily: "Roboto"
      },
      createWalletBtn: {
        height: 40,
        width: '50%',
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: cColors.lightModalItemTitleLinkC,
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
      fontSend: {
        fontSize: 14,
        fontFamily: "bold",
        color: cColors.lightFontSend
      },
      fontReceive: {
        fontSize: 14,
        fontFamily: "bold",
        color: cColors.lightFontReceive
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
    
      itemContainer: {
        flex: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 20,
        backgroundColor: Colors.darkSecondary
      },
    
      itemTitle: {
        color: Colors.light,
        fontSize: 20,
        fontFamily: "Roboto"
      },
      emptyListText: {
        color: Colors.light,
        textAlign: "center",
        fontSize: 20,
        paddingTop: 20,
        fontFamily: "Roboto"
      },
      ModalView: {
        backgroundColor: Colors.dark,
        padding: 20
      },
      ModalItem: {
        padding: 5,
        fontSize: 16,
        fontWeight: "bold",
        color: cColors.darkModalItemC,
        fontFamily: "Roboto"
      },
      ModalItemTitle: {
        color: Colors.light,
        fontSize: 18,
        fontFamily: "Roboto"
      },
      ModalItemTitleLink: {
        color: cColors.darkModalItemTitleLinkC,
        fontSize: 18,
        fontFamily: "Roboto"
      },
      createWalletBtn: {
        height: 40,
        width: '50%',
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: cColors.darkModalItemTitleLinkC,
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
      fontSend: {
        fontSize: 14,
        fontFamily: "bold",
        color: cColors.darkFontSend
      },
      fontReceive: {
        fontSize: 14,
        fontFamily: "bold",
        color: cColors.darkFontReceive
      },
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}