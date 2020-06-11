import React from "react";
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator, MaterialTopTabBar } from 'react-navigation-tabs';
import WaitingDraw from './WaitingDraw'
import { CommonHeader } from '../../../common/Components';
import pTd from "../../../common/utils/unit";
const tabActiveColor = '#1a8fff'
const sreenWidth = Dimensions.get('screen').width

/*
* MyBet
**/


export default createAppContainer(createMaterialTopTabNavigator({
    WaitingDraw: {
        screen: WaitingDraw,
        navigationOptions: {
            title: 'Waiting for draw'
        }
    },
    Interest: {
        screen: WaitingDraw,
        navigationOptions: {
            title: 'Lottery'
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
            // marginLeft:sreenWidth*0.05/2,
            // alignSelf: 'center',
            backgroundColor: tabActiveColor,
            height: '100%',
            alignSelf: 'center',
            // width :sreenWidth*0.4,
            // right:10,
        },
        style: {
            backgroundColor: 'white',
            borderColor: tabActiveColor,
            elevation: 0,
            borderWidth: 2,
            // marginHorizontal:sreenWidth*0.1,
        },
    },

    tabBarComponent: (props) => (
        <>
            <CommonHeader canBack title="My Bet" />
            <MaterialTopTabBar {...props} />
        </>
    )
}))
