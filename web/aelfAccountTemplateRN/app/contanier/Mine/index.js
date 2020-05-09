import React from "react";
import { createStackNavigator } from "react-navigation";

import MinePage from "./MinePage/index";
import FundingDetail from "./fundingDetail/index";
import Recharge from "./recharge/index";
import RechargeDetail from "./rechargeDetail/index";
import Withdraw from "./withdraw/index";
import WithdrawDetail from "./withdrawDetail/index";
import TransactionDetail from "./transactionDetail/index";
import ChangeTransactionPsw from "./changeTransactionPsw/index";
import SetTransactionPsw from "./setTransactionPsw/index";
import BackupQRcode from "./backupQRcode/index";
import ChangeLoginPsw from "./changeLoginPsw/index";
import SecurityCenter from "./securityCenter/index";
import AboutUs from "./aboutUs/index";

import HowToPlay from "../Home/howToPlay/index"

const MineStack = createStackNavigator({
    MinePage: {
        screen: MinePage,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    FundingDetail: {
        screen: FundingDetail,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    TransactionDetail: {
        screen: TransactionDetail,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Recharge: {
        screen: Recharge,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    RechargeDetail: {
        screen: RechargeDetail,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    Withdraw: {
        screen: Withdraw,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    WithdrawDetail: {
        screen: WithdrawDetail,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },

    ChangeTransactionPsw: {
        screen: ChangeTransactionPsw,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    SetTransactionPsw: {
        screen: SetTransactionPsw,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    BackupQRcode: {
        screen: BackupQRcode,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    ChangeLoginPsw: {
        screen: ChangeLoginPsw,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    SecurityCenter: {
        screen: SecurityCenter,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    },

    HowToPlay: {
        screen: HowToPlay,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
},{
    initialRouteName: "MinePage",
});

MineStack.navigationOptions = ({ navigation }) => {
    return {
        tabBarVisible: navigation.state.index == 0
    };
};

export default MineStack;
