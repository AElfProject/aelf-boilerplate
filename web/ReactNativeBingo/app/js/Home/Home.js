/**
 * @file Home.js
 * @author zmh377
 * @description Home.js
*/

import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import {View, Text, StyleSheet, DeviceEventEmitter} from 'react-native';
import {Button, WhiteSpace, Toast, Provider} from '@ant-design/react-native';
import config from '../../config/config';
import aelf from '../../utils/initAElf';

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#AE00F4',
        textAlign: 'center',
        paddingTop: 200,
        paddingBottom: 200
    },
    button: {
        marginLeft: 40,
        marginRight: 40
    }
});

export default class Home extends Component {

    constructor(props) {
        super(props);
        const defaultPrivateKey = 'a59c14882c023d63e84e5faf36558fdc8dbf1063eed45ce7e507f1cd9bcde1d9';
        this.wallet = aelf.wallet.getWalletByPrivateKey(defaultPrivateKey);
        this.state = {
            bingoGameContract: null
        };
    }

    componentDidMount() {
        aelf.chain.contractAtAsync(config.bingoGameAddress, this.wallet, (error, result) => {
            if (result) {
                this.setState({
                    bingoGameContract: result
                });
            }
        });
    }

    onClick() {
        const {bingoGameContract} = this.state;
        bingoGameContract.Register({}, (error, result) => {
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
