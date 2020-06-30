import React from "react"
import { View, Text, TouchableOpacity, RefreshControl, Linking, TextInput, DeviceEventEmitter } from "react-native"
import { Button, Divider, Input, PricingCard, Card } from "react-native-elements"
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-community/async-storage"
import SplashScreen from "react-native-splash-screen"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import navigationService from "../../../common/utils/navigationService";
import { CommonHeader, WordRotation, Touchable } from '../../../common/Components'
import BackHandlerHoc from "../../../common/Hoc/BackHandlerHoc/backHandlerHoc";
import { TextM, TextTitle } from "../../../common/UI_Component/CommonText/index"
import Storage from  "../../../constants/storage"
import connect from "../../../common/utils/myReduxConnect";
import {config} from "../../../common/utils/config";
import {format} from "../../../common/utils/address";
import {sleep, isNumber } from "../../../common/utils/utils";
import styles from './style';
import DevInformation from './develop';
import pTd from "../../../common/utils/unit";
const { splashScreenShowTime, tokenSymbol, tokenDecimal, tokenDecimalFormat } = config;

const {appInit, aelfInstance} = require('../../../common/utils/aelfProvider');
const waitTime = 10000    //Draw frequency
const waitDrawLimit = 30  //To be drawn limit
const defautState = JSON.stringify({
    address: 0,
    balance: 0,
    jackpot: '-',
    symbol: '-',
    bingoGameAllowance: '-',
    pullRefreshing: false,
    betCount: '',
    lastBetCount: null,
    lastBetType: null,
    transactionId: null,
    bingoTxId: '',
    showBingo: false,
    bingoResult: null,
    checkPlayBingoStatusTimes: 0,
    debug: false,
    devInfoVisible: false,
    betType: 0,
    bingoOutputUnpacked: {
        random: '',
        isWin: true,
        boutType: '',
        award: '',
    },
    privateKey:null
});
/*
 * 主页
 **/
class MyHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(defautState);
        // trick: fix bug. Will refator soon.
        this.lastAddress = null;
        this.interval = null;
        this.drawInterval = null;
        this.txResultTime = {};
    }
    checkPrivateKey = async () => {
        const privateKey = await AsyncStorage.getItem(Storage.userPrivateKey)
        this.setState({ privateKey })
    }
    componentWillUnmount() {
        for (let key in this.txResultTime) {
            const { timer } = this.txResultTime[key]
            timer && clearTimeout(timer)
        }
        this.txResultTime = {}
        this.drawInterval && clearInterval(this.drawInterval)
        clearInterval(this.interval);
        DeviceEventEmitter.removeAllListeners('checkPrivateKey')
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const reduxStoreData = this.props.ReduxStore;
        const { address } = reduxStoreData;
        if (this.lastAddress !== address) {
            this.lastAddress = address;
            if (address) {
                this.getUserBalance();
                this.getBingoGameContractBalane();
                this.getApprovedNumber();
            } else {
                this.setState(JSON.parse(defautState));
            }
        }
    }

    async componentDidMount() {
        setTimeout(()=>{
            SplashScreen.hide()
        }, splashScreenShowTime);
        this.initProvider();
        this.onRefresh();
        this.drawInterval = setInterval(()=>{
            this.Draw();
        }, waitTime);
        this.interval = setInterval((
        ) => {
            this.checkLoginInfo();
            this.getUserBalance();
        }, 10000);
        DeviceEventEmitter.addListener('checkPrivateKey',this.checkPrivateKey);
        this.checkPrivateKey();
    }
    checkLoginInfo = async () => {
        try {
            const { address } = this.props.ReduxStore || {}
            if (!address) {
                const privateKey = await AsyncStorage.getItem(Storage.userPrivateKey);
                if(privateKey){                    
                    const contracts = await appInit(privateKey);
                    const keystore = JSON.parse(await AsyncStorage.getItem(Storage.userKeyStore) || '{}');
                    const address = keystore.address;
                    this.props.onLoginSuccess({
                        contracts,
                        address,
                        keystore
                    });
                    this.setState({ privateKey })
                }
            }
        } catch (error) {
            console.log('checkLoginInfo',error);
            
        }
    }

    async initProvider(){

        const privateKey =  await AsyncStorage.getItem(Storage.userPrivateKey);
        let loggedIn = privateKey  != null;

        // TODO: rewrite contract init logic
        const contracts = await appInit(privateKey);
        // const { bingoGameContract } = contracts;
        // console.log('122222', await bingoGameContract.Initial());
        const keystore =  await AsyncStorage.getItem(Storage.userKeyStore) || '{}';
        const address = JSON.parse(keystore).address;
        console.log('address', address);
        this.props.onSetTempContracts({contracts: contracts});
        loggedIn && this.props.onLoginSuccess({
            contracts: contracts,
            address,
            keystore: JSON.parse(keystore)
        });

        this.setState({
            contracts,
        });
        await this.getUserBalance(contracts, address);
        await this.getApprovedNumber();
        this.getBingoGameContractBalane();
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
                symbol: tokenSymbol,
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
        let confirmBlance = balance.balance / tokenDecimalFormat
        this.setState({
            balance: isNumber(confirmBlance) ? confirmBlance : 0,
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
                symbol: tokenSymbol,
                spender: bingoGameContract.address,
                owner: address
            });

            this.setState({
                bingoGameAllowance: allowance.allowance / tokenDecimalFormat
            });
        }
    }

    async getBingoGameContractBalane() {
        const reduxStoreData = this.props.ReduxStore;
        const { tempContracts } = reduxStoreData;

        const { tokenContract, appContract } = tempContracts || {};
        if (!appContract || !appContract.address || !tokenContract || !tokenContract.GetBalance) {
            return
        }

        const balance = await tokenContract.GetBalance.call({
            symbol: tokenSymbol,
            owner: appContract.address
        });
        if (!balance) {
            return;
        }
        this.setState({
            jackpot: (balance.balance / tokenDecimalFormat).toFixed(2),
        });
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

    resetState() {
        this.setState(JSON.parse(defautState));
        this.onRefresh();
    }

    async onRefresh() {
        this.setState({
            pullRefreshing: true
        });
        Promise.all([
            this.getLastBuyInfo(),
            this.getUserBalance(),
            this.getBingoGameContractBalane(),
            this.getApprovedNumber(),
            this.getBetList(),
            this.getLotteryList(),
        ]).then(result => {
            console.log('Promise.all: ', result);
        }).catch(error => {
            this.tipMsg('Refresh error');
            console.log('onRefresh: ', error);
        }).then(() => {
            this.setState({
                pullRefreshing: false
            });
        });
    }

    onBetChange(betCount) {
        const floatPart = betCount.split('.')[1];
        if (betCount && floatPart && floatPart.length > 3) {
            betCount = parseFloat(betCount).toFixed(tokenDecimal)
        }
        this.setState({
            betCount
        });
    }

    onBetButtonClick(value) {
        this.setState({
            betCount: value
        });
    }

    onBetTypeButtonClick(betType) {
        this.setState({
            betType
        });
    }

    getBingoContract() {
        const reduxStoreData = this.props.ReduxStore;
        const { contracts } = reduxStoreData;
        const { bingoGameContract } = contracts;
        return bingoGameContract;
    }

    async getLastBuyInfo() {
        const lastBuyInfo = JSON.parse(await AsyncStorage.getItem('lastBuy'));
        if (lastBuyInfo && !lastBuyInfo.hadDrawed) {
            this.setState({
                transactionId: lastBuyInfo.buyTxId,
                showBingo: true,
                lastBetCount: lastBuyInfo.lastBetCount,
                lastBetType: lastBuyInfo.lastBetType
            });
        }
        return lastBuyInfo;
    }

    async setLastBuyInStorage(txId, hadDrawed = false) {
        let lastBuyId;
        if (!txId) {
            lastBuyId = (await this.getLastBuyInfo()).transactionId;
        }
        const { betCount, betType } = this.state;
        await AsyncStorage.setItem('lastBuy', JSON.stringify({
            buyTxId: txId || lastBuyId,
            hadDrawed: hadDrawed,
            lastBetCount: betCount,
            lastBetType: betType
        }));
    }

    playBingo = async () => {
        if (this.playLock) {
            return;
        }
        const reduxStoreData = this.props.ReduxStore;
        const { contracts, address, betList } = reduxStoreData;
        const { privateKey } = this.state
        
        if (Array.isArray(betList) && betList.length >= waitDrawLimit) {
            this.tipMsg('You bet too fast, bet later');
            return;
        }

        if (!address) {
            if(privateKey == null){
                this.tipMsg('Please login');
            }else{
                this.tipMsg('Wait game initialize');
            }
            return;
        }

        const { balance, betCount, bingoGameAllowance, betType, jackpot } = this.state;

        if (Number(betCount) > Number(jackpot)) {
            this.tipMsg('The bet amount cannot be greater than the prize pool amount');
            return;
        }
        if (betType === 0) {
            this.tipMsg('Please select bet type');
            return;
        }
        if (betCount <= 0 || betCount != +betCount) {
            this.tipMsg('Please input bet amount');
            return;
        }
        if (betCount > balance) {
            this.tipMsg('Insufficient balance');
            return;
        }
        if (betCount > bingoGameAllowance) {
            this.tipMsg('Insufficient allowance, please turn to homepage and pull refresh the page.');
            return;
        }
        this.playLock = true;
        const { bingoGameContract } = contracts;

        const transactionId = await bingoGameContract.Play({
            buyAmount: betCount * tokenDecimalFormat,
            buyType: betType,
            tokenSymbol: tokenSymbol
        });
        await this.setLastBuyInStorage(transactionId.TransactionId);

        this.setState({
            transactionId: transactionId.TransactionId,
            showBingo: true,
            bingoResult: null,
            bingoOutputUnpacked: JSON.parse(defautState).bingoOutputUnpacked,
            lastBetCount: betCount,
            lastBetType: betType,
            balance: balance - betCount,
            betCount: '',
            betType: 0,
        }, () => {
            this.tipMsg('Bet Success');
        });
        await sleep(2000);
        await this.checkPlayBingoStatus(transactionId.TransactionId);
        this.getBetList();
        this.playLock = false;
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
            return;
        }

        this.checkPlayBingoStatusTimes = 0;

        if (playTxResult.Status === 'PENDING') {
            setTimeout(() => {
                this.checkPlayBingoStatus(transactionId);
            }, 1000);
            return;
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

    async bingoBingo() {
        if (this.bingoBingoLock) {
            return;
        }
        this.tipMsg('Loading...', 4000);
        this.bingoBingoLock = true;
        const { transactionId } = this.state;

        const bingoGameContract = this.getBingoContract();
        const bingoTxId = await bingoGameContract.Bingo(transactionId);
        // before preview3, tx will be NotExisted before pending
        await sleep(4000);

        const txResult = await aelfInstance.chain.getTxResult(bingoTxId.TransactionId);
        if (txResult.Status === 'NotExisted') {
            setTimeout(() => {
                this.tipMsg('Not ready to award, please wait a second.');
            }, 2000);

            this.bingoBingoLock = false;
            return;
        }
        await this.getBingoResult(bingoTxId.TransactionId);
        this.bingoBingoLock = false;
    }

    async getBingoResult(transactionId) {
        let txResult;
        try {
            txResult = await aelfInstance.chain.getTxResult(transactionId);
            console.log('txResult txResult: ', txResult);
        } catch(e) {
            console.log('txResult txResult txResult: ', e);
            if (e && e.Status === 'FAILED') {
                this.tipMsg('Not ready yet, please wait a second.');
                return;
            }
        }
        if (txResult.Status === 'PENDING') {
            this.tipMsg('Loading...');
            setTimeout(async () => {
                await this.getBingoResult(transactionId);
            }, 2000);
            return;
        }
        if (txResult.Status === 'FAILED') {
            this.tipMsg('Bingo Transaction failed.');
            return;
        }
        if (txResult.Status === 'MINED') {
            const { transactionId: transactionIdPlay  } = this.state;
            const bingoGameContract = this.getBingoContract();
            const bingoOutputUnpacked = bingoGameContract.Bingo.unpackOutput(txResult.ReturnValue);
            const awardResult = await bingoGameContract.GetAward.call(transactionIdPlay);
            console.log('awardResult: ', awardResult);
            const bingoResult = awardResult.value / tokenDecimalFormat;

            const tipMsg = (bingoResult > 0 ? 'You win ' : 'You lose ') + Math.abs(bingoResult) + ' ' + tokenSymbol;
            this.tipMsg(tipMsg, 3000);

            await this.getUserBalance();
            await this.getBingoGameContractBalane();
            await this.getApprovedNumber();
            await this.setLastBuyInStorage(null, true);

            this.setState({
                showBingo: false,
                bingoResult,
                bingoTxId: transactionId,
                bingoOutputUnpacked
            });
        }
    }
    getBetList = async () => {
        const { address, contracts } = this.props.ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformation) {
            const playerInformation = await bingoGameContract.GetPlayerInformation.call(address);
            let { bouts } = playerInformation || {}
            Array.isArray(bouts) && this.props.onSetBetList({ betList: bouts.reverse() })
        }
    }
    getLotteryList = async () => {
        const { address, contracts } = this.props.ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformationCompleted) {
            const playerInformation = await bingoGameContract.GetPlayerInformationCompleted.call(address);
            let { bouts } = playerInformation || {}
            Array.isArray(bouts) && this.props.onSetLotteryList({ lotteryList: bouts.reverse() });
        }
    }
    getTxResult = async (TransactionId) => {
        if (!TransactionId) return
        let number = 0
        const Transaction = this.txResultTime[`${TransactionId}`]
        if (Transaction) {
            const { count, timer } = Transaction || {}
            number = count + 1
            timer && clearTimeout(timer)
            delete (this.txResultTime[`${TransactionId}`])
        }
        if (number >= 3) return
        const txResult = await aelfInstance.chain.getTxResult(TransactionId);
        if (txResult.Status !== 'NotExisted') {
            this.props.onSetNewBet({ newBet: true })
            this.getBetList()
            this.getLotteryList()
        } else {
            this.txResultTime = {
                ...this.txResultTime,
                [TransactionId]: {
                    timer:
                        setTimeout(async () => {
                            this.getTxResult(TransactionId)
                        }, 1000), count: number || 1
                }
            }
        }
    }
    Draw = async () => {
        const { address, contracts } = this.props.ReduxStore || {};
        const { bingoGameContract } = contracts || {};
        if (bingoGameContract && bingoGameContract.GetPlayerInformation) {
            const playerInformation = await bingoGameContract.GetPlayerInformation.call(address);
            let oldBouts = playerInformation || {}.bouts
            Array.isArray(oldBouts) && this.props.onSetBetList({ betList: oldBouts.reverse() })
            const { bouts } = playerInformation || {}
            if (!bouts || !bouts.length || !bingoGameContract || !bingoGameContract.Bingo) return
            const bingo = (value) => {
                const { isComplete, playId, betTime } = value
                const { seconds } = betTime || {}
                if ((new Date().getTime() / 1000) < (Number(seconds) + waitTime / 1000)) return
                if (isComplete) return
                return new Promise((resolve, reject) => {
                    bingoGameContract.Bingo(playId).then(bingoTxId => {
                        resolve(bingoTxId)
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
            let promises = bouts.map((message) => bingo(message))
            Promise.all(promises).then(async (v) => {
                if (Array.isArray(v)) {
                    const result = v.filter(item => item && item.TransactionId)
                    if (result && result.length) {
                        await sleep(4000);
                        this.getTxResult(result[0].TransactionId)
                    }
                }
            }).catch(e => {
                console.log(e, '=====e');
            })
        }
    }
    renderBingoResult() {
        const {bingoResult, bingoTxId, bingoOutputUnpacked} = this.state;
        if (!bingoResult) {
            return;
        }
        const result = (bingoResult > 0 ? 'You win ' : 'You lose ') + Math.abs(bingoResult) + ' ' + tokenSymbol;

        return (
          <View style={{
              marginTop: 3
          }}>
              <TextTitle>Draw result</TextTitle>
              <Text>Bingo Result:{result}</Text>
              <Text>Lottery Code: {bingoOutputUnpacked.random}</Text>
              <TouchableOpacity>
                  <Text style={{ color: Colors.fontColor }} onPress={() =>
                    Linking.openURL(config.explorerURL + '/tx/' +  bingoTxId)
                  }>Tx ID (Click to turn to aelf explorer): {bingoTxId}</Text>
              </TouchableOpacity>
              {/*<Text>{bingoOutputUnpacked.isWin ? 'You win' : 'You lose'}</Text>*/}
              {/*<Text>Your bout type: {bingoOutputUnpacked.boutType === '1' ? 'Small' : 'Big'}</Text>*/}
              {/*<Text>Award: {bingoOutputUnpacked.award}</Text>*/}
          </View>
        );
    }

    renderBuyTx() {
        const { transactionId, lastBetCount, lastBetType } = this.state;
        if (!transactionId) {
            return;
        }
        return (
            <View>
                <TextTitle>Lastest bet transaction</TextTitle>
                <Text>
                    Bet Type: {lastBetType === 1 ? 'Small' : 'Big'}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    Bet Amount: {lastBetCount} {tokenSymbol}</Text>
                <Text>Waiting about 60s, then you can draw the prize.</Text>
                <TouchableOpacity>
                    <Text style={{ color: Colors.fontColor }} onPress={() =>
                      Linking.openURL(config.explorerURL + '/tx/' +  transactionId)
                    }>Tx ID (Click to turn to aelf blockchain explorer): {transactionId}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderLotteryCode = (optionsInput) => {
        const { privateKey } = this.state

        const {
            address, jackpot, tokenSymbol, bingoOutputUnpacked, bingoResult, showBingo, lastBetType,lastBetCount
        } = optionsInput;
        const jackpotButtonText = (() => {
            if (!address) {
                if (privateKey != null) {
                    return 'Wait game initialize';
                } else {
                    return 'Please Login';
                }
            }
            if(lastBetCount){
                return `My Last bet: ${lastBetCount} ${tokenSymbol} ${lastBetType === 1 ? 'Small' : 'Big'}`;
            }else{
                return 'Please bet'
            }
        })();

        const boughtInfo = `You bet ${lastBetType === 1 ? 'Small' : 'Big'} `;
        let lotteryInfo = showBingo ? boughtInfo : 'Please bet.'

        if (bingoResult) {
            lotteryInfo = boughtInfo + (bingoResult > 0 ? 'You win ' : 'You lose ') + Math.abs(bingoResult) + ' ' + tokenSymbol;
        }

        return  <PricingCard
          color="#817AFD"
          title="Prize Pool"
          pricingStyle = {{ fontSize:pTd(60) }}
          price={`${jackpot} ${tokenSymbol}`}
          button={{title: jackpotButtonText}}
        //   info={[lotteryInfo]}
          onButtonPress={() => {
              if (!address && privateKey == null) {
                  this.goRouter("LoginPage")
              }
          }}
        />;
    }
    onWord = _ => {
        this.goRouter("Lottery")
        this.props.onSetNewBet({ newBet: false })
    }
    render() {
        const {
            balance, bingoGameAllowance,
            symbol, pullRefreshing, jackpot, betCount, transactionId,
            showBingo, bingoResult, devInfoVisible,
            bingoOutputUnpacked,
            betType, lastBetType,lastBetCount
        } = this.state;
        const reduxStoreData = this.props.ReduxStore;
        const { address, keystore, contracts, newBet } = reduxStoreData;
        const { nickName } = keystore || {};

        const {bingoGameContract} = contracts || {};
        const buyTxHTML = this.renderBuyTx();
        const bingoResultHTML = this.renderBingoResult();
        const lotteryCodeHTML = this.renderLotteryCode({
            address, jackpot, tokenSymbol, bingoOutputUnpacked, bingoResult, showBingo, lastBetType,lastBetCount
        });

        return (
            <View style={Gstyle.container}>
                <CommonHeader
                    leftElement={this.leftElement()}
                    title="Bingo Game Dev Demo"
                    rightElement={this.rightElement()}
                />
                {
                    newBet &&
                    <TouchableOpacity onPress={this.onWord}>
                        <WordRotation
                            bgViewStyle={{ backgroundColor: Colors.primaryColor }}
                            textStyle={{ color: 'white' }}>
                            You have a new bet result
                        </WordRotation>
                    </TouchableOpacity>
                }
                <KeyboardAwareScrollView
                    keyboardOpeningTime={0}
                    extraHeight={150}
                    refreshControl={
                        <RefreshControl refreshing={pullRefreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View style = {{flex:1}}>
                        <View>
                            {lotteryCodeHTML}
                        </View>

                        <Card title='Bet Type (Click to select)' titleStyle={{textAlign: 'left'}}>
                            <View style={styles.buttonContainer}>
                                <Button
                                buttonStyle={betType === 1 ? styles.lotteryBuyTypeButton : styles.lotteryBuyTypeButtonHide}
                                title={'Small'} onPress={() => this.onBetTypeButtonClick(1)}/>
                                <Button
                                buttonStyle={betType === 2 ? styles.lotteryBuyTypeButton : styles.lotteryBuyTypeButtonHide}
                                title={'Big'} onPress={() => this.onBetTypeButtonClick(2)}/>
                            </View>
                        </Card>

                        <Card
                        title={`Bet Amount` }
                        titleStyle={{textAlign: 'left'}}
                        >
                            <View style={styles.balanceContainer}>
                                <Text>My balance: {(balance).toFixed(2)} {tokenSymbol}</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TextInput
                                style={styles.inputStyle}
                                placeholder="Please input bet amount"
                                placeholderTextColor="#999"
                                onChangeText={betCount => this.onBetChange(betCount)}
                                value={betCount + ''}
                                />
                                <Button buttonStyle={styles.bingoButton} title={'half'} onPress={() => this.onBetButtonClick(Math.floor(balance) / 2)}/>
                                <Button buttonStyle={styles.bingoButton} title={'all in'} onPress={() => this.onBetButtonClick(Math.floor(balance))}/>
                            </View>
                        </Card>

                        <View style={styles.buttonContainer}>
                            {<Button buttonStyle={styles.bingoButtonSubmit} title={'Bet'} onPress={() => this.playBingo()}/>}
                            {/* {showBingo && <Button buttonStyle={styles.drawButton} title={'Click to draw'} onPress={async () => this.bingoBingo()}/>} */}
                        </View>

                        <Divider style={styles.divider} />
                        <View style={styles.rules}>
                            <TextM>Game Rules</TextM>
                            <Text>
                                The Bingogame uses blockchain smart contracts to take data fragments as a seed number, calculated together with the blockheight  - it then generates a random number between 0 and 255.And we will get small (0-126), medium (127, 128), big (129-255).
                            </Text>
                            <TextM>Rules:</TextM>
                            <Text>
                                1. Players can select the big or small group.
                            </Text>
                            <Text>
                                2. If the drawn number falls within your selected group, you can will double your bet. If the drawn number falls outside of your selected group, you will lose your bet. When the drawn number falls within the 'medium' group, the contract wins and all users lose their bet.
                            </Text>
                            <Text>
                                3. No more than 30 bets may be placed at one time.
                            </Text>
                            <TextM>Steps:</TextM>
                            <Text>
                                1. Player chooses select the big or small group, and places their bet amount AEUSD (bet amount minimum value is 0.001).
                            </Text>
                            <Text>
                                2. After around 1 minute and the winning number will be drawn automatically
                            </Text>
                            <Text>
                                3. Players can view the most recent 50 bets from the "My BET" section.
                            </Text>
                            {/* <Divider style={styles.divider} />
                            <Text>Game Operations</Text>
                            <Text>
                                1. Select a bet type and bet your AEUSD.
                            </Text>
                            <Text>
                                2. Waiting a minute, then draw the prize aotumaticly.
                            </Text>
                            <Text>
                                3. You can get the last 50 history from My Bet in the MY BET.
                            </Text> */}

                            <Divider style={styles.divider} />

                            {/*{buyTxHTML}*/}
                            {/*{bingoResultHTML}*/}
                        </View>

                        <Divider style={styles.divider} />

                        <Button
                            buttonStyle={styles.devButton}
                            title={(devInfoVisible ? 'Hide' :'Show') + ' Developer Information'}
                            onPress={() => {
                                this.setState({
                                    devInfoVisible: !devInfoVisible
                                });
                            }}
                        />
                        <DevInformation
                            devInfoVisible={devInfoVisible}
                            nickName={nickName}
                            address={address}
                            symbol={symbol}
                            balance={balance}
                            bingoGameAllowance={bingoGameAllowance}
                            bingoGameContract={bingoGameContract}
                            jackpot={jackpot}
                            clear={() => this.resetState()}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

//连接redux
const HomePage = connect(BackHandlerHoc(MyHomePage));
export default HomePage;
