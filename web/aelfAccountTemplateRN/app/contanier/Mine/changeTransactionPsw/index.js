import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from "react-native"
import Password from 'react-native-password-pay'
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import { TextM } from "../../../common/UI_Component/CommonText/index"
import pTd from "../../../common/utils/unit";
import CommonModal from "../../../common/Components/CommonModal/CommonModal";
import { DividerW, DividerH } from "../../../common/UI_Component/Divider";

import AsyncStorage from "@react-native-community/async-storage"
import TouchID from 'react-native-touch-id';
import Storage from "../../../constants/storage"

/*
 * 修改交易密码
 **/

class ChangeTransactionPsw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "Change Transaction Password",
            modalVisible: false,

            transactionPsw:"",
            transactionPswStatus:false
        }
    }
    componentDidMount() {
        this.requestOrder()
    }
    requestOrder() {
        Promise.resolve().then(res => {
            return this.getFirstRequest();
        })
    }
    async getFirstRequest() {
        let params = this.props.navigation.getParam("params");


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
        this.setState(prev => ({
            modalVisible: !prev.modalVisible
        }))
    }
    /* 提示 */
    modalContent() {
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
    /*  */
    async onChangeText(text){
        let originTransactionPsw =  await AsyncStorage.getItem(Storage.transactionPsw);
        this.setState({
            transactionPsw:text
        },()=>{
            if(this.state.transactionPsw == originTransactionPsw){
                this.goRouter("SetTransactionPsw", "changeTransactionPsw")
            }else if((this.state.transactionPsw != originTransactionPsw) && this.state.transactionPsw.length==6){
                this.setState({
                    transactionPswStatus:true
                })
            }
        })
    }
    render() {
        const { title, modalVisible, transactionPswStatus } = this.state
        return (
            <View style={Gstyle.container}>
                <CommonHeader leftElement={this.leftElement()} title={title} />
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(200) }}>
                    <View>
                        <TextM>Please input transaction password</TextM>
                    </View>
                    <Password maxLength={6}
                        ref={psw => this.psw = psw}
                        style={Gstyle.marginArg(pTd(50), 0, pTd(30), 0)}
                        onChange={(value) => this.onChangeText(value)}
                    />
                    { transactionPswStatus &&  <TextM style={{color:"red"}}>Password Error</TextM>}
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

export default ChangeTransactionPsw

const styles = StyleSheet.create({
    containerStyle: {
        width: pTd(500)
    },
    btnStyle: {
        width: "50%", textAlign: "center", height: pTd(80), lineHeight: pTd(80),
        justifyContent: 'center', alignItems: "center"
    }
});
