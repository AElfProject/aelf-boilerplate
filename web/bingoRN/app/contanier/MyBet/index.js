import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WaitingDraw from './WaitingDraw'
import Lottery from './Lottery'
import { CommonHeader } from '../../common/Components';
import pTd from "../../common/utils/unit";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
const tabActiveColor = Colors.primaryColor
/*
* MyBet
**/
const Tab = createMaterialTopTabNavigator();

const tabNav = [
    { name: 'Lottery', component: Lottery, options: { title: 'Lottery' } },
    { name: 'WaitingDraw', component: WaitingDraw, options: { title: 'Waiting for draw' } }
]
const TabNavigatorStack = (props) => {
    const ReduxStore = useSelector(state => state, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        const { navigation } = props
        const unsubscribe = navigation.addListener('tabPress', () => {
            Promise.all([
                getLotteryList(),
                getBetList()
            ]).then(result => {
                console.log('My bet then: ', result);
            }).catch(error => {
                console.log('My Bet: ', error);
            })
        });
        return unsubscribe;
    }, [])
    const getLotteryList = async () => {
        const { address, contracts } = ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformationCompleted) {
            const playerInformation = await bingoGameContract.GetPlayerInformationCompleted.call(address)
            let { bouts } = playerInformation || {}
            Array.isArray(bouts) && dispatch({
                type: 'SET_LOTTERY_LIST', data: { lotteryList: bouts.reverse() }
            })
        }
    }
    const getBetList = async () => {
        const { address, contracts } = ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformation) {
            const playerInformation = await bingoGameContract.GetPlayerInformation.call(address)
            let { bouts } = playerInformation || {}
            Array.isArray(bouts) && dispatch({
                type: 'SET_BET_LIST', data: { betList: bouts.reverse() }
            })
        }
    }
    return (
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
    )
};
export default TabNavigatorStack
