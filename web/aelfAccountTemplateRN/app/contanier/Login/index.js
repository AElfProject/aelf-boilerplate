import React from "react";
import { createStackNavigator } from "react-navigation";

import LoginPage from "./LoginPage/index";
import AccountLogin from "./accountLogin/index";
 
import Registered from "./registered/index";
import GenerateQRCode from "./generateQRCode/index";
import SetTransactionPsw from "../Mine/setTransactionPsw/index";

const LoginStack = createStackNavigator({
    LoginPage: {
        screen: LoginPage,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    GenerateQRCode: {
        screen: GenerateQRCode,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    AccountLogin: {
        screen: AccountLogin,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
 
    Registered: {
        screen: Registered,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    
    SetTransactionPsw: {
        screen: SetTransactionPsw,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
} );

LoginStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarVisible: navigation.state.index == 0
    };
};

export default LoginStack;