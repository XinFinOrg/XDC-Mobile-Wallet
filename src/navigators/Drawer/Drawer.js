import React, {Component} from 'react';
import { connect } from 'react-redux';
import {NavigationActions, DrawerItems, DrawerItem} from 'react-navigation';
import {StyleSheet , Image, ScrollView, Text, View, Alert, TouchableOpacity, Linking} from 'react-native';
import logo from './images/logo.png';
import logout from './images/logout.png';
import home from './images/home.png';
import network from './images/network.png';
import send from './images/send.png';
import receive from './images/receive.png';
import login from './images/login.png';
import webwallet from './images/webwallet.png';
import token from './images/addtoken.png';
import privatekey from './images/private.png';
import PropTypes from 'prop-types';
import { persistor } from '../../config/store';
import { LOGOUT } from '../../config/actionTypes';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navItemStyle: {
        padding: 15,
        fontSize:20,
        color:"#000",
        width: '100%',
    },
    navSectionStyle: {
        flexDirection:"row",
        alignItems:"center",
        width:"100%"
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    footerContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: 'lightgrey'
    },
    drawerHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 75,
    },
    drawerContainer: {
        height: 100,
        backgroundColor: '#254a81',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeLink: {
        color: '#254a81',
        // backgroundColor: '#efefef',
    },
    Icon:{
        width:22,
        height:22,
        marginHorizontal: 10,
    }
});


class CustomDrawer extends Component {
    navigateToScreen = (route, editMode) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route,
            params: {
                editMode: editMode
            },
        });
        this.props.navigation.dispatch(navigateAction);
    }
    
    render () {
        
        const length = this.props.navigation.state.routes["0"].routes.length;
        const activeItemKey = this.props.navigation.state.routes["0"].routes[length - 1].routeName;

        let activeTabStyle = [styles.navItemStyle, styles.activeLink];
        let normalTabStyle = [styles.navItemStyle];
        
        return (
          <View style={styles.container}>
            <ScrollView>
                <View style={styles.drawerContainer}>
                    <Image source={logo} style={styles.drawerHeader} />
                </View>
                <View>
                    <View style={styles.navSectionStyle}>
                        <Image source={home} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'WalletHome' ? activeTabStyle : normalTabStyle} 
                            onPress={this.navigateToScreen('WalletHome', false)}>
                            Home
                        </Text>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <Image source={send} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'Send' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('Send', false)}>
                            Send
                        </Text>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <Image source={receive} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'Receive' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('Receive', false)}>
                            Receive
                        </Text>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <Image source={token} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'AddToken' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('AddToken', false)}>
                            Add New Token
                        </Text>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <Image source={login} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'CreateWallet' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('CreateWallet', true)}>
                            Change Pin
                        </Text>
                    </View>
                    {/* <View style={styles.navSectionStyle}>
                        <Image source={network} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'NetworkPicker' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('NetworkPicker', false)}>
                            Change Network
                        </Text>
                    </View> */}
                    <View style={styles.navSectionStyle}>
                        <Image source={network} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'NetworkPicker' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('NetworkPicker', false)}>
                            Set Default Currency
                        </Text>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <Image source={privatekey} style={styles.Icon}/>
                        <Text 
                            style={activeItemKey === 'PrivateKey' ? activeTabStyle : normalTabStyle}
                            onPress={this.navigateToScreen('PrivateKey', false)}>
                            Export Private Key
                        </Text>
                    </View>
                    <View style={styles.navSectionStyle}>
                        <Image source={webwallet} style={styles.Icon}/>
                        <TouchableOpacity
                            onPress = { () => 
                            {
                                Linking.openURL('http://google.com')
                            }} >
                            <Text style={normalTabStyle}>Login to Web Wallet</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity
                    style={styles.footerContainer}
                    onPress = { () => 
                        Alert.alert(
                          'Logout',
                          'Your wallet will be erased from your device. Make sure to backup your private key before going further.',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => {},
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: async () => {
                                await this.props.logout();
                                this.props.navigation.navigate('SignUp');
                              },
                            },
                          ],
                          { cancelable: false },
                        )
                    }
                >
                    <Image source={logout} style={styles.Icon}/>
                    <Text style={normalTabStyle}>Logout</Text>
                </TouchableOpacity>
            </View>
          </View>
        );
    }
}

CustomDrawer.propTypes = {
    navigation: PropTypes.object,
    logout: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    logout: async () => {
      dispatch({ type: LOGOUT });
      await persistor.flush();
    },
});

export default connect(null, mapDispatchToProps)(CustomDrawer);