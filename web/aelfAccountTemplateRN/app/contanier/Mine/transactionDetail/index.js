import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView, Linking } from "react-native"
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/AntDesign';
import moment from "moment"
import QRCode from 'react-native-qrcode-svg';

import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import { TextM, TextS, TextL } from "../../../common/UI_Component/CommonText";

import pTd from "../../../common/utils/unit";
import { config } from "../../../common/utils/config";
import { aelfInstance } from "../../../common/utils/aelfProvider";
import addressUtils from "../../../common/utils/address";

const { explorerURL } = config;

export default class transactionDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txResult: {
                TransactionId: '',
                Transaction: {
                    From: '',
                    To: '',
                    Params: '{}'
                },
                Status: ''
            }
        }
    }
    componentDidMount() {
        const params = this.props.navigation.getParam("params");
        const txId = params.txId;
        if (txId) {
            this.getTxResult(txId);
        } else {
            this.tipMsg('Can not find the transaction', 2000);
        }
    }

    async getTxResult(txId) {
        const txResult = await aelfInstance.chain.getTxResult(txId);
        this.setState({
              txResult
        });
    }

    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* 复制账户地址 */
    copyAddress() {
        Clipboard.setString(this.state.accountAddress);
    }
    render() {
        const { txResult } = this.state;
        const { Transaction } = txResult;
        const params = JSON.parse(Transaction.Params);
        const amount = params.amount / (10 ** 8) || '-';

        const routerParams = this.props.navigation.getParam("params");
        const txType = routerParams.title === 'withdraw' ? 'WithDraw' : 'Recharge';

        return (
            <View style={Gstyle.container}>
                <CommonHeader canBack title={txType} />
                <ScrollView>
                    <View style={{ alignItems: "center", ...Gstyle.marginArg(pTd(50), 0) }}>
                        <Icon name="checkcircle" size={36} color={"green"} />
                        <TextM style={{ fontWeight: '500', marginVertical: pTd(16), }}>{txResult.Status}</TextM>
                        {/*<TextS style={{ color: Colors.fontGray }}>{moment(item.time).format('YYYY-MM-DD HH:mm')}</TextS>*/}
                    </View>
                    <View style={Gstyle.marginArg(0, pTd(50))}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: pTd(40) }}>
                            <TextM>Amount：</TextM>
                            <TextL style={{ fontWeight: "500" }}>{amount}</TextL>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM style={ styles.textKey }>From：</TextM>
                            <TextM style={ styles.textValue }>{addressUtils.format(Transaction.To)}</TextM>
                            <TouchableOpacity onPress={() => this.copyAddress()}>
                                <Icon name="copy1" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM style={ styles.textKey }>To：</TextM>
                            <TextM style={ styles.textValue }>{addressUtils.format(Transaction.From)}</TextM>
                            <TouchableOpacity onPress={() => this.copyAddress()}>
                                <Icon name="copy1" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM style={ styles.textKey }>Tx ID：</TextM>
                            <TextM style={ styles.textValue }>{txResult.TransactionId}</TextM>

                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM style={ styles.textKey }>Block：</TextM>
                            <TextM style={ styles.textValue }>{txResult.BlockNumber}</TextM>
                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                    <QRCode
                            value={explorerURL + "/tx/" + txResult.TransactionId}
                            getRef={(c) => (this.svg = c)}
                            logoSize={38}
                            logoMargin={4}
                            logoBackgroundColor={"#fff"}
                            size={200}
                        />
                        <TouchableOpacity>
                            <TextM style={{ color: "#a39dfd", marginTop: pTd(16) }} onPress={
                                () => Linking.openURL(explorerURL + "/tx/" + txResult.TransactionId)
                            }>Turn to aelf block explorer</TextM>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textKey: { width: pTd(100) },
    textValue: { width: pTd(450) }
});
