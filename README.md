
       
       
# XDC Mobile Wallet

XDC Mobile Wallet is an easy-to-use, open-source, multiplatform, secure XDC and ERC20 wallet platform for both individuals and companies. XDC Mobile Wallet uses XDC01 Network for peer synchronization and network interfacing.

XDC Wallet is:

* simple
* secure
* private
* decentralized
* multi-currency
* cross-platform
* server-independent
* open source


# Introduction Summary

XDC Wallet is a Mobile Application that allows users to send XDC and XDCE tokens from one account to another, just in a few clicks. XDC Wallet initially allows wallet creation on public/private blockchain with any of the ERC standards.It allows the user to then send transactions on public/private blockchain depending on which network the token is deployed. It also enables user to add their custom token which is deployed either on public/private blockchain.

## Main Features of XDC wallet :

* Multiple wallet creation and management in-app
* Intuitive wallets
* Easy spending proposal flow for shared wallets and group payments
* Device-based security: all private keys are stored locally, not in the cloud
* Support for Xinfin testnet wallets
* Payment protocol XDC01 support: easily-identifiable payment requests and verifiable, secure token payments
* Email notifications for payments and transfers
* Push notifications (only available for ios and android versions)
* Customizable wallet naming and background colors

---

## Getting Started

### Install nodejs (v 8.9.3 and npm (v 5.5.1)

    https://nodejs.org/en/download/

### Install React Native CLI
    npm install -g react-native-cli
    
 ### Checkout develop branch & install node_modules

    cd XDCWallet-RN
    npm install

### Run the app in debug mode

`react-native run-ios` or `react-native run-android`

## Debugging

For debugging, we recommend using React Native Debugger

## To use OAUTH

```
React-native-Oauth
    add 
        mWebView.getSettings().setUserAgentString("Mozilla/5.0 Google");
     in
         node_modules/react-native-oath/android/src/main/java/io/fullstack/oauth/oAuthManagerDialogFragment.java
         
 ```


# How it works

* User needs to signup for first time using GOOGLE signup or Slack.
* A new wallet is generated offline for the user providing a new public address and private key.
* User get to see the balance of XDC, XDCE and other custom tokens balances on dashboard in his native currency
* Whenever a user attempts to send tokens a transaction is generated and signed with users private key offline and then the transaction is sent to the network.
* A user can also export his private key through various options.
* A transactions list shows all the transactions done by the user.
* The application is secured with mpin from wallet creation to logout,

# Screenshots

<img width="220" height="540" src="https://github.com/XinFinOrg/XDC-Mobile-Wallet/blob/master/screenshots/signup.jpeg"> 
<img width="220" height="540" src="https://github.com/XinFinOrg/XDC-Mobile-Wallet/blob/master/screenshots/mpin.jpeg">
<img width="220" height="540" src="https://github.com/XinFinOrg/XDC-Mobile-Wallet/blob/master/screenshots/Dashboard.jpeg">
<img width="220" height="540" src="https://github.com/XinFinOrg/XDC-Mobile-Wallet/blob/master/screenshots/drawer.jpeg">
<img width="220" height="540" src="https://github.com/XinFinOrg/XDC-Mobile-Wallet/blob/master/screenshots/send.jpeg">
<img width="220" height="540" src="https://github.com/XinFinOrg/XDC-Mobile-Wallet/blob/master/screenshots/addtoken.jpeg">




**Contribution and Collobration: 

XDC Wallet invites Community Contribution for developmnet of various usecase library for Bond Creation and Security token creation as per local law etc. Feel free to add usecase library.   

    How to Contribte: 
    
    Fork Repository (https://github.com/XinFinOrg/XDCWallet-RN/fork)
    
    Create your feature branch (git checkout -b feature/fooBar)
    
    Commit your changes (git commit -am 'Add some fooBar')
    
    Push to the branch (git push origin feature/fooBar)
    
    Create a new Pull Request

