import React, { useEffect, useRef } from "react";
import { View, Text , Linking} from "react-native";
import moment from 'moment'
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../Styles';
import { config } from "../../../common/utils/config";
import { ListComponent } from '../../../common/Components';
import { TextM, TextTitle } from "../../../common/UI_Component/CommonText"

import { useSelector, useDispatch, shallowEqual } from 'react-redux'

/*
* WaitingDraw hooks
**/

function WaitingDraw() {

    const ReduxStore = useSelector(state => state, shallowEqual);
    const dispatch = useDispatch()
    const list = useRef(null);

    useEffect(() => {
        onRefresh()
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
        if (bingoGameContract && bingoGameContract.GetPlayerInformation) {
            const playerInformation = await bingoGameContract.GetPlayerInformation.call(address)
            let { bouts } = playerInformation || {}
            Array.isArray(bouts) && dispatch({
                type: 'SET_BET_LIST', data: { betList: bouts.reverse() }
            })
        }
    }
    const renderItem = ({ item }) => {        
        const { boutType, amount, tokenSymbol, playId, isComplete, award, betTime } = item
        const { seconds } = betTime || {}
        const list = [
            { title: 'Bet Type: ', details: boutType == '1' ? 'Small' : 'Big' },
            { title: 'Bet Amount: ', details: `${amount / config.tokenDecimalFormat} ${tokenSymbol}` },
            { title: 'Time: ', details: moment(Number(seconds + '000')).format('YYYY-MM-DD HH:mm:ss') },
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
                        <View key={index} style={styles.flexRow}>
                            <TextM>{item.title}</TextM>
                            {
                                item.copy ?
                                    <TextM style={styles.copyDetails}
                                        onPress={() => Linking.openURL(config.explorerURL + '/tx/' + item.details)}>
                                        {item.details}<Icon name='share-square-o' />
                                    </TextM>
                                    : <TextM style={{ flex: 1 }}>{item.details}</TextM>
                            }
                        </View>
                    ))
                }
                {
                    isComplete && <TextM style={styles.awardText}>{award > 0 ? 'Win: ' : 'Lose: '}{award / config.tokenDecimalFormat}</TextM>
                }
            </View>
        )

    }
    const { betList } = ReduxStore || {}
    return (
        <View style={styles.container}>
            <ListComponent
                data={betList || []}
                renderItem={renderItem}
                upPullRefresh={onRefresh}
                ref={list}
            />
        </View>
    )

}
export default WaitingDraw
