import React from "react"
import Tab from './Tab';

import HomeStack from '../Home';
import LoginStack from '../Login';
import MineStack from '../Mine';
import { createStackNavigator } from '@react-navigation/stack';
import navigationService from '../../common/utils/navigationService';
import { NavigationContainer } from '@react-navigation/native';
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
            screenOptions={{
                header: () => null,
            }}>
            {
                stackNav.map((item, index) => (
                    <Stack.Screen key={index} {...item} />
                ))
            }
        </Stack.Navigator>
    </NavigationContainer>
);
export default NavigationMain