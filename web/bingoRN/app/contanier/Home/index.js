import React from "react";
import { createStackNavigator } from "react-navigation";

import HomePage from "./homePage/index";
import HowToPlay from "./howToPlay/index";

import LoginStack from "../Login/index";

const HomeStack = createStackNavigator({

    HomePage: {
        screen: HomePage,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    HowToPlay: {
        screen: HowToPlay,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    LoginStack: {
        screen: LoginStack,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },

});

HomeStack.navigationOptions = ({ navigation,screenProps }) => {
    return {
        tabBarVisible: navigation.state.index == 0
    };
};

export default HomeStack;
