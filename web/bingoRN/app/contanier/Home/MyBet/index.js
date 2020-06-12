import React from "react";
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import WaitingDraw from './WaitingDraw'
import Lottery from './Lottery'
import { CommonHeader } from '../../../common/Components';
import pTd from "../../../common/utils/unit";
const tabActiveColor = Colors.primaryColor
/*
* MyBet
**/


export default createAppContainer(createMaterialTopTabNavigator({
    Lottery: {
        screen: Lottery,
        navigationOptions: {
            title: 'Lottery'
        }
    },
    WaitingDraw: {
        screen: WaitingDraw,
        navigationOptions: {
            title: 'Waiting for draw'
        }
    },
}, {
    lazy: true,
    showLabel: false,
    tabBarOptions: {
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
    },

    tabBarComponent: (props) => (
        <>
            <CommonHeader canBack title="My Bet" />
            <MaterialTopTabBar {...props} />
        </>
    )
}))
