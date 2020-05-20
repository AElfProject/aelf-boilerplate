import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Linking, TextInput } from "react-native"
import { Button, Divider, Input } from "react-native-elements"
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
            jackpot: '-',
            symbol: '-',
            bingoGameAllowance: '-',
            pullRefreshing: false,
            betCount: 0,
            transactionId: null,
            showBingo: false,
            bingoResult: null,
            checkPlayBingoStatusTimes: 0
        };
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
        await this.getUserBalance(contracts, address);
        await this.getApprovedNumber();
        this.getBingoGameContractBalane();
        this.registerBingo();
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
            return await tokenContract.GetBalance.call({
                symbol: 'ELF',
                owner: address
            });
        }
        return false;
    }
    async getUserBalance(contractsInput, addressInput) {
        const balance = await this.getTokenBalance(contractsInput, addressInput);
        if (!balance) {
            return;
        }
        this.setState({
            balance: balance.balance / (10 ** 8),
            symbol: balance.symbol
        });
    }

    async getApprovedNumber() {

        const reduxStoreData = this.props.ReduxStore;
        const { address: addressStore, contracts: contractsStore } = reduxStoreData;
        const address = addressStore;
        const contracts = contractsStore;

        const { tokenContract, bingoGameContract } = contracts;
        if (address && tokenContract && tokenContract.GetAllowance) {
            const allowance = await tokenContract.GetAllowance.call({
                symbol: 'ELF',
                spender: bingoGameContract.address,
                owner: address
            });

            this.setState({
                bingoGameAllowance: allowance.allowance / (10 ** 8)
            });
        }
        return false;
    }

    async getBingoGameContractBalane() {
        const reduxStoreData = this.props.ReduxStore;
        const { contracts } = reduxStoreData;
        const { bingoGameContract } = contracts;
        if (!(bingoGameContract && bingoGameContract.address)) {
            return;
        }

        const balance = await this.getTokenBalance(null, bingoGameContract.address);

        if (!balance) {
            return;
        }
        this.setState({
            jackpot: balance.balance / (10 ** 8),
        });
    }

    async registerBingo() {
        if (this.lock || this.registed) {
            return;
        }
        this.lock = true;
        const reduxStoreData = this.props.ReduxStore;
        const { contracts } = reduxStoreData;
        const { bingoGameContract } = contracts;
        const result = await bingoGameContract.Register();
        const init = await bingoGameContract.Initial();
        this.lock = false;
        this.registed = true;
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
        await this.getUserBalance();
        await this.registerBingo();
        await this.getBingoGameContractBalane();
        await this.getApprovedNumber();
        await this.getChainStatus();
        this.setState({
            pullRefreshing: false
        });
    }

    onBetChange(betCount) {
        this.setState({
            betCount
        });
    }

    onBetButtonClick(value) {
        this.setState({
            betCount: value
        });
    }

    getBingoContract() {
        const reduxStoreData = this.props.ReduxStore;
        const { contracts } = reduxStoreData;
        const { bingoGameContract } = contracts;
        return bingoGameContract;
    }

    async playBingo() {
        const reduxStoreData = this.props.ReduxStore;
        const { contracts, address } = reduxStoreData;
        if (!address) {
            this.tipMsg('Please login');
            return;
        }

        const { balance, betCount, bingoGameAllowance } = this.state;
        if (betCount <= 0) {
            this.tipMsg('Please bet');
            return;
        }
        if (betCount >= balance) {
            this.tipMsg('Insufficient balance');
            return;
        }
        if (betCount > bingoGameAllowance) {
            this.tipMsg('Insufficient allowance');
            return;
        }
        const { bingoGameContract } = contracts;

        const transactionId = await bingoGameContract.Play({
            value: betCount * (10 ** 8)
        });
        this.setState({
            transactionId: transactionId.TransactionId,
            showBingo: true,
            bingoResult: null
        });

        setTimeout(() => {
            this.checkPlayBingoStatus(transactionId.TransactionId)
        }, 1000);
    }
    async checkPlayBingoStatus(transactionId) {
        const playTxResult = await aelfInstance.chain.getTxResult(transactionId);
        if (this.checkPlayBingoStatusTimes >= 5) {
            this.tipMsg('Can not find this play transaction in system');
            return;
        }

        if (playTxResult.Status === 'NotExisted') {
            this.checkPlayBingoStatusTimes++;
            setTimeout(() => {
                this.checkPlayBingoStatus(transactionId);
            }, 2000);
        }

        this.checkPlayBingoStatusTimes = 0;

        if (playTxResult.Status === 'PENDING') {
            setTimeout(() => {
                this.checkPlayBingoStatus(transactionId);
            }, 1000);
        }
        if (playTxResult.Status === 'FAILED') {
            this.tipMsg('Play failed, please try again');
            this.setState({
                transactionId: null,
                showBingo: false,
                bingoResult: null
            });
            return;
        }
        await this.getUserBalance();
        await this.getBingoGameContractBalane();
        await this.getApprovedNumber();
    }

    async getBingoResult(transactionId) {
        const txResult = await aelfInstance.chain.getTxResult(transactionId);
        if (txResult.Status === 'PENDING') {
            setTimeout(() => {
                this.getBingoResult(transactionId);
            }, 1000);
        }
        if (txResult.Status === 'FAILED') {
            this.tipMsg('Bingo Transaction failed.');
            return;
        }
        if (txResult.Status === 'MINED') {
            const { transactionId: transactionIdPlay  } = this.state;
            const bingoGameContract = this.getBingoContract();
            const awardResult = await bingoGameContract.GetAward.call(transactionIdPlay);
            this.setState({
                showBingo: false,
                bingoResult: awardResult.value / (10**8)
            });

            await this.getUserBalance();
            await this.getBingoGameContractBalane();
            await this.getApprovedNumber();
        }
    }

    async bingoBingo() {
        const { transactionId } = this.state;

        const bingoGameContract = this.getBingoContract();
        const bingoTxId = await bingoGameContract.Bingo(transactionId);
        const txResult = await aelfInstance.chain.getTxResult(bingoTxId.TransactionId);
        if (txResult.Status === 'NotExisted') {
            this.tipMsg('Not ready to award, please wait a second.');
            return;
        }
        this.tipMsg('Loading...');
        this.getBingoResult(bingoTxId.TransactionId);
    }

    renderBingoResult() {
        const {bingoResult} = this.state;
        if (!bingoResult) {
            return;
        }
        return (
          <View>
              <Text>Bingo Result: {bingoResult > 0 ? 'You win ' : 'You lose '}{Math.abs(bingoResult)}</Text>
          </View>
        );
    }

    renderBingoTx() {
        const { transactionId } = this.state;
        if (!transactionId) {
            return;
        }
        return (
            <View>
                <Text>Bingo Tx: </Text>
                <TouchableOpacity>
                    <Text style={{ color: Colors.fontColor }} onPress={() =>
                      Linking.openURL(config.explorerURL + '/tx/' +  transactionId)
                    }>{transactionId}</Text>
                    <Text>Click to turn to aelf explorer.</Text>
                </TouchableOpacity>
                <Text>Waiting seconds, then you can draw the prize.</Text>
                <Text>And please do not refresh the page now.</Text>
            </View>
        );
    }

    render() {
        const {
            chainStatus, balance, bingoGameAllowance,
            symbol, pullRefreshing, jackpot, betCount, transactionId,
            showBingo, bingoResult
        } = this.state;
        const reduxStoreData = this.props.ReduxStore;
        const { address, keystore, contracts } = reduxStoreData;
        const { nickName } = keystore || {};

        // console.log('betCount: ,', betCount);

        const {bingoGameContract} = contracts || {};
        const bingoTxHTML = this.renderBingoTx();
        const bingoResultHTML = this.renderBingoResult();
        return (
            <View style={Gstyle.container}>
                <CommonHeader
                    leftElement={this.leftElement()}
                    title="Bingo Game Dev Demo"
                    rightElement={this.rightElement()}
                />
                <ScrollView
                  refreshControl={
                      <RefreshControl refreshing={pullRefreshing} onRefresh={() => this.onRefresh()} />
                  }
                >
                    <Text style={styles.title}>1.Bingo Game Dev Demo</Text>
                    <Text>In this demo, you can</Text>
                    <Text>1.How to use random numbers in elf.</Text>
                    <Text>2.How to register account in an aelf contract.</Text>
                    <Text>3.How to call inline contract.</Text>
                    <Divider style={styles.divider} />

                    <Text style={styles.title}>2.Play the game</Text>
                    <View style={styles.buttonContainer}>
                        <TextInput
                          style={styles.inputStyle}
                          placeholder="Please bet"
                          onChangeText={betCount => this.onBetChange(betCount)}
                          value={betCount + ''}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={styles.bingoButton} title={50} onPress={() => this.onBetButtonClick(50)}/>
                        <Button buttonStyle={styles.bingoButton} title={100} onPress={() => this.onBetButtonClick(100)}/>
                        <Button buttonStyle={styles.bingoButton} title={200} onPress={() => this.onBetButtonClick(200)}/>
                        <Button buttonStyle={styles.bingoButton} title={500} onPress={() => this.onBetButtonClick(500)}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={styles.bingoButton} title={1000} onPress={() => this.onBetButtonClick(1000)}/>
                        <Button buttonStyle={styles.bingoButton} title={2000} onPress={() => this.onBetButtonClick(2000)}/>
                        <Button buttonStyle={styles.bingoButton} title={'half'} onPress={() => this.onBetButtonClick(Math.floor(balance) / 2)}/>
                        <Button buttonStyle={styles.bingoButton} title={'all in'} onPress={() => this.onBetButtonClick(Math.floor(balance))}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        {!showBingo && <Button buttonStyle={styles.bingoButtonSubmit} title={'Play'} onPress={() => this.playBingo()}/>}
                        {showBingo && <Button buttonStyle={styles.bingoButtonSubmit} title={'Bingo'} onPress={() => this.bingoBingo()}/>}
                    </View>
                    {bingoTxHTML}
                    {bingoResultHTML}

                    <Divider style={styles.divider} />

                    <Text style={styles.title}>3.Abount your account.「Pull down to refresh」</Text>
                    <Text style={styles.basicText}>NickName: {nickName || 'Please login'}</Text>
                    <Text style={styles.basicText}>Address: {address && format(address) || 'Please login'}</Text>
                    <Text style={styles.basicText}>Symbol: {symbol}</Text>
                    <Text style={styles.basicText}>ELF Balance: {balance}</Text>
                    <Text style={styles.basicText}>Allowance for the app: {bingoGameAllowance}</Text>
                    <Divider style={styles.divider} />

                    <Text style={styles.title}>4.About the Game</Text>
                    <Text>Contract Address: </Text>
                    <Text>{bingoGameContract && bingoGameContract.address}</Text>
                    <Text>Jackpot: {jackpot}</Text>
                    <Text>Contract on Explorer</Text>
                    <TouchableOpacity>
                        <Text style={{ color: Colors.fontColor }} onPress={() =>
                          Linking.openURL(config.contractExplorerURL + '' +  (bingoGameContract && bingoGameContract.address))
                        }>Click and ture to aelf block chain explore to get more information of the contract.</Text>
                    </TouchableOpacity>
                    <Text></Text>
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
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bingoButton: {
        flex: 1,
        width: 66,
        margin: 2,
        backgroundColor: "#817AFD",
    },
    bingoButtonSubmit: {
        flex: 1,
        width: 120,
        margin: 6,
        backgroundColor: "#817AFD",
    },
    inputStyle: {
        margin: 3,
        width: 300,
        height: 40,
        borderColor: Colors.borderColor,
        borderWidth: 1,
        borderRadius: 3
    }
});
