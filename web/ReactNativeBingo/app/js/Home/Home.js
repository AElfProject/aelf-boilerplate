/**
 * @file Home.js
 * @author zmh377
 * @description Home.js
*/

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {View, Text} from 'react-native';
import {Button, WhiteSpace, Toast, Provider} from '@ant-design/react-native';
import config from '../../config/config';
import aelf from '../../utils/initAElf';
import styles from './home.style';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.wallet = aelf.wallet.getWalletByPrivateKey(config.userPrivateKey);
        this.state = {
            bingoGameContract: null
        };
    }

    componentDidMount() {
        aelf.chain.getChainStatus()
            // get instance by GenesisContractAddress
            .then(res => aelf.chain.contractAt(res.GenesisContractAddress, this.wallet))
            // return contract's address which you query by contract's name
            .then(zeroC => zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract')))
            // return contract's instance and you can call the methods on this instance
            .then(bingoAddress => aelf.chain.contractAt(bingoAddress, this.wallet))
            .then(bingoGameContract => {
                this.setState({
                    bingoGameContract
                });
            })
            .catch(err => {
                Toast.fail('get contract failed');
                console.error(err);
            });
    }

    onClick() {
        const {bingoGameContract} = this.state;
        bingoGameContract.Register().then(() => {
            Toast.success('恭喜你注册成功，祝你游戏愉快！！！', 3, () => {
                Actions.PalyGame();
            });
        }).catch(err => {
            console.error(err);
            Toast.fail('registration failed');
        });
    }

    render() {
        return (
            <Provider>
                <View>
                    <Text style={styles.title}>Welcome to Bingo</Text>
                </View>
                <WhiteSpace />
                <Button
                    style={styles.button}
                    type='primary'
                    onPress={() => this.onClick()}
                >
                    Register
                </Button>
            </Provider>
        );
    }
}
