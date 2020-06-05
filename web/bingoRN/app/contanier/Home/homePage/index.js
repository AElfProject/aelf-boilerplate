import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Linking, TextInput } from "react-native"
import { Button, Divider, Input, PricingCard, Card } from "react-native-elements"
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-community/async-storage"
import SplashScreen from "react-native-splash-screen"

import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import BackHandlerHoc from "../../../common/Hoc/BackHandlerHoc/backHandlerHoc";
import { TextM, TextTitle } from "../../../common/UI_Component/CommonText/index"
import Storage from  "../../../constants/storage"
import connect from "../../../common/utils/myReduxConnect";
import {config} from "../../../common/utils/config";
import {format} from "../../../common/utils/address";

import styles from './style';
import DevInformation from './develop';
const { splashScreenShowTime, tokenSymbol, feeTokenSymbol, feeTokenDecimalFormat, tokenDecimalFormat } = config;

const {appInit, aelfInstance} = require('../../../common/utils/aelfProvider');

const defautState = JSON.stringify({
    address: 0,
    balance: '-',
    feeBalance: '-',
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
    }
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
    }
    componentWillMount(){
        setTimeout(()=>{
            SplashScreen.hide()
        }, splashScreenShowTime);
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        const reduxStoreData = this.props.ReduxStore;
        const { address } = reduxStoreData;
        if (this.lastAddress !== address) {
            this.lastAddress = address;
            if (address) {
                await this.getUserBalance();
                await this.getBingoGameContractBalane();
                await this.getApprovedNumber();
            } else {
                this.setState(JSON.parse(defautState));
            }
        }
    }

    async componentDidMount() {
        this.initProvider();
        this.onRefresh();
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
            // Check fee balance, todo: refator
            if (contractsInput) {
                const feeBalance = await tokenContract.GetBalance.call({
                    symbol: feeTokenSymbol,
                    owner: address
                });
                this.setState({
                    feeBalance: feeBalance.balance / feeTokenDecimalFormat,
                });
            }
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
        this.setState({
            balance: balance.balance / tokenDecimalFormat,
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
            jackpot: balance.balance / tokenDecimalFormat,
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
    }

    async onRefresh() {
        this.setState({
            pullRefreshing: true
        });
        try {
            await this.getLastBuyInfo();
            await this.getUserBalance();
            await this.getBingoGameContractBalane();
            await this.getApprovedNumber();
        } catch(e) {
            this.tipMsg('Refresh error');
            console.log('onRefresh: ', e);
        }
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
        const { betCount, lastBetType } = this.state;
        await AsyncStorage.setItem('lastBuy', JSON.stringify({
            buyTxId: txId || lastBuyId,
            hadDrawed: hadDrawed,
            lastBetCount: betCount,
            lastBetType
        }));
    }

    async playBingo() {
        if (this.playLock) {
            return;
        }
        const reduxStoreData = this.props.ReduxStore;
        const { contracts, address } = reduxStoreData;
        if (!address) {
            this.tipMsg('Please login');
            return;
        }

        const { balance, betCount, bingoGameAllowance, betType, feeBalance } = this.state;
        if (betType === 0) {
            this.tipMsg('Please select bet type');
            return;
        }
        if (betCount <= 0 || betCount != +betCount) {
            this.tipMsg('Please input bet amount');
            return;
        }
        if (betCount >= balance) {
            this.tipMsg('Insufficient balance');
            return;
        }
        if (feeBalance < 0.5) {
            this.tipMsg('Insufficient fee balance');
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
        this.setState({
            transactionId: transactionId.TransactionId,
            showBingo: true,
            bingoResult: null,
            bingoOutputUnpacked: JSON.parse(defautState).bingoOutputUnpacked,
            lastBetCount: betCount,
            lastBetType: betType
        });

        await this.setLastBuyInStorage(transactionId.TransactionId);

        setTimeout(async () => {
            await this.checkPlayBingoStatus(transactionId.TransactionId);
            this.playLock = false;
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

    async bingoBingo() {
        if (this.bingoBingoLock) {
            return;
        }
        this.tipMsg('Loading...');
        this.bingoBingoLock = true;
        const { transactionId } = this.state;

        const bingoGameContract = this.getBingoContract();
        const bingoTxId = await bingoGameContract.Bingo(transactionId);
        const txResult = await aelfInstance.chain.getTxResult(bingoTxId.TransactionId);
        console.log('bingoTxId', bingoTxId, txResult);
        if (txResult.Status === 'NotExisted') {
            setTimeout(() => {
                this.tipMsg('Not ready to award, please wait a second.');
            }, 2000);

            this.bingoBingoLock = false;
            return;
        }
        await this.getBingoResult(bingoTxId.TransactionId);
        await this.setLastBuyInStorage(null, true);
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
            const bingoResult = awardResult.value / tokenDecimalFormat;
            this.setState({
                showBingo: false,
                bingoResult,
                bingoTxId: transactionId,
                bingoOutputUnpacked
            });

            const tipMsg = (bingoResult > 0 ? 'You win ' : 'You lose ') + Math.abs(bingoResult) + ' ' + tokenSymbol;
            this.tipMsg(tipMsg, 3000);

            await this.getUserBalance();
            await this.getBingoGameContractBalane();
            await this.getApprovedNumber();
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
              <TextTitle>Latest draw transaction</TextTitle>
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

    renderLotteryCode(optionsInput) {
        const {
            address, jackpot, tokenSymbol, bingoOutputUnpacked, bingoResult, showBingo, lastBetType
        } = optionsInput;

        const jackpotButtonText = (() => {
            if (!address) {
                return 'Please Login';
            }
            return `Prize Pool: ${jackpot} ${tokenSymbol}`;
        })();

        const boughtInfo = `You bought ${lastBetType === 1 ? 'Small' : 'Big'} `;
        let lotteryInfo = showBingo ? boughtInfo : 'Please bet.'

        if (bingoResult) {
            lotteryInfo = boughtInfo + (bingoResult > 0 ? 'You win ' : 'You lose ') + Math.abs(bingoResult) + ' ' + tokenSymbol;
        }

        return  <PricingCard
          color="#817AFD"
          title="Lottery code"
          price={bingoOutputUnpacked.random}
          button={{title: jackpotButtonText}}
          info={[lotteryInfo]}
          onButtonPress={() => {
              if (!address) {
                  this.goRouter("MinePage")
              }
          }}
        />;
    }

    render() {
        const {
            balance, feeBalance, bingoGameAllowance,
            symbol, pullRefreshing, jackpot, betCount, transactionId,
            showBingo, bingoResult, devInfoVisible,
            bingoOutputUnpacked,
            betType, lastBetType
        } = this.state;
        const reduxStoreData = this.props.ReduxStore;
        const { address, keystore, contracts } = reduxStoreData;
        const { nickName } = keystore || {};

        const {bingoGameContract} = contracts || {};
        const buyTxHTML = this.renderBuyTx();
        const bingoResultHTML = this.renderBingoResult();
        const lotteryCodeHTML = this.renderLotteryCode({
            address, jackpot, tokenSymbol, bingoOutputUnpacked, bingoResult, showBingo, lastBetType
        });

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
                            <Text>My balance: {Math.floor(balance)} {tokenSymbol}</Text>
                            <Text>My fee balance : {feeBalance} {feeTokenSymbol} {feeBalance < 1 ? '(Insufficient)' : ''}</Text>
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
                        {!showBingo && <Button buttonStyle={styles.bingoButtonSubmit} title={'Bet'} onPress={() => this.playBingo()}/>}
                        {showBingo && <Button buttonStyle={styles.drawButton} title={'Click to draw'} onPress={async () => this.bingoBingo()}/>}
                    </View>

                    <Divider style={styles.divider} />
                    <View style={styles.rules}>
                        <Text>Game Rules</Text>
                        <Text>
                            Use the current height and the user's seed to calculate a random number in the range of [0, 255]
                        </Text>
                        <Text>
                            1.Small bet [0,126], Big bet [129,255].
                        </Text>
                        <Text>
                            2.When get 127 or 128, the contract wins the token.
                        </Text>

                        <Divider style={styles.divider} />
                        {buyTxHTML}
                        {bingoResultHTML}
                    </View>

                    <Divider style={styles.divider} />

                    <Button
                        buttonStyle={styles.devButton}
                        title={(devInfoVisible ? 'Hide' :'Show') + ' Develop Information'}
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
                      feeTokenSymbol={feeTokenSymbol}
                      balance={balance}
                      feeBalance={feeBalance}
                      bingoGameAllowance={bingoGameAllowance}
                      bingoGameContract={bingoGameContract}
                      jackpot={jackpot}
                      clear={() => this.resetState}
                    />
                </ScrollView>
            </View>
        )
    }
}

//连接redux
const HomePage = connect(BackHandlerHoc(MyHomePage));
export default HomePage;
