import React from "react"
import { View, Text, TouchableOpacity, Linking } from "react-native"
import { Button, Divider } from "react-native-elements"
import AsyncStorage from "@react-native-community/async-storage"

import {config} from "../../../common/utils/config";
import {format} from "../../../common/utils/address";
import pTd from "../../../common/utils/unit";
import styles from './style';

export default function DevInformation(props) {
  const {
    devInfoVisible, nickName, address, symbol, feeTokenSymbol, balance, feeBalance,
    bingoGameAllowance, bingoGameContract, jackpot
  } = props;

  return (
    <View style={{
      display: devInfoVisible ? 'flex' : 'none'
    }}>
      <Text style={styles.title}>1.Bingo Game Dev Demo</Text>
      <Text>In this demo, you can</Text>
      <Text>1.How to use random numbers in elf.</Text>
      <Text>2.How to register account in an aelf contract.</Text>
      <Text>3.How to call inline contract.</Text>

      <Divider style={styles.divider} />

      <Text style={styles.title}>2.Abount your account.「Pull down to refresh」</Text>
      <Text style={styles.basicText}>NickName: {nickName || 'Please login'}</Text>
      <Text style={styles.basicText}>Address: {address && format(address) || 'Please login'}</Text>
      <Text style={styles.basicText}>Symbol: {symbol}</Text>
      <Text style={styles.basicText}>{symbol} Balance: {balance}</Text>
      <Text style={styles.basicText}>{feeTokenSymbol} Balance: {feeBalance}</Text>
      <Text style={styles.basicText}>Allowance for the app: {bingoGameAllowance}</Text>
      <Divider style={styles.divider} />

      <Text style={styles.title}>3.About the Game</Text>
      <Text>Contract Address: </Text>
      <Text>{bingoGameContract && bingoGameContract.address && format(bingoGameContract.address)}</Text>
      <Text>Prize poll: {jackpot}</Text>
      <Text>Contract on Explorer</Text>
      <TouchableOpacity>
        <Text style={{ color: Colors.fontColor }} onPress={() =>
          Linking.openURL(config.contractExplorerURL + '' +  (bingoGameContract && bingoGameContract.address))
        }>Click and ture to aelf block chain explore to get more information of the contract.</Text>
      </TouchableOpacity>

      <Text>4.Clear</Text>
      <Button
        buttonStyle={styles.devButton}
        title={'Clear'}
        onPress={() => {
          alert('clear');
          AsyncStorage.removeItem('lastBuy');
        }}
      />
    </View>
  );
}
