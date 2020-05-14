import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from "react-native"
import { Button, Divider } from "react-native-elements"
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
import {format} from "../../../common/utils/address";
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
            balance: '-',
            symbol: '-',
            pullRefreshing: false
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

    // TODO:
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     this.props.ReduxStore;
    //     prevProps.ReduxStore;
    // }

    async initProvider(){

        const privateKey =  await AsyncStorage.getItem(Storage.userPrivateKey);
        let loggedIn = privateKey  != null;

        // TODO: rewrite contract init logic
        const contracts = await appInit(privateKey);
        const keystore =  await AsyncStorage.getItem(Storage.userKeyStore) || '{}';
        const address = JSON.parse(keystore).address;
        this.props.onSetTempContracts({contracts: contracts});
        loggedIn && this.props.onLoginSuccess({
            contracts: contracts,
            address,
            keystore: JSON.parse(keystore)
        });

        this.setState({
            contracts
        });
        this.getTokenBalance(contracts, address);
        return contracts;
    }

    async getTokenBalance(contractsInput, addressInput) {
        const reduxStoreData = this.props.ReduxStore;
        const { address: addressStore, contracts: contractsStore } = reduxStoreData;
        const address = addressInput || addressStore;
        const contracts = contractsInput || contractsStore;
        // tokenContract is config in ./config.js
        const { tokenContract } = contracts;
        if (address && tokenContract && tokenContract.GetBalance) {
            const balance = await tokenContract.GetBalance.call({
                symbol: 'ELF',
                owner: address
            });
            this.setState({
                balance: balance.balance / (10 ** 8),
                symbol: balance.symbol
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

    async onRefresh() {
        this.setState({
            pullRefreshing: true
        });
        await this.getTokenBalance();
        await this.getChainStatus();
        this.setState({
            pullRefreshing: false
        });
    }

    render() {
        const { chainStatus, balance, symbol, pullRefreshing } = this.state;
        const reduxStoreData = this.props.ReduxStore;
        const { address, keystore } = reduxStoreData;
        const { nickName } = keystore || {};
        return (
            <View style={Gstyle.container}>
                <CommonHeader
                    leftElement={this.leftElement()}
                    title="Hello aelf"
                    rightElement={this.rightElement()}
                />
                <ScrollView
                  refreshControl={
                      <RefreshControl refreshing={pullRefreshing} onRefresh={() => this.onRefresh()} />
                  }
                >
                    <Text style={styles.title}>1.Get information of aelf chain.</Text>
                    <Text style={styles.basicText}>ChainId: {chainStatus.ChainId}</Text>
                    <Text style={styles.basicText}>BestChainHeight: {chainStatus.BestChainHeight}</Text>
                    <Button
                      buttonStyle={styles.btnStyle}
                      title="Refresh BestChainHeight"
                      onPress={async () => this.getChainStatus()}
                    />
                    <Divider style={styles.divider} />

                    <Text style={styles.title}>2.Get account information.</Text>
                    <Text style={styles.basicText}>NickName: {nickName || 'Please login'}</Text>
                    <Text style={styles.basicText}>Address: {address && format(address) || 'Please login'}</Text>
                    <Divider style={styles.divider} />

                    <Text style={styles.title}>3.Call Contract.</Text>
                    <Text style={styles.basicText}>We use token contract for example.</Text>
                    <Text style={styles.basicText}>Symbol: {symbol}</Text>
                    <Text style={styles.basicText}>ELF Balance: {balance}</Text>
                    <Text style={styles.basicText}>「Pull down to refresh」</Text>
                    <Divider style={styles.divider} />

                    <Text style={styles.title}>4.Use icon.</Text>
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
    title: {
      fontSize: 18,
      fontWeight: '500',
      color: Colors.fontColor
    },
    divider: {
        backgroundColor: Colors.borderColor,
        marginTop: 8,
        marginBottom: 8
    },
    basicText: {
      marginBottom: 2
    },
    btnStyle: {
        width: 300,
        backgroundColor: "#817AFD",
        ...Gstyle.radiusArg(pTd(6)),
    }
});
