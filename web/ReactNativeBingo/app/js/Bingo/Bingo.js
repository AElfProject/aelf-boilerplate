/**
 * @file MultiTokenTransfer.js
 * @author zmh377
 * @description MultiTokenTransfer.js
*/

import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {InputItem, Button, Provider, Toast} from '@ant-design/react-native';
import config from '../../config/config';
import aelf from '../../utils/initAElf';
import styles from './bingo.style';


export default class Bingo extends Component {
    constructor(props) {
        super(props);
        this.wallet = aelf.wallet.getWalletByPrivateKey(config.userPrivateKey);
        this.state = {
            wallet: {
                address: this.wallet.address
            },
            value: null,
            address: null,
            balance: 0,
            card: 0,
            multiTokenContract: null,
            bingoGameContract: null,
            loading: false,
            disabled: false,
            noClick: true,
            txId: null
        };
    }

    componentDidMount() {
        aelf.chain.getBlockHeight((error, result) => {
            console.log(result);
        });
        aelf.chain.contractAt(config.multiTokenAddress, this.wallet, (error, result) => {
            this.setState({
                multiTokenContract: result
            });
            setTimeout(() => {
                this.getBalance();
            }, 0);
        });

        aelf.chain.contractAt(config.bingoGameAddress, this.wallet, (error, result) => {
            if (result) {
                this.setState({
                    bingoGameContract: result
                });
            }
        });
    }

    getBalance() {
        const {wallet, multiTokenContract} = this.state;
        const payload = {
            symbol: 'CARD',
            owner: wallet.address
        };
        multiTokenContract.GetBalance.call(payload, (error, result) => {
            console.log(result);
            if (result) {
                this.setState({
                    balance: result.balance
                });
            }
        });
    }

    onClick() {
        const {multiTokenContract} = this.state;
        const payload = {
            to: this.state.address,
            amount: this.state.value,
            symbol: 'ELF'
        };
        multiTokenContract.Transfer(payload, (error, result) => {
            this.setState({
                address: null,
                value: null
            });
            setTimeout(() => {
                this.getBalance();
            }, 4000);
        });
    }

    
    play() {
        const {bingoGameContract} = this.state;
        let reg = /^[1-9]\d*$/;
        if (reg.test(this.state.value)) {
            this.setState({
                disabled: true,
                loading: true
            });
            // console.log(bingoGameContract);
            // bingoGameContract.GetPlayerInformation.call('csoxW4vTJNT9gdvyWS6W7UqEdkSo9pWyJqBoGSnUHXVnj4ykJ', (error, result) => {
            //     console.log(error, result);
            // });
            bingoGameContract.Play({value: parseInt(this.state.value, 10)}, (error, result) => {
                if (result) {
                    console.log(result);
                    this.setState({
                        txId: result.TransactionId
                    });
                    Toast.info('等待20s, 当Bingo可点时，点击Bingo查看输赢。');
                    setTimeout(() => {
                        this.getBalance();
                    }, 4000);
                    setTimeout(() => {
                        this.setState({
                            noClick: !this.state.noClick
                        });
                    }, 20000);
                }
            });
        }
        else {
            Toast.fail('必须为大于0的整数，不能以0开头！');
        }
    }

    bingo() {
        const {bingoGameContract} = this.state;
        this.setState({
            noClick: true
        });
        bingoGameContract.Bingo(this.state.txId, (error, result) => {
            if (result) {
                setTimeout(() => {
                    this.setState({
                        value: null,
                        loading: false,
                        disabled: false
                    });
                    this.getBalance();
                    Toast.info('查看余额，你就知道输赢了！');
                }, 4000);
            }
        })
    }

    changeInput(value) {
        this.setState({
            value: parseInt(value, 10).toString()
        });
    }

    render() {
        const {balance} = this.state;
        return (
            <Provider>
                <Text style={styles.title}>Bingo</Text>
                <Text style={styles.balance}>Your CARD: {balance} CARD</Text>
                <View>
                <Image
                    style={{width: 170, height: 200, marginLeft: 100, marginBottom: 40}}
                    source={require('../../assets/welcome.gif')}
                />
                </View>
                <InputItem
                    clear
                    value={this.state.value}
                    disabled={this.state.disabled}
                    onChange={value => {
                        console.log(value);
                        this.setState({
                            value
                        });
                    }}
                    extra="CARD"
                    placeholder="投注数量"
                ></InputItem>
                <View style={styles.flex}>
                    <Button
                        type="primary"
                        disabled={this.state.disabled}
                        onPress={() => {
                            this.changeInput(300);
                        }}
                        style={styles.button}
                    >
                        300
                    </Button>
                    <Button
                        type="primary"
                        disabled={this.state.disabled}
                        onPress={() => {
                            this.changeInput(500);
                        }}
                        style={styles.button}
                    >
                        500
                    </Button>
                    <Button
                        type="primary"
                        disabled={this.state.disabled}
                        onPress={() => {
                            this.changeInput(this.state.balance / 2);
                        }}
                        style={styles.button}
                    >
                        Half
                    </Button>
                    <Button
                        type="warning"
                        disabled={this.state.disabled}
                        onPress={() => {
                            this.changeInput(this.state.balance);
                        }}
                        style={styles.button}
                    >
                        All-In
                    </Button>
                </View>
                <View>
                    <Button
                        type="primary"
                        style={styles.play}
                        disabled={this.state.disabled}
                        onPress={() => {
                            this.play();
                        }}
                        loading={this.state.loading}
                    >
                        Paly
                    </Button>
                    <Button
                        type="primary"
                        style={styles.bingo}
                        disabled={this.state.noClick}
                        onPress={() => {
                            this.bingo();
                        }}
                    >
                        Bingo
                    </Button>
                </View>
            </Provider>
        );
    }
}
