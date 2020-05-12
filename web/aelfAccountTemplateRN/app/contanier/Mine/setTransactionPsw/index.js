import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from "react-native"
import Password from 'react-native-password-pay'
import AsyncStorage from "@react-native-community/async-storage"
import TouchID from 'react-native-touch-id';
import Storage from "../../../constants/storage"
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import { TextM } from "../../../common/UI_Component/CommonText/index"
import pTd from "../../../common/utils/unit";
import CommonModal from "../../../common/Components/CommonModal/CommonModal";
import { DividerW, DividerH } from "../../../common/UI_Component/Divider";
import ConfirmTip from "../../../common/UI_Component/Confirm";

/*
 * 设置交易密码
 **/
export default class SetTransactionPsw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tip: "Please set transaction password for payment",
            modalVisible: false,
            type: "transactionPsw",
            transactionPsw: "",
            transactionPswConfirm: "",
            modalType: "tipTouch"
        }
    }
    componentDidMount() {
        const params = this.props.navigation.getParam("params");
        this.setState({
            modalType: 'tipTransactionPsw'
        });
        // console.log('componentDidMount params, ', params);
    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* 取消 */
    leftElement() {
        return (
            <TouchableOpacity onPress={() => this.changeModalStatus()}>
                <TextM>Cancel</TextM>
            </TouchableOpacity>
        )
    }
    /* 改变modal状态 */
    changeModalStatus() {
        const { modalType } = this.state;
        if (modalType == `tipTouch`) {

            this.setState(prev => ({
                modalVisible: !prev.modalVisible
            }));
            this.goRouter("HomePage")
        } else {
            this.setState(prev => ({
                modalVisible: !prev.modalVisible
            }));
        }
    }
    /* 提示 */
    // modalContent() {
    //     return (
    //         <View>
    //             <View style={[Gstyle.marginArg(pTd(80)), Gstyle.frcc]}>
    //                 <TextM>Give up modifying the transaction password</TextM>
    //             </View>
    //             <DividerW />
    //             <View style={{ flexDirection: "row", }}>
    //                 <TouchableOpacity style={styles.btnStyle} onPress={() => this.changeModalStatus()}>
    //                     <TextM >No</TextM>
    //                 </TouchableOpacity>
    //
    //                 <DividerH />
    //                 <TouchableOpacity style={styles.btnStyle} onPress={() => navigationService.goBack()}>
    //                     <TextM style={styles.btnStyle}>Yes</TextM>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    // }
    openTouch() {

        this.touchAuth(async () => {
            await AsyncStorage.setItem(Storage.openTouch,"true")
            this.goRouter("HomePage")
        })
    }
    modalContent() {
        const { modalType } = this.state;
        switch (modalType) {
            case "tipTouch":
                return (
                    <ConfirmTip
                        rightText="No"
                        tipMsg="Enable biometric payment？"
                        rightFunc={() => this.changeModalStatus()}
                        leftText={"Yes"}
                        leftFunc={() => { this.openTouch() }}
                    />
                );
            case "tipTransactionPsw":
                return (
                    <View>
                        <View style={[Gstyle.marginArg(pTd(80)), Gstyle.frcc]}>
                            <TextM>Give up modifying the transaction password</TextM>
                        </View>
                        <DividerW />
                        <View style={{ flexDirection: "row", }}>
                            <TouchableOpacity style={styles.btnStyle} onPress={() => this.changeModalStatus()}>
                                <TextM >No</TextM>
                            </TouchableOpacity>

                            <DividerH />
                            <TouchableOpacity style={styles.btnStyle} onPress={() => navigationService.goBack()}>
                                <TextM style={styles.btnStyle}>Yes</TextM>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
        }

    }
    /*  */
    onChangeText(type, text) {
        this.setState({
            [type]: text
        }, async () => {
            switch (type) {
                case "transactionPsw":
                    if (this.state.transactionPsw.length == 6) {
                        this.setState({
                            type: "transactionPswConfirm",
                            tip:"Please fill in again to confirm"
                        })
                    }
                    break;
                case "transactionPswConfirm":
                    if ((this.state.transactionPswConfirm.length == 6) && (this.state.transactionPswConfirm == this.state.transactionPsw)) {
                        await AsyncStorage.setItem(Storage.transactionPsw, this.state.transactionPsw)
                        .then(()=>{
                            this.tipMsg("Success");
                            this.setToken();
                        });

                    }
                    else if ((this.state.transactionPswConfirm.length == 6) && (this.state.transactionPswConfirm != this.state.transactionPsw)) {
                        this.tipMsg("The passwords you entered are different")
                    }
                    break;
            }


        })
    }
    /* 设置密码后重新设置token */
    async setToken() {
        await AsyncStorage.setItem(Storage.userToken, "userToken");
        let params = this.props.navigation.getParam("params");
        //如果是修改密码进来的，就重置路由
        if (params) {
            navigationService.reset("MinePage");
            setTimeout(() => {
                this.goRouter("HomePage")
            }, 2000)
        } else {
            TouchID.isSupported()    //判断设备是否支持TouchID验证
                .then(success => {
                    this.setState({
                        modalVisible: true,
                        modalType:"tipTouch"
                    })
                })
                .catch(error => {
                    this.goRouter("HomePage")
                });
        }
    }
    render() {
        const { tip, modalVisible, type } = this.state
        return (
            <View style={Gstyle.container}>
                <CommonHeader leftElement={this.leftElement()} title={"Set transaction password"} />
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(200) }}>
                    <View>
                        <TextM>{tip}</TextM>
                    </View>
                    <Password maxLength={6}
                        ref={psw => this.psw = psw}
                        key={type}
                        style={Gstyle.marginArg(pTd(50), 0, pTd(30), 0)}
                        onChange={(value) => this.onChangeText(type, value)}
                    />
                </View>
                <CommonModal
                    visible={modalVisible}
                    changeModalStatus={this.changeModalStatus.bind(this)}
                    noScroll={true}
                    containerStyle={styles.containerStyle}
                    content={this.modalContent()} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: pTd(500)
    },
    btnStyle: {
        width: "50%", textAlign: "center", height: pTd(80), lineHeight: pTd(80),
        justifyContent: 'center', alignItems: "center"
    }
});
