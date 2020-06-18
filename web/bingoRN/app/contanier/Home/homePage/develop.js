import React from "react"
import { View, Text, TouchableOpacity, Linking } from "react-native"
import { Button, Divider } from "react-native-elements"
import AsyncStorage from "@react-native-community/async-storage"

import { config } from "../../../common/utils/config";
import { format } from "../../../common/utils/address";
import pTd from "../../../common/utils/unit";
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DevInformation(props) {
  const {
    devInfoVisible, nickName, address, symbol, balance,
    bingoGameAllowance, bingoGameContract, jackpot, clear
  } = props;

  return (
    <View style={{
      display: devInfoVisible ? 'flex' : 'none'
    }}>
      <Text style={styles.title}>1.Bingo Game Dev Demo</Text>
      <Text>In this demo, you can learn</Text>
      <Text>1.How to use random numbers in aelf.</Text>
      <Text>2.How to register account in an aelf contract.</Text>
      <Text>3.How to call inline contract.</Text>

      <Divider style={styles.divider} />

      <Text style={styles.title}>2.About your account.「Pull down to refresh」</Text>
      <Text style={styles.basicText}>UserName: {nickName || 'Please login'}</Text>
      <Text style={styles.basicText}>Address: {address && format(address) || 'Please login'}</Text>
      <Text style={styles.basicText}>Symbol: {symbol}</Text>
      <Text style={styles.basicText}>{symbol} Balance: {balance}</Text>
      <Text style={styles.basicText}>Allowance for the app: {bingoGameAllowance}</Text>
      <Divider style={styles.divider} />

      <Text style={styles.title}>3.About the Game</Text>
      <Text>Contract Address:{'\n'}
        {
          bingoGameContract && bingoGameContract.address ?
            <Text
              onPress={() => Linking.openURL(config.contractExplorerURL + '' + bingoGameContract.address)}
              style={styles.linkDetails}>{format(bingoGameContract.address)}
              <Icon name='share-square-o' />
            </Text>
            : ''
        }
      </Text>
      <Text>Prize pool: {jackpot}</Text>
      <Button
        buttonStyle={styles.devButton}
        title={'Clear'}
        onPress={async () => {
          alert('clear');
          await AsyncStorage.removeItem('lastBuy');
          props.clear();

        }}
      />
    </View>
  );
}
