import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Tab from './Tab';
import HomeStack from '../Home';
import LoginStack from '../Login';
import MineStack from '../Mine';
import { screenOptions } from './config';
import navigationService from '../../common/utils/navigationService';
const Stack = createStackNavigator();

const stackNav = [
    { name: 'Tab', component: Tab },
    ...HomeStack,
    ...LoginStack,
    ...MineStack
];

const NavigationMain = () => (
    <NavigationContainer ref={navigationService.setTopLevelNavigator}>
        <Stack.Navigator
            initialRouteName='Tab'
            screenOptions={screenOptions}>
            {
                stackNav.map((item, index) => (
                    <Stack.Screen key={index} {...item} />
                ))
            }
        </Stack.Navigator>
    </NavigationContainer>
);
export default NavigationMain