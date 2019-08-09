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
        aelf.chain.contractAt(config.bingoGameAddress, this.wallet, (error, result) => {
            if (result) {
                this.setState({
                    bingoGameContract: result
                });
            }
        });
    }

    onClick() {
        const {bingoGameContract} = this.state;
        bingoGameContract.Register((error, result) => {
            Toast.success('恭喜你注册成功，祝你游戏愉快！！！', 3, () => {
                Actions.PalyGame();
            });
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
