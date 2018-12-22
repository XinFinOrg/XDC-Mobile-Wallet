import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './Component/Screens/Home';
import SignUp from './Component/Screens/SignUp';
import Main from './Component/Screens/Main';

const RouterComponent = () => {
    return (
        <Router navigationBarStyle={{backgroundColor: '#000',borderBottomColor: '#333'}} titleStyle={{color: '#ddd'}}>
            <Scene key="default" hideNavBar={true}>
                <Scene key="home" component={Home} />
            </Scene>

            <Scene key="signUpOptions">
                <Scene 
                    key="signUp" 
                    component={SignUp} 
                    title="Create Wallet"
                    leftTitle="Back"
                    onLeft={() => Actions.default()} />
            </Scene>

            <Scene key="Dashboard">
                <Scene 
                    key="main" 
                    component={Main} 
                    title="Dashboard" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;