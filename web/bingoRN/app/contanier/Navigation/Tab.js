import React from "react"
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../Home/homePage";
import MineScreen from "../Mine/MinePage";
import MyBet from '../MyBet'
import pTd from "../../common/utils/unit";

const Tab = createBottomTabNavigator();

const tabNav = [
    {
        name: 'HomePage', component: HomeScreen, options: {
            tabBarLabel: "INDEX",
            tabBarIcon: ({ color }) => (
                <Icon name="home" size={20} color={color} />
            )
        },
    },
    {
        name: 'MyBet', component: MyBet, options: {
            tabBarLabel: "MY BET",
            tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="format-list-bulleted" size={20} color={color} />
            )
        },
    },
    {
        name: 'MinePage', component: MineScreen, options: {
            tabBarLabel: "MY",
            tabBarIcon: ({ color }) => (
                <Icon name="user" size={20} color={color} />
            )
        },
    },
]
const TabNavigatorStack = () => (
    <Tab.Navigator
        initialRouteName='HomeScreen'
        lazy={false}
        tabBarOptions={{
            activeTintColor: Colors.fontColor,
            inactiveTintColor: Colors.fontBlack,
            style: {
                borderTopColor: "#ececec",
                borderWidth: pTd(1)
            },
            keyboardHidesTabBar: true    //hide tab
        }}>
        {
            tabNav.map((item, index) => {
                return (
                    <Tab.Screen key={index} {...item} />
                )
            })
        }
    </Tab.Navigator>
);

export default TabNavigatorStack
