import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView, Alert, Linking } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import { Button, Input } from "react-native-elements"
import Password from 'react-native-password-pay'
import QRCode from 'react-native-qrcode-svg';

import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import CommonModal from "../../../common/Components/CommonModal/CommonModal";

import pTd from "../../../common/utils/unit";
import { TextM } from "../../../common/UI_Component/CommonText";
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"

import {aelfInstance} from '../../../common/utils/aelfProvider';
import connect from "../../../common/utils/myReduxConnect";
import {config} from "../../../common/utils/config";

const {unitConverter} = require('../../../common/utils/unitConverter');

/*
 * 提现
 **/

class MyWithdraw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            avaliableBalance: 100,
            amountToWithdraw: 0,
            transactionPsw: "",
            originTransactionPsw: "123456",
            transactionPswStatus: false,   //密码正确还是错误
            toAddress: config.customerAddress
        }
    }
    componentDidMount() {
        // this.getFirstRequest();
        this.freshBalance();
    }
    // async getFirstRequest() {
    //     let params = this.props.navigation.getParam("params");
    // }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    async freshBalance(){
        const address = this.props.ReduxStore.address;
        const {tokenContract} = this.props.ReduxStore.contracts;
        //获取余额
        try {
            const res = await tokenContract.GetBalance.call({
                symbol : "ELF",
                owner : address ,
            });
            this.props.onFreshBalance({
                balance: unitConverter.toLower(res.balance,8).toString(),
            })
            //console.log(res);
        } catch (error) {
            //出错的话重连
            //this.initProvider();
            console.log(error);
        }
    }

    async confirmWithdraw(){
        const {tokenContract} = this.props.ReduxStore.contracts;
        const { toAddress, amountToWithdraw } = this.state;

        //也就是转账
        try {
            const transaction = await tokenContract.Transfer({
              symbol : "ELF",
              to : toAddress,//'x7G7VYqqeVAH8aeAsb7gYuTQ12YS1zKuxur9YES3cUj72QMxJ',//'SkMGjviAAs9bnYvv6cKcafbhf6tbRGQGK93WgKvZoCoS5amMK' ,
              amount : unitConverter.toHigher(amountToWithdraw,8).toString(),
            });

            console.log('transaction: ', transaction);

            const txResult = await aelfInstance.chain.getTxResult(transaction.TransactionId);
            console.log('transaction txResult:', txResult);
            // if (txResult.tx_status)

            this.tipMsg("Withdrawal transaction initiated", 2000);
            setTimeout(() => {
                this.goRouter("TransactionDetail",{item: {}, title: 'withdraw', txId: transaction.TransactionId});
            }, 2000);
        } catch (error) {
            console.log(error);
            this.tipMsg("Withdraw failed", 2000);
        }

    }
    /* 改变modal状态 */
    changeModalStatus() {
        const { amountToWithdraw, avaliableBalance } = this.state;
        if (amountToWithdraw >= avaliableBalance) {
            this.tipMsg("Insufficient balance", 2000);
        }
        else {
            this.setState(prev => ({
                modalVisible: !prev.modalVisible
            }))
        }

    }
    /* onChangeText */
    async onChangeText(text) {
        let originTransactionPsw = await AsyncStorage.getItem(Storage.transactionPsw);
        this.setState({
            transactionPsw: text
        }, () => {

            if (this.state.transactionPsw === originTransactionPsw) {
                this.changeModalStatus();
                //给账户转账
                this.confirmWithdraw();
                //this.tipMsg("提现成功", 2000);

                this.setState({
                    transactionPswStatus:false
                })
            }
            else if (this.state.transactionPsw.length === 6 && (this.state.transactionPsw !== originTransactionPsw)) {
                this.setState({
                    transactionPsw: "",
                    transactionPswStatus: true
                });
                //console.log();

                this.psw._input.clear();    //IOS可能不行
                this.psw.setState({text: ''});
            }
        })
    }

    /* onChangeAddressText */
    onChangeAddressText(text) {
        this.setState({
            toAddress: text
        });
    }
    onChangeAmountText(text) {
        this.setState({
            amountToWithdraw: parseInt(text)
        });
    }
    /* 密码框 */
    modalContent() {
        const {   transactionPswStatus } = this.state
        return (
            <View style={{ alignItems: "center", ...Gstyle.marginArg(pTd(50)) }}>
                <TextM>Please input password</TextM>

                <Password maxLength={6}
                    ref={psw => this.psw = psw}
                    style={Gstyle.marginArg(pTd(50),0,pTd(30),0)}
                    onChange={(value) => this.onChangeText(value)}
                />
                {
                    transactionPswStatus && <TextM style={{color:"red"}}>Password Error</TextM>
                }
            </View>
        )

    }

    callCustomer() {
        let tel = 'tel:' + config.customerTel; // 目标电话
        Alert.alert('Call', config.customerTel,
          [ { text: 'Cancel', onPress: () => { console.log('取消') } },
              { text: 'OK',
                  onPress: () => {
                      Linking.canOpenURL(tel).then((supported) => {
                          if (!supported) {
                              console.log('Can not handle tel:' + tel)
                          } else {
                              return Linking.openURL(tel)
                          }
                      }).catch(error => console.log('tel error', error))
                  } }]);
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={Gstyle.container}>
                <CommonHeader canBack title="Withdraw" />
                <ScrollView>
                    <View style={[Gstyle.frcc, Gstyle.marginArg(pTd(30), 0, 0, 0)]}>
                        {/*<TextM>Amount：</TextM>*/}
                        <Input
                           label='1. Withdraw Amount'
                           labelStyle={{
                               color: Colors.primaryColor
                           }}
                           style={styles.inputStyle}
                           onChangeText={text=>this.onChangeAmountText(text)}
                           placeholder={`Withdrawable balance ${this.props.ReduxStore.balance}`}
                        />
                        {/*<TextM>金币</TextM>*/}
                    </View>
                    {/*  */}
                    <View>
                        {/*<Icon name="customerservice" size={18} color={Colors.primaryColor} />*/}
                        <TextM style={{
                            color: Colors.primaryColor,
                            marginLeft: pTd(18),
                            marginBottom: pTd(16),
                            fontSize: pTd(32),
                            fontWeight: '500' }}>
                            2. Contact customer service and withdraw.
                        </TextM>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", ...Gstyle.marginArg(pTd(0), 0, 0, 0) }}>
                        {/*<View style={[Gstyle.frc, Gstyle.marginArg(pTd(0), 0)]}>*/}
                        {/*    <Icon name="customerservice" size={18} color={Colors.primaryColor} />*/}
                        {/*    <TextM style={{ color: Colors.primaryColor, marginLeft: pTd(20) }}>2. Contact customer service</TextM>*/}
                        {/*</View>*/}
                        <TouchableOpacity
                          onPress={() => this.callCustomer()}
                        >
                            <QRCode
                              value={config.customerAddress}
                              getRef={(c) => (this.svg = c)}
                              logo={require("../../../assets/images/home/aelf_blue.jpg")}
                              logoSize={38}
                              logoMargin={4}
                              logoBackgroundColor={"#fff"}
                              size={200}
                            />
                        </TouchableOpacity>
                        <Text>Click qr code to contact</Text>
                        {/*<Image style={{ width: pTd(300), height: pTd(300) }} source={require("../../../assets/images/mine/qrcode.png")} />*/}
                    </View>
                    {/*<View style={{ justifyContent: "center", alignItems: "center", marginBottom: pTd(50) }}>*/}
                    {/*    <View style={[Gstyle.frcc]}>*/}

                    {/*        <Icon name="wallet" size={18} />*/}
                    {/*        <TextM style={{ fontWeight: '500', marginLeft: pTd(20) }}>客服转账，自动提现</TextM>*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    {/*<View style={Gstyle.marginArg(0, pTd(100))}>*/}
                    {/*    <View style={[Gstyle.frc,]}>*/}
                    {/*        <View style={Gstyle.frcc}>*/}
                    {/*            <Icon name="logout" size={12} />*/}
                    {/*            <TextM style={{ fontWeight: '500', marginLeft: pTd(20) }}>Transfer to exchange or other account</TextM>*/}
                    {/*        </View>*/}
                    {/*        <Icon name="scan1" size={18} />*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                    <View style={{ justifyContent: "center", alignItems: "center", ...Gstyle.marginArg(pTd(32), 0, 0, 0) }}>
                        <Input
                          label='Extra: Transfer to exchange or other account'
                          labelStyle={{
                              color: Colors.primaryColor
                          }}
                          style={styles.moneyAddress}
                          onChangeText={
                              text=>this.onChangeAddressText(text)
                          }
                          placeholder="Please input address"
                          defaultValue=''
                        />
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", ...Gstyle.marginArg(pTd(20), 0) }}>
                        <Button
                            title="Withdraw"
                            onPress={() => this.changeModalStatus()}
                            titleStyle={{ fontSize: pTd(30) }}
                            buttonStyle={styles.btnStyle}
                        />

                    </View>
                </ScrollView>

                <CommonModal
                    visible={modalVisible}
                    changeModalStatus={this.changeModalStatus.bind(this)}
                    noScroll={true}
                    containerStyle={styles.containerStyle}
                    content={this.modalContent()} />
            </View>
        )
    }
}

const Withdraw = connect(MyWithdraw);
export default Withdraw

const styles = StyleSheet.create({
    inputStyle: {
        ...Gstyle.borderArg(),
        ...Gstyle.marginArg(0, pTd(20)),
        ...Gstyle.paddingArg(pTd(10), pTd(20)),
        width: pTd(400),
        textAlign: "right"
    },
    moneyAddress: {
        ...Gstyle.borderArg(),
        marginTop: pTd(20),
        ...Gstyle.paddingArg(pTd(4), pTd(10)),
        width: "100%"
    },
    phoneImg: {
        width: pTd(36), height: pTd(42), marginRight: pTd(20)
    },
    btnStyle: {
        backgroundColor: Colors.primaryColor,
        ...Gstyle.radiusArg(pTd(60)),
        width: pTd(400),
        marginBottom: pTd(30)
    },
    containerStyle: {
        height: pTd(360),
    },

})
