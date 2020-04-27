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

/*
 * 提现详情
 **/
class WithdrawDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {
                params: '{}'
            }
        }
    }
    componentDidMount() {
        this.requestOrder();
        let params = this.props.navigation.getParam("params");
        this.setState({
            item : params.item
        })
    }
    requestOrder() {
        Promise.resolve().then(res => {
            return this.getFirstRequest();
        })
    }
    async getFirstRequest() {

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
        const { item } = this.state;
        const txStatusList = {
            Mined: "Success",
            Failed: "Failed",
            Pending: "Pending",
            NotExist: "NotExist"
        };
        const txStatus = txStatusList[item.tx_status] || 'Error';
        const params = JSON.parse(item.params);
        const amount = params.amount / (10 ** 8) || '-';

        return (
            <View style={Gstyle.container}>
                <CommonHeader canBack title="提现详情" />
                <ScrollView>
                    <View style={{ alignItems: "center", ...Gstyle.marginArg(pTd(50), 0) }}>
                        <Icon name="checkcircle" size={36} color={"green"} />
                        <TextM style={{ fontWeight: '500', marginVertical: pTd(16), }}>{txStatus}</TextM>
                        <TextS style={{ color: Colors.fontGray }}>{moment(item.time).format('YYYY-MM-DD HH:mm')}</TextS>
                    </View>
                    <View style={Gstyle.marginArg(0, pTd(50))}>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: pTd(40) }}>
                            <TextM>Amount：</TextM>
                            <TextL style={{ fontWeight: "500" }}>{amount}</TextL>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM>From：</TextM>
                            <TextM style={{ width: pTd(450) }}>{item.address_to}</TextM>
                            <TouchableOpacity onPress={() => this.copyAddress()}>
                                <Icon name="copy1" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM>To：</TextM>
                            <TextM style={{ width: pTd(450) }}>{item.address_from}</TextM>
                            <TouchableOpacity onPress={() => this.copyAddress()}>
                                <Icon name="copy1" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM>Tx ID：</TextM>
                            <TextM style={{ width: pTd(450) }}>{item.tx_id}</TextM>

                        </View>
                        <View style={{ flexDirection: "row", marginBottom: pTd(20) }}>
                            <TextM>Block：</TextM>
                            <TextM style={{ width: pTd(400) }}>{item.block_height}</TextM>

                        </View>
                    </View>
                    <View style={{ alignItems: "center" }}>
                    <QRCode
                            value={"https://explorer-test.aelf.io/tx/"+item.tx_id}
                            getRef={(c) => (this.svg = c)}
                            logoSize={38}
                            logoMargin={4}
                            logoBackgroundColor={"#fff"}
                            size={200}
                        />
                        <TouchableOpacity>
                            <TextM style={{ color: "#a39dfd" }} onPress={() => Linking.openURL("https://explorer-test.aelf.io/tx/"+item.tx_id)}>到aelf区块浏览器查看更多详细信息></TextM>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default WithdrawDetail

const styles = StyleSheet.create({

})
