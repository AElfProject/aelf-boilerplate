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
import AElf from 'aelf-sdk';
import styles from './bingo.style';

export default class Bingo extends Component {
    constructor(props) {
        super(props);
        // console.log('wallet23333:', config.gameWallet);
        // this.wallet = AElf.wallet.getWalletByPrivateKey(config.userPrivateKey);
        this.wallet = AElf.wallet.getWalletByPrivateKey(config.gameWallet.privateKey);
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
            disabled: true,
            noClick: true,
            txId: null
        };
    }

    componentDidMount() {
      const {
        sha256
      } = AElf.utils;
      aelf.chain.getChainStatus()
        // get instance by GenesisContractAddress
        .then(res => aelf.chain.contractAt(res.GenesisContractAddress, this.wallet))
        // return contract's address which you query by contract's name
        .then(zeroC => Promise.all([
          zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.Token')),
          zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract'))
        ]))
        // return contract's instance and you can call the methods on this instance
        .then(([tokenAddress, bingoAddress]) => Promise.all([
          aelf.chain.contractAt(tokenAddress, this.wallet),
          aelf.chain.contractAt(bingoAddress, this.wallet)
        ]))
        .then(([multiTokenContract, bingoGameContract]) => {
          this.setState({
            multiTokenContract,
            bingoGameContract,
            disabled: false
          });
          setTimeout(() => {
            this.getBalance();
          }, 0);
        })
        .catch(err => {
          Toast.fail('get contract failed');
          console.error(err);
        });
    }

    getBalance() {
        const {wallet, multiTokenContract} = this.state;
        const payload = {
            symbol: 'CARD',
            owner: wallet.address
        };
        multiTokenContract.GetBalance.call(payload).then(result => {
            this.setState({
                balance: result.balance
            });
        }).catch(err => {
            console.error(err);
        });
    }

    onClick() {
        const {multiTokenContract} = this.state;
        const payload = {
            to: this.state.address,
            amount: this.state.value,
            symbol: 'ELF'
        };
        multiTokenContract.Transfer(payload).then(result => {
            this.setState({
                address: null,
                value: null
            });
            setTimeout(() => {
                this.getBalance();
            }, 4000);
        }).catch(err => {
            console.error(err);
            Toast.fail('tranfer failed');
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
                            noClick: !this.state.noClick,
                            loading: false
                        });
                    }, 20000);
                }
            });
        } else {
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
                    placeholder="Enter Amount"
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
                        Play
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
