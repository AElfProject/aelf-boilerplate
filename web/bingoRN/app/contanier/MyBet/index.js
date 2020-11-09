import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import WaitingDraw from './WaitingDraw'
import Lottery from './Lottery'
import { CommonHeader } from '../../common/Components';
import pTd from "../../common/utils/unit";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import connect from "../../common/utils/myReduxConnect";

const tabActiveColor = Colors.primaryColor
/*
* MyBet
**/
const Tab = createMaterialTopTabNavigator();

const tabNav = [
    { name: 'Lottery', component: Lottery, options: { title: 'Lottery' } },
    { name: 'WaitingDraw', component: WaitingDraw, options: { title: 'Waiting for draw' } }
]
class TabNavigatorStack extends React.Component {
    componentDidMount() {
        const { navigation } = this.props
        this.unsubscribe = navigation.addListener('tabPress', () => {
            Promise.all([
                this.getLotteryList(),
                this.getBetList()
            ]).then(result => {
                console.log('My bet then: ', result);
            }).catch(error => {
                console.log('My Bet: ', error);
            })
        });
    }
    componentWillUnmount() {
        this.unsubscribe && this.unsubscribe()
    }
    getBetList = async () => {
        const { address, contracts } = this.props.ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformation) {
            const playerInformation = await bingoGameContract.GetPlayerInformation.call(address);
            let { bouts } = playerInformation || {}
            address == this.props.ReduxStore.address &&  Array.isArray(bouts) && this.props.onSetBetList({ betList: bouts.reverse() })
        }
    }
    getLotteryList = async () => {
        const { address, contracts } = this.props.ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformationCompleted) {
            const playerInformation = await bingoGameContract.GetPlayerInformationCompleted.call(address);
            let { bouts } = playerInformation || {}
            address == this.props.ReduxStore.address && Array.isArray(bouts) && this.props.onSetLotteryList({ lotteryList: bouts.reverse() });
        }
    }
    render() {
        return (
            <>
                <CommonHeader title="My Bet" />
                <Tab.Navigator
                    lazy={false}
                    tabBarOptions={{
                        allowFontScaling: false,
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
    }
}
export default connect(TabNavigatorStack)
