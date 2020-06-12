import React, { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../Styles';
import { config } from "../../../../common/utils/config";
import { ListComponent } from '../../../../common/Components';
import { TextM, TextTitle } from "../../../../common/UI_Component/CommonText"

import { useSelector, useDispatch, shallowEqual } from 'react-redux'

/*
* WaitingDraw hooks
**/

function WaitingDraw(props) {
    const ReduxStore = useSelector(state => state, shallowEqual);
    const dispatch = useDispatch()

    useEffect(() => {
        onRefresh()
    }, [])

    let list
    const onRefresh = () => {
        getBetList()
        list && list.endUpPullRefresh()
    }
    const getBetList = async () => {
        const { address, contracts } = ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformation) {
            bingoGameContract.GetPlayerInformation.call(address).then(playerInformation => {
                dispatch({
                    type: 'SET_BET_LIST', data: { betList: playerInformation }
                })
            });
        }
    }
    const renderItem = ({ item }) => {
        const { boutType, amount, tokenSymbol, playId, isComplete, award } = item
        const list = [
            { title: 'Bet Type: ', details: boutType == '1' ? 'Small' : 'Big' },
            { title: 'Bet Amount: ', details: `${amount / config.tokenDecimalFormat} ${tokenSymbol}` },
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
                                        onPress={() => Clipboard.setString(item.details)} >
                                        {item.details}{` `}<Icon name='share-square-o' />
                                    </TextM>
                                    : <TextM style={{ flex: 1 }}>{item.details}</TextM>
                            }
                        </View>
                    ))
                }
                {
                    isComplete && <TextM style={styles.awardText}>{award > 0 ? 'Win: ' : 'Lose: '}{award}</TextM>
                }
            </View>
        )

    }
    const { betList } = ReduxStore || {}
    const { bouts } = betList
    return (
        <View style={styles.container}>
            <ListComponent
                data={bouts}
                renderItem={renderItem}
                UpPullRefresh={onRefresh}
                ref={v => list = v}
            />
        </View>
    )

}
export default WaitingDraw