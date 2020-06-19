import React from "react";
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import WaitingDraw from './WaitingDraw'
import Lottery from './Lottery'
import { CommonHeader } from '../../common/Components';
import pTd from "../../common/utils/unit";
const tabActiveColor = Colors.primaryColor
/*
* MyBet
**/
const Tab = createMaterialTopTabNavigator();

const tabNav = [
    { name: 'Lottery', component: Lottery, options: { title: 'Lottery' } },
    { name: 'WaitingDraw', component: WaitingDraw, options: { title: 'Waiting for draw' } }
]
const TabNavigatorStack = () => (
    <>
        <CommonHeader title="My Bet" />
        <Tab.Navigator
            lazy={false}
            tabBarOptions={{
                upperCaseLabel: false,
                activeTintColor: 'white',
                inactiveTintColor: tabActiveColor,
                labelStyle: { fontSize: pTd(32) },
                indicatorStyle: {
                    backgroundColor: tabActiveColor,
                    height: '100%',
                    alignSelf: 'center',
                },
                style: {
                    backgroundColor: 'white',
                    borderColor: tabActiveColor,
                    elevation: 0,
                    borderWidth: 2,
                },
            }}>
            {
                tabNav.map((item, index) => {
                    return (
                        <Tab.Screen key={index} {...item} />
                    )
                })
            }
        </Tab.Navigator>
    </>
);
export default TabNavigatorStack
