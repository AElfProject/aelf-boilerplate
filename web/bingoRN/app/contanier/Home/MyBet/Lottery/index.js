import React, { useEffect, useRef } from "react";
import { View, Text, Linking } from "react-native";
import moment from 'moment'
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../Styles';
import { config } from "../../../../common/utils/config";
import { ListComponent } from '../../../../common/Components';
import { TextM, TextTitle, TextL } from "../../../../common/UI_Component/CommonText"

import { useSelector, useDispatch, shallowEqual } from 'react-redux'

/*
* WaitingDraw hooks
**/

function Lottery() {

    const ReduxStore = useSelector(state => state, shallowEqual);
    const dispatch = useDispatch()
    const list = useRef(null);

    useEffect(() => {
        onRefresh()
        return () => {
            dispatch({
                type: 'SET_NEW_BET', data: { newBet: false }
            })
        }
    }, [])

    const onRefresh = async () => {
        try {
            await getBetList()
            list.current && list.current.endUpPullRefresh()
        } catch (error) {
            console.log('onRefreshError', error);

        }
    }
    const getBetList = async () => {
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
    const renderItem = ({ item }) => {
        const { boutType, amount, tokenSymbol, playId, isComplete, award, betTime, lotteryCode } = item
        const { seconds } = betTime || {}
        const list = [
            { title: 'Bet Type: ', details: boutType == '1' ? 'Small' : 'Big' },
            { title: 'Bet Amount: ', details: `${amount / config.tokenDecimalFormat} ${tokenSymbol}` },
            { title: 'Time: ', details: moment(Number(seconds + '000')).format('YYYY-MM-DD HH:MM:SS') },
            {
                title: 'Lottery Code: ', details: lotteryCode, component:
                    isComplete ? <TextL style={{ ...styles.awardText, color: award < 0 ? 'red' : 'green' }}>{award > 0 ? 'Win: ' : 'Lose: '}{award / config.tokenDecimalFormat}</TextL>
                        : null
            },
            { title: 'Tx Id: ', details: playId, copy: true },
        ]
        return (
            <View style={styles.containerItem}>
                <View style={styles.flexRow}>
                    <TextTitle style={{ flex: 1 }}>Bet Transactions</TextTitle>
                    <Text>{!isComplete ? 'No draw' : 'Opened'}</Text>
                </View>
                {
                    list.map((item, index) => (
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View key={index} style={[styles.flexRow, { flex: 1 }]}>
                                <TextM>{item.title}</TextM>
                                {
                                    item.copy ?
                                        <TextM style={styles.copyDetails}
                                            onPress={() => Linking.openURL(config.explorerURL + '/tx/' + item.details)}>
                                            {item.details}{` `}<Icon name='share-square-o' />
                                        </TextM>
                                        : <TextM style={{ flex: 1 }}>{item.details}</TextM>
                                }
                            </View>
                            {
                                item.component ? item.component : <View />
                            }
                        </View>
                    ))
                }
            </View>
        )

    }
    const { lotteryList } = ReduxStore || {}
    return (
        <View style={styles.container}>
            <ListComponent
                data={lotteryList || []}
                renderItem={renderItem}
                upPullRefresh={onRefresh}
                ref={list}
            />
        </View>
    )

}
export default Lottery
