import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";
import { config } from "../../../common/utils/config";
import { TextM, TextS } from "../../../common/UI_Component/CommonText";
// import { DividerH } from "../../../common/UI_Component/Divider";
import connect from "../../../common/utils/myReduxConnect";

// const {unitConverter} = require('../../../common/utils/unitConverter');
const { walletURL } = config;
/*
 * 资金明细
 **/
class MyFundingDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            address : '2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8',
            date: ["2020", "02"],
            items:[],
            total:0,
            withdrawAmount:0,
            depositAmount:0
        };
        this.dataApi = walletURL + '/api/token/txs?';
    }
    componentDidMount() {
        this.getFirstRequest();
    }
    async getFirstRequest() {
        console.log('getFirstRequest');
        // TODO: pages
        let url = this.dataApi;
        let args = {
            method:'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0'
            }
        };
        let param = {
            symbol: 'ELF',
            order : 'desc',
            limit : 20,
            page : 0,
            address : this.props.ReduxStore.address || this.state.address
        };
        for(let key in param){
            url += key + "=" + param[key] + "&";
        }
        console.log(url);
        fetch(url, args)
            .then((response)=>{
                return response.json();
            })
            .then((responseJson)=>{
                this.setState({
                    items: responseJson.transactions,
                    total:responseJson.total
                })
            })
            .catch((error)=>{
                console.error(error);
            })

    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* 选择数据 */
    // chooseData() {
    //
    //     let data = this.createYMD(new Date().getFullYear(), false);
    //     const { date } = this.state
    //     this.pickerInit(
    //         data,
    //         date,
    //         this.confirmChoose.bind(this),
    //         "date"
    //     )
    // }
    /* 回调 */
    // confirmChoose(type, value) {
    //     this.setState({
    //         [type]: value
    //     },()=>{
    //         //请求数据
    //     })
    // }
    /* 总支出 收入 */
    // title() {
    //     const { date, withdrawAmount, depositAmount } = this.state
    //     return (
    //         <View style={styles.funding_wrap}>
    //             <TouchableOpacity onPress={() => this.chooseData()}>
    //                 <View style={{ flexDirection: "row", alignItems: "center" }}>
    //                     <View>
    //                         <TextS>{date[0]}年</TextS>
    //                         <TextM style={styles.money}>{date[1]}</TextM>
    //                     </View>
    //                     <Icon name="caretdown" size={14} color={Colors.primaryColor} />
    //                 </View>
    //             </TouchableOpacity>
    //             <DividerH />
    //             <View style={{ alignItems: "center" }}>
    //                 <TextS>IN</TextS>
    //                 <TextM style={styles.money}>{withdrawAmount}</TextM>
    //             </View>
    //             <DividerH />
    //             <View style={{ alignItems: "center" }}>
    //                 <TextS>OUT</TextS>
    //                 <TextM style={styles.money}>{depositAmount}</TextM>
    //             </View>
    //         </View>
    //     )
    // }

    renderItem(item){
        const params = JSON.parse(item.params);
        const amount = params.amount / (10 ** 8);
        const timeFormatted = moment(item.time).format('YYYY-MM-DD HH:mm');
        const isWithdraw = item.address_from === this.state.address;
        const textShow = isWithdraw ? 'WithDraw' : 'Recharge';
        const onPressFn = () => this.goRouter("TransactionDetail",{
            item:item, title: textShow, txId: item.tx_id
        });

        return (
            <TouchableOpacity onPress={onPressFn} key={item.tx_id}>
                <View style={[Gstyle.frc, { marginBottom: pTd(20) }]}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="retweet" size={18} color={Colors.fontGray} />
                        <TextM style={{ marginLeft: pTd(20) }}>{textShow}</TextM>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {isWithdraw ? <TextM style={{ color: Colors.primaryColor }}>-{amount || '-'} </TextM> : <TextM >{amount || '-'} </TextM>}
                        <TextS> {timeFormatted}</TextS>
                        <TextS style={{ width: pTd(100), textAlign: 'right' }}>{item.tx_status}</TextS>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={[Gstyle.container, { backgroundColor: "#efefef" }]}>
                <CommonHeader canBack title="Details" />
                <ScrollView>
                    {/*{this.title()}*/}
                    <View style={Gstyle.marginArg(0, pTd(30))}>
                        <View >
                            {/* 提现 */}
                            {this.state.items.map((item,index)=>{
                                return item.quantity != 0 && this.renderItem(item);
                            })}
                            {/* 充值 */}
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const FundingDetail = connect(MyFundingDetail);
export default FundingDetail

const styles = StyleSheet.create({
    funding_wrap: {
        ...Gstyle.paddingArg(pTd(30), pTd(50)),
        ...Gstyle.frc,
        backgroundColor: "#fff"
    },
    money: {
        fontWeight: "500",
        marginTop: pTd(10)
    }
});
