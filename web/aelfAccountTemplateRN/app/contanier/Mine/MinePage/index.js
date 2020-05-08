import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from "react-native"
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/AntDesign';
import { ListItem } from "react-native-elements"
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"
import QRCode from 'react-native-qrcode-svg';

import navigationService from "../../../common/utils/navigationService";
import BackHandlerHoc from "../../../common/Hoc/BackHandlerHoc/backHandlerHoc";

import pTd from "../../../common/utils/unit";
import { TextM, TextS, TextL, MutilText } from "../../../common/UI_Component/CommonText";
import CommonModal from "../../../common/Components/CommonModal/CommonModal";
import { DividerH, DividerW } from "../../../common/UI_Component/Divider";
import addressUtils from '../../../common/utils/address';

const {appInit} = require('../../../common/utils/aelfProvider');
const {unitConverter} = require('../../../common/utils/unitConverter');

import connect from "../../../common/utils/myReduxConnect";
import {config} from "../../../common/utils/config";
const { balanceRefreshInterval } = config;

//余额刷新频率
const periodInterval = 10;  //每期间隔20s

/*
 * 我的主页
 **/

class MyMinePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            modalContentType: 0,  //0:二维码 1：退出
            keyStore: '1',
            accountAddress: '',
            nickName: '-',
            accountBalance: 0,
            accountAllowance: 0,
            contracts : 0,
            sets: [
                {
                    src: <Image resizeMode={"stretch"} style={{ width: pTd(46), height: pTd(52) }} source={require("../../../assets/images/mine/safe.png")} />,
                    name: "Security Center",
                    router: "SecurityCenter"
                },
                {
                    src: <Image resizeMode={"stretch"} style={{ width: pTd(46), height: pTd(52) }} source={require("../../../assets/images/mine/help.png")} />,
                    name: "Help Center",
                    router: "HowToPlay"
                },
                {
                    src: <Image resizeMode={"stretch"} style={{ width: pTd(32), height: pTd(60) }} source={require("../../../assets/images/mine/aboutUs.png")} />,
                    name: "About",
                    router: "AboutUs"
                },
            ]
        }
    }
    componentWillMount = () => {
        this.didBlurSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
               this.checkLogin()
            }
          );

    };
    checkLogin(){
        this.checkTokenStatus()
        .then((token)=>{
            if(!token){
                this.goRouter("LoginStack")
            }
            this.requestOrder();
        })

    }
    componentDidMount() {

        this.requestOrder();
        //console.log(this.props);
    }
    componentWillUnmount(){
        this.didBlurSubscription.remove();
        clearInterval(this.updateBalance);
        this.setState = () => {};
    }

    requestOrder() {
        Promise.resolve()
        .then(res => {
            return this.initProvider();
        })
        .then(res => {
            return this.freshBalance();
        })
        .then(res => {
            return this.getFirstRequest();
        })

    }
    async getFirstRequest() {
        this.updateBalance = setInterval(()=>{
            this.freshBalance();
        }, balanceRefreshInterval);
    }
    //初始化连接aelf节点
    async initProvider(){
        const privateKey =  await AsyncStorage.getItem(Storage.userPrivateKey);
        const keyStoreString =  await AsyncStorage.getItem(Storage.userKeyStore);
        const keyStoreObject = JSON.parse(keyStoreString) || {};
        let userAddress =  keyStoreObject.address;
        console.log('keyStoreString: ', keyStoreString, privateKey);
        let nickName =  keyStoreObject.nickName;

        let contracts = this.props.ReduxStore.contracts;
        const loggedIn = this.props.ReduxStore.is_login;
        if (!contracts && loggedIn) {
            contracts = await appInit(privateKey);
        }

        this.setState({
            keyStore: keyStoreString,
            accountAddress: userAddress,
            nickName: nickName,
            contracts: contracts
        });

        !loggedIn && this.props.onLoginSuccess({
            contracts: contracts,
            address: userAddress});

    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    async qcodeType(){
        //console.log(this.props.ReduxStore);
        this.setState({
            modalContentType:0,
            modalVisible:true,
        });

    }
    async freshBalance(){
        //在这测试了下钱包
        //let privateKey =  await AsyncStorage.getItem(Storage.userPrivateKey);
        const {
          tokenContract,
          appContract
        } = this.props.ReduxStore.contracts;

        console.log('this.props.ReduxStore', this.props.ReduxStore);

        //获取余额
        try {
            const res = await tokenContract.GetBalance.call({
                symbol : "ELF",
                owner : this.state.accountAddress ,
            });
            this.setState({
                accountBalance: unitConverter.toLower(res.balance,8).toString(),
            });
            this.props.onFreshBalance({
                balance: unitConverter.toLower(res.balance,8).toString(),
            });
            //console.log(res);
        } catch (error) {
            //出错的话重连
            this.initProvider();
            console.log(error);
        }

        //获取allowance
        let allowance = -1;
        try {
            const res = await tokenContract.GetAllowance.call({
                symbol : "ELF",
                owner : this.state.accountAddress ,
                spender: appContract.address
            });
            allowance = unitConverter.toLower(res.allowance,8);
            this.setState({
                accountAllowance: allowance.toString(),
            });
            console.log('allowance:', res, allowance);
        } catch (error) {
            //出错的话重连
            //this.initProvider();
            console.log(error);
        }
        // allowance不足时approve
        if(allowance !== -1 && allowance < 500){
            try {
                await tokenContract.Approve({
                    symbol : "ELF",
                    spender: appContract.address,
                    amount : 100000000000,
                });
            } catch (error) {
                //this.initProvider();
                console.log(error);
            }
        }
    }
    /* changeModestatus */
    changeModalStatus() {
        this.setState(pre => ({
            modalVisible: !pre.modalVisible
        }))
    }
    /* 复制账户地址 */
    copyAddress() {
        Clipboard.setString(this.state.accountAddress);
    }
    /* 弹框内容 */
    modalContent() {
        const { accountAddress, modalContentType, keyStore } = this.state;
        return (modalContentType === 0 ) ? (
            <View style={{ justifyContent: "center", alignItems: "center", height: pTd(550) }}>
                <TextL >QR Code Account</TextL>
                <QRCode
                            value={ keyStore }
                            getRef={(c) => (this.svg = c)}
                            logo={require("../../../assets/images/home/aelf_blue.jpg")}
                            logoSize={38}
                            logoMargin={4}
                            logoBackgroundColor={"#fff"}
                            size={200}
                        />
                <View style={Gstyle.frcc}>
                    <TextS>Address：</TextS>
                    <TextS style={{ width: pTd(300) }}>{addressUtils.format(accountAddress)}</TextS>
                    <TouchableOpacity onPress={() => this.copyAddress()}>
                        <Icon name="copy1" size={18} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
                <View>
                    <View style={{justifyContent:"center", alignItems:"center", marginVertical:pTd(50)}}>
                        <Icon name="exclamationcircle" size={38} color={Colors.primaryColor} />
                        <MutilText style={{marginTop:pTd(20)}}>
                            Please confirm that you have properly saved your account QR code! Lost QR code is the same as lost account number.
                            Your assets will not be recovered. Please keep your account QR code properly!
                        </MutilText>
                    </View>
                    <DividerW />
                    <View style={{ flexDirection: "row", }}>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => {this.changeModalStatus();  this.goRouter("BackupQRcode")}}>
                            <TextL style={{color:"#0c69c4"}}>Backup</TextL>
                        </TouchableOpacity>
                        <DividerH />
                        <TouchableOpacity style={styles.btnStyle} onPress={() => {this.loginOut()}}>
                            <TextL  style={{color:"#0c69c4"}}>Logout</TextL>
                        </TouchableOpacity>
                    </View>
                </View>
            )
    }
    /* 我的信息 */
    myInfo() {
        const {balance} = this.props.ReduxStore;
        const {nickName} = this.state;
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => this.qcodeType()}>
                    <View style={styles.headerStyle}>
                        <Icon name="qrcode" size={70} color="#fff" />
                        <TextM style={{ fontWeight: '500', color: "#fff" }}>{nickName}</TextM>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.goRouter("FundingDetail")}>
                    <View style={styles.overage}>
                        <TextM style={{ color: "#fff" }}>Balance</TextM>
                        <TextM style={{ color: "#fff", marginLeft: pTd(50) }}>{balance}</TextM>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
    /* 我应该关心的 */
    myCare() {
        return (
            <View style={[Gstyle.frc, Gstyle.paddingArg(pTd(30), pTd(40)), { backgroundColor: "#fff" }]}>
                <TouchableOpacity style={{ width: "33%" }} onPress={() => this.goRouter("Recharge")}>
                    <View style={styles.myItem}>
                        <Image style={{ width: pTd(48), height: pTd(36), marginBottom: pTd(10) }} source={require("../../../assets/images/mine/recharge.png")} />
                        <TextM>Recharge</TextM>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "33%" }} onPress={() => this.goRouter("Withdraw")}>
                    <View style={styles.myItem}>
                        <Image style={{ width: pTd(38), height: pTd(38), marginBottom: pTd(10) }} source={require("../../../assets/images/mine/withdraw.png")} />
                        <TextM>Withdraw</TextM>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    /* 退出 */
    async loginOut() {
        this.changeModalStatus(); //
        await AsyncStorage.removeItem(Storage.userToken)
        await AsyncStorage.removeItem(Storage.userPrivateKey)
        await AsyncStorage.removeItem(Storage.userKeyStore)

        this.props.onLogout();

        this.goRouter("HomePage")

    }
    clickLoginOut(){
        this.setState({
            modalVisible: true,
            modalContentType:1
        })
    }
    render() {
        const { sets, modalVisible } = this.state
        return (
            <View style={[Gstyle.container, { backgroundColor: "#efefef" }]}>
                <ScrollView >
                    {this.myInfo()}
                    {this.myCare()}
                    <View style={Gstyle.marginArg(pTd(40), 0)}>
                        {
                            sets.map(item => {
                                return (
                                    <ListItem
                                        key={item.name}
                                        leftAvatar={item.src}
                                        onPress={() => this.goRouter(item.router)}
                                        title={item.name}
                                        bottomDivider
                                        chevron
                                    />
                                )
                            })
                        }
                    </View>
                    <ListItem

                        leftAvatar={<Image style={{ width: pTd(44), height: pTd(50) }} source={require("../../../assets/images/mine/loginOut.png")} />}
                        onPress={() => this.clickLoginOut()}
                        title={"Logout"}
                        bottomDivider

                    />
                </ScrollView>
                <CommonModal
                    changeModalStatus={() => this.changeModalStatus()}
                    visible={modalVisible}
                    content={this.modalContent()}
                />
            </View>
        )
    }
}

//连接redux
const MinePage = connect(BackHandlerHoc(MyMinePage));
export default MinePage;


// export default BackHandlerHoc(MinePage)

const styles = StyleSheet.create({
    headerStyle: {
        height: pTd(300),
        backgroundColor: "#7B86F9",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: pTd(40)
    },
    overage: {
        backgroundColor: "#5D66C1", height: pTd(60),
        ...Gstyle.frcc
    },
    myItem: {
        justifyContent: "center", alignItems: "center",

    },
    btnStyle: {
        width: "50%", textAlign: "center", height: pTd(100), lineHeight: pTd(100),
        justifyContent: 'center', alignItems: "center"
    },

})
