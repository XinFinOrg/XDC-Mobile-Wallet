
       
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

**1. Application - functionalities Onboarding :** 

The user will be welcomed with a splash screen displaying the company’s logo, application name and application version.

* Log in and registration
* Users can register and log in using (To Get Verify user accounts #KYC):
* E-mail address
* Google login
* FaceBook
* OAuth

**2. Registration requires adding: :** 

* E-mail address  (We will send OTP over email to verify account at time of withdrawal)
* Client Side PIN and FingerPrint (Only on Supported Devices)

**3. No Option for Forgot Password:** 

 We are not storing any private key for user on cloud hence recovery of User wallet won’t be possible from server, User are sole responsible for there private key or account.
 
 **4. No Option for Forgot Password:** 

Recover Account using Private key :-  We will give option for Application holder to use there existing private key on our app, Over here they will have to confirm email id authentication to get idea address-mapping.


**Navigation bar**

* At the bottom of the application, there is a navigation bar with options:

1. Home
2. Send
3. Receive 
4. Transactions

**Application - Flow**

* User can sign up with google login or email at start if his accounts doesn’t exist.

* After logging in the user has his option to export or backup the private key with various options(Shareit,Whatsapp,Messenger).

* The user will have a send tab where he can enter the receiver's address or scan receivers barcode to automatically enter the address.He can select the token which he wants to send and further after entering the amount he can send particular amount of tokens.

* The user has a receive tab to show he own account address.

* The transactions tab will display all the transactions made by particular users account.

* The settings tab may provide options to change the mpin,edit email,export private key and logout.

* There would be a option to add a custom token on the balance tab which will also display the users token balances.




**Application - Technicalities**


* On creation of account the private key of the user will be only stored on the mobile device in encrypted form.

* The address of users and email would be mapped in  table on the server.

* The account creation process creates a public/private keypair on client side.

* On an attempt of sending a transaction by user the transaction will be signed with the users private key and then the transaction will be sent to server and it will be verified on server and will be sent further.

* The user has an option to add a custom token other than XDC which exists on network and all the operations for the particular token would be maintained on client side.

* The internet connectivity is necessary to send the transactions.

* To export the private key user will be verified first with his mpin.

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

