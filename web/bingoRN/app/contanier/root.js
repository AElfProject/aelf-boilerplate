import React from "react"
import { View, Image, StatusBar } from "react-native"

import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation"
import Icon from 'react-native-vector-icons/AntDesign';

import NavigationService from "../common/utils/navigationService";
import pTd from "../common/utils/unit"

import HomeScreen from "./Home/index"
import MineScreen from "./Mine/index"
import LoginStack from "./Login/index"
//redux
import { Provider, connect } from "react-redux";

import { createStore } from "redux";
import aelf from "../reducers/aelf";

let store = createStore(aelf);

/* a menu */
class MenuIcon extends React.Component {
    render() {
        const { name, src } = this.props;

        return (
            <View key={name} style={{ margin: 5 }}>
                <Image
                    style={{ width: pTd(45), height: pTd(45) }}
                    source={src}
                />
            </View>
        );
    }
}

/* 底部导航 */
const TabNavigatorStack = createBottomTabNavigator(
    {

        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: "INDEX",
                tabBarIcon: ({ tintColor, focused }) => (
                  <Icon name="home" size={20} color={ focused ? Colors.fontColor : Colors.fontBlack }/>
                )
            }
        },

        MineScreen: {
            screen: MineScreen,
            navigationOptions: {
                tabBarLabel: "MY",
                tabBarIcon: ({ tintColor, focused }) => (
                  <Icon name="user" size={20} color={ focused ? Colors.fontColor : Colors.fontBlack }/>
                )
            }
        },

    },
    {
        initialRouteName: "HomeScreen",
        tabBarOptions: {
            activeTintColor: "gray",
            inactiveTintColor: "gray",
            style: {
                borderTopColor: "#ececec",
                borderWidth: pTd(1)
            }
        }
    }
);

/* 生成 */
const NavigationMain = createAppContainer(TabNavigatorStack);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <NavigationMain
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef); //设置顶层路由导航
                    }}
                />
            </Provider>
        );
    }
}
