import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import { Button } from "react-native-elements"
import Icon from 'react-native-vector-icons/AntDesign';
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import SplashScreen from "react-native-splash-screen"
import BackHandlerHoc from "../../../common/Hoc/BackHandlerHoc/backHandlerHoc";
import { TextM } from "../../../common/UI_Component/CommonText/index"

import pTd from "../../../common/utils/unit";

import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"
import connect from "../../../common/utils/myReduxConnect";
import {config} from "../../../common/utils/config";
const { splashScreenShowTime } = config;

const {appInit, aelfInstance} = require('../../../common/utils/aelfProvider');

/*
 * 主页
 **/
class MyHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chainStatus: {},
            address: null,
            balance: '-'
        }
    }
    componentWillMount(){
        setTimeout(()=>{
            SplashScreen.hide()
        }, splashScreenShowTime);
    }
    async componentDidMount() {
        this.initProvider();
        this.getChainStatus();
    }
    async getChainStatus() {
        const chainStatus = await aelfInstance.chain.getChainStatus();
        this.setState({
            chainStatus
        });
    }
    componentWillUnmount(){
        clearInterval(this.downTime)
    }

    async initProvider(){

        const privateKey =  await AsyncStorage.getItem(Storage.userPrivateKey);
        let loggedIn = privateKey  != null;

        // TODO: rewrite contract init logic
        const contracts = await appInit(privateKey);
        const keystore =  await AsyncStorage.getItem(Storage.userKeyStore) || '{}';
        const address = JSON.parse(keystore).address;
        // console.log('contracts 23333', contracts);
        this.props.onSetTempContracts({contracts: contracts});
        loggedIn && this.props.onLoginSuccess({
            contracts: contracts,
            address
        });

        this.setState({
            contracts
        });
        this.getTokenBalance(contracts, address);
        return contracts;
    }

    async getTokenBalance(contracts, address) {
        // const { contracts, address } = this.state;
        // tokenContract is config in ./config.js
        const { tokenContract } = contracts;
        console.log(contracts, address, address && tokenContract && tokenContract.GetBalance);
        if (address && tokenContract && tokenContract.GetBalance) {
            const balance = await tokenContract.GetBalance.call({
                symbol: 'ELF',
                owner: address
            });
            // console.log('balance: ', balance);
            this.setState({
                balance: balance.balance / (10 ** 8)
            });
        }
    }

    /* 跳转路由 */
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* 头部左边的按钮 */
    leftElement() {
        return (
            <TouchableOpacity onPress={()=>this.goRouter("HowToPlay")}>
                <View style={{ flexDirection: "row" }}>
                    <TextM style={{ color: Colors.fontColor, }}>Left</TextM>
                </View>
            </TouchableOpacity>
        )
    }
    /* 头部右边边的按钮 */
    rightElement() {
        return (
            <TouchableOpacity onPress={() => this.goRouter("MinePage")}>
                <TextM style={{ color: Colors.fontColor }}>My</TextM>
            </TouchableOpacity>
        )
    }

    render() {
        const { chainStatus, balance } = this.state;
        const reduxStoreData = this.props.ReduxStore;
        const { address } = reduxStoreData;
        return (
            <View style={Gstyle.container}>
                <CommonHeader
                    leftElement={this.leftElement()}
                    title="Hello aelf"
                    rightElement={this.rightElement()}
                />
                <ScrollView>
                    <Text style={styles.basicText}>Address: {address || 'Please login'}</Text>
                    <Text style={styles.basicText}>ELF Balance: {address && balance}</Text>
                    <Text style={styles.basicText}>BestChainHeight: {chainStatus.BestChainHeight}</Text>
                    <Button
                      buttonStyle={styles.btnStyle}
                      title="Refresh BestChainHeight"
                      onPress={async () => this.getChainStatus()}
                    />
                    <Text>Icon: </Text><Icon name="clockcircleo" size={20} />
                </ScrollView>
            </View>
        )
    }
}

//连接redux
const HomePage = connect(BackHandlerHoc(MyHomePage));
export default HomePage;

const styles = StyleSheet.create({
    basicText: {
      marginBottom: 2
    },
    btnStyle: {
        backgroundColor: "#817AFD",
        ...Gstyle.radiusArg(pTd(6)),
    }
});
