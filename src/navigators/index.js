import { 
  createStackNavigator, 
  createSwitchNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import {Easing, Animated} from 'react-native';
import {
  AddTokenScreen,
  AppLoadingScreen,
  CameraScreen,
  CreateWalletScreen,
  HomeScreen,
  SignUpScreen,
  NetworkPickerScreen,
  CurrencyPickerScreen,
  PinCodeScreen,
  PrivateKeyScreen,
  RecoverWalletScreen,
  SettingsScreen,
  TokenPickerScreen,
  WalletHomeScreen,
  WalletTransactionsScreen,
  WalletReceiveScreen,
  WalletSendScreen,
} from '../screens';

import CustomDrawer from './Drawer/Drawer'

const WelcomeNavigator = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
    SignUp: {
      screen: SignUpScreen,
    },
    CreateWallet: {
      screen: CreateWalletScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    RecoverWallet: {
      screen: RecoverWalletScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#181724',
    },
    headerMode: 'none',
    initialRouteName: 'SignUp',
  },
);

const WalletMainNavigator = createStackNavigator(
  {
    AddToken: {
      screen: AddTokenScreen,
    },
    Camera: {
      screen: CameraScreen,
    },
    CreateWallet: {
      screen: CreateWalletScreen,
    },
    WalletHome: {
      screen: WalletHomeScreen,
    },
    WalletTransactions: {
      screen: WalletTransactionsScreen,
    },
    NetworkPicker: {
      screen: NetworkPickerScreen,
    },
    CurrencyPicker: {
      screen: CurrencyPickerScreen,
    },
    PrivateKey: {
      screen: PrivateKeyScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
    Receive: {
      screen: WalletReceiveScreen,
    },
    Send: {
      screen: WalletSendScreen,
    },
    TokenPicker: {
      screen: TokenPickerScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#181724',
    },
    headerMode: 'none',
    initialRouteName: 'WalletHome',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig : () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    }),
  },
);

const SendNavigator = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
    SendMain: {
      screen: WalletSendScreen,
    },
    TokenPicker: {
      screen: TokenPickerScreen,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#181724',
    },
    headerMode: 'none',
    initialRouteName: 'SendMain',
  },
);

const WalletNavigator = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
    WalletMain: {
      screen: WalletMainNavigator,
    },
    Receive: {
      screen: WalletReceiveScreen,
    },
    Send: {
      screen: SendNavigator,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#181724',
    },
    headerMode: 'none',
    initialRouteName: 'WalletMain',
    mode: 'modal',
  },
);

const DrawerNavigation = createDrawerNavigator({
  Welcome: WalletMainNavigator,
},
{
  contentComponent: CustomDrawer,
  contentOptions: {
    activeTintColor: '#254a81',
  },
  drawerPosition: 'left',
  drawerBackgroundColor: 'white',
  drawerWidth: 270,
});

export default createSwitchNavigator(
  {
    AppLoading: AppLoadingScreen,
    PinCode: PinCodeScreen,
    // Wallet: WalletNavigator,
    Wallet: DrawerNavigation,
    Welcome: WelcomeNavigator,
  },
  {
    initialRouteName: 'AppLoading',
  },
);