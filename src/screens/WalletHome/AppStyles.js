import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/constants';

const cColors = {
    lightContainerBG: "#eee",
    darkContainerBG: Colors.darkPrimary,
    lightModalItemC: "#555",
    darkModalItemC: "#999",
    lightCircleShapeViewXDCBG: "#1bf2ff",
    darkCircleShapeViewXDCBG: "#1bf2ff",
    lightUsdBalTextC: "#333",
    darkUsdBalTextC: "#ccc",
    lightTokenDetailUsd: "#777",
    darkTokenDetailUsd: "#888",
}

const common = StyleSheet.create({
    topContainer: {
        flex: 1,
        backgroundColor: "transparent",
        marginTop: 100,
        paddingBottom: 0
      },
    
      gradientHeader: {
        width: "100%",
        height: 250,
      },
    
      gradientHeaderShadow: {
        position: "absolute",
        width: "92%",
        marginLeft: "4%",
        bottom: 10,
        height: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
      },
    
      listContainer: {
        flex: 1
      },
      ModalContainer: {
        backgroundColor: "transparent",
        padding: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },
      ModalClose: {
        width: "90%",
        marginLeft: "5%",
        marginTop: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
      },
      gauge: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
      },
      pieSection: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
      },
      totalChange: {
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '49%'
    },
    tokenDetail: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    },
});

const lightStyles = StyleSheet.create({
    container: {
      backgroundColor: cColors.lightContainerBG,
      flex: 1,
      paddingTop: 0,
      justifyContent: 'space-between'
    },
  
    ModalView: {
      backgroundColor: Colors.light,
      padding: 20
    },
    LoadingModalView: {
      backgroundColor: 'transparent',
      padding: 20,
    },
    warning: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      color: Colors.dark,
      textAlign: "center",
      fontFamily: "Roboto"
    },
    ModalItem: {
      padding: 5,
      fontSize: 16,
      fontWeight: "bold",
      color: cColors.lightModalItemC,
      fontFamily: "Roboto"
    },
    
    ModalCloseButton: {
      textAlign: "center",
      paddingVertical: 5,
      color: Colors.light,
      fontSize: 20,
      fontFamily: "Roboto"
    },
    
    CircleShapeViewXDC: {
      width: 10,
      height: 10,
      borderRadius: 150 / 2,
      backgroundColor: cColors.lightCircleShapeViewXDCBG
    },
    dashCard: {
      position: 'absolute',
      left: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      backgroundColor: Colors.light,
      width: '90%',
      marginLeft: '5%',
      paddingVertical: 20,
      paddingHorizontal: 20,
      paddingBottom: 40,
      borderRadius: 10,
      elevation: 5
    },
    
    usdBalText: {
      backgroundColor: "transparent",
      color: cColors.lightUsdBalTextC,
      fontSize: 18
    },
    tokenDetailName: {
      color: cColors.lightUsdBalTextC,
      fontSize: 14,
      fontFamily: "bold"
    },
    tokenDetailUsd: {
      color: cColors.lightTokenDetailUsd,
      fontSize: 12
    },
    stackedCard: {
      position: 'absolute',
      backgroundColor: Colors.light,
      elevation: 5,
      bottom: -35,
      left: 20,
      width: '100%',
      height: 70,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
    },
    rightBorder: {
      backgroundColor: cColors.lightTokenDetailUsd,
      paddingLeft: 1,
      height: 50
    },
    graphListContainer: {  
      backgroundColor: Colors.light,
      flexDirection: "column",
      borderRadius: 5,
      marginBottom: 5,
      marginTop: 5,
      width: '90%',
      height: 60,
      marginLeft: '5%',
      elevation: 2,
    },
    totalChangeTitle: {
      backgroundColor: 'transparent',
    },
    
    totalChangeNumber: {
  
    },
    tokenDetailData: {
      color: "#565e66", 
      fontSize: 18
    }
});

const darkStyles = StyleSheet.create({
    container: {
      backgroundColor: cColors.darkContainerBG,
      flex: 1,
      paddingTop: 0,
      justifyContent: 'space-between'
    },
  
    ModalView: {
      backgroundColor: Colors.dark,
      padding: 20
    },
    LoadingModalView: {
      backgroundColor: 'transparent',
      padding: 20,
    },
    warning: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      color: Colors.light,
      textAlign: "center",
      fontFamily: "Roboto"
    },
    ModalItem: {
      padding: 5,
      fontSize: 16,
      fontWeight: "bold",
      color: cColors.darkModalItemC,
      fontFamily: "Roboto"
    },
    
    ModalCloseButton: {
      textAlign: "center",
      paddingVertical: 5,
      color: Colors.dark,
      fontSize: 20,
      fontFamily: "Roboto"
    },
    
    CircleShapeViewXDC: {
      width: 10,
      height: 10,
      borderRadius: 150 / 2,
      backgroundColor: cColors.darkCircleShapeViewXDCBG
    },
    dashCard: {
      position: 'absolute',
      left: 0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: 'center',
      backgroundColor: Colors.darkSecondary,
      width: '90%',
      marginLeft: '5%',
      paddingVertical: 20,
      paddingHorizontal: 20,
      paddingBottom: 40,
      borderRadius: 10,
      elevation: 5
    },
    
    usdBalText: {
      backgroundColor: "transparent",
      color: cColors.darkUsdBalTextC,
      fontSize: 18
    },
    tokenDetailName: {
      color: cColors.darkUsdBalTextC,
      fontSize: 14,
      fontFamily: "bold"
    },
    tokenDetailUsd: {
      color: cColors.darkTokenDetailUsd,
      fontSize: 12
    },
    stackedCard: {
      position: 'absolute',
      backgroundColor: Colors.darkSecondaryVariant,
      elevation: 5,
      bottom: -35,
      left: 20,
      width: '100%',
      height: 70,
      borderRadius: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center',
    },
    rightBorder: {
      backgroundColor: cColors.darkTokenDetailUsd,
      paddingLeft: 1,
      height: 50
    },
    graphListContainer: {  
      backgroundColor: Colors.darkSecondary,
      flexDirection: "column",
      borderRadius: 5,
      marginBottom: 5,
      marginTop: 5,
      width: '90%',
      height: 60,
      marginLeft: '5%',
      elevation: 2,
    },
    totalChangeTitle: {
      backgroundColor: 'transparent',
      color: Colors.light
    },
    
    totalChangeNumber: {
      color: Colors.light
    },
    tokenDetailData: {
      color: Colors.light, 
      fontSize: 18
    }
});

export default function useTheme(darkTheme) {
	return darkTheme ? {...common, ...darkStyles} : {...common, ...lightStyles};
}