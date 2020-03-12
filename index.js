import React from 'react';
import { AppRegistry, StatusBar, AsyncStorage, ToastAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './shim';
import Navigator from './src/navigators';
import { persistor, store } from './src/config/store';
import AnalyticsUtils from './src/utils/analytics';
import {reduxPersistKey_old} from './src/utils/constants';

const getCurrentRouteName = async navigationState => {
  const pW = await AsyncStorage.getItem(`persist:${reduxPersistKey_old}`);
  const _pW = JSON.parse(pW);
  if(_pW && _pW !== 'null') {
    return "AppLoading";
  }

  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    return getCurrentRouteName(route);
  }

  return route.routeName;
};


const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Navigator
        onNavigationStateChange={(prevState, currentState) => {
          const currentScreen = getCurrentRouteName(currentState);
          const prevScreen = getCurrentRouteName(prevState);

          if (prevScreen !== currentScreen) {
            AnalyticsUtils.trackScreen(currentScreen);
          }
        }}
      />
      <StatusBar backgroundColor="#000000" barStyle="light-content" />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent('XDCWallet', () => App);
