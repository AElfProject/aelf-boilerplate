import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native"
import { Input, Button } from 'react-native-elements';
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import CommonModal from "../../../common/Components/CommonModal/CommonModal";
import { TextM, TextS } from "../../../common/UI_Component/CommonText/index"
import pTd from "../../../common/utils/unit";
import {config} from '../../../common/utils/config';
import { DividerH, DividerW } from "../../../common/UI_Component/Divider";

const {passwordReg} = config;
/*
 * 修改登录密码
 **/
class ChangeLoginPsw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            originPsw: "",
            psw: "",
            pswRule: false,

            pswConfirm: "",
            pswConfirmRule: false,

            pswDifferent:false
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
                <TextM>取消</TextM>
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
                    <TextM>是否放弃修改交易密码</TextM>
                </View>
                <DividerW />
                <View style={{ flexDirection: "row", }}>
                    <TouchableOpacity style={styles.btnStyle} onPress={() => this.changeModalStatus()}>
                        <TextM >取消</TextM>
                    </TouchableOpacity>
                    <DividerH />
                    <TouchableOpacity style={styles.btnStyle} onPress={() => navigationService.goBack()}>
                        <TextM style={styles.btnStyle}>放弃</TextM>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    /* 原始密码 */
    originPsw(text) {
        this.setState({
            originPsw: text
        })
    }
    /* mima  */
    psw(type, text) {
        this.setState({
            [type]: text
        })
    }
    /* pswBlur */
    pswBlur() {
        const { psw, pswConfirm } = this.state;
        let re = passwordReg;
        if (!re.test(psw)) {
            this.setState({
                pswRule: true
            })
        }
        else if(re.test(psw)){
            this.setState({
                pswRule: false
            })
        }
        else if (pswConfirm && psw && (pswConfirm != pswConfirm)){
            this.setState({
                pswDifferent: true
            })
        }else if(pswConfirm && psw && (pswConfirm == pswConfirm)){
            this.setState({
                pswDifferent: false
            })
        }
    }
    /* pswComfirmBlur */
    pswComfirmBlur() {
        const { pswConfirm, psw } = this.state;
        let re = passwordReg;
        if (!re.test(pswConfirm)) {
            this.setState({
                pswConfirmRule: true
            })
        }
        else if(re.test(pswConfirm)){
            this.setState({
                pswConfirmRule: false
            })
        }
        else if (pswConfirm && psw && (pswConfirm != pswConfirm)){
            this.setState({
                pswDifferent: true
            })
        }else if(pswConfirm && psw && (pswConfirm == pswConfirm)){
            this.setState({
                pswDifferent: false
            })
        }
    }
    render() {
        const { modalVisible, pswRule, pswConfirmRule, pswDifferent } = this.state;
        return (
            <View style={Gstyle.container}>
                <CommonHeader leftElement={this.leftElement()} title="修改登录密码" />
                <ScrollView>
                    <View style={[Gstyle.marginArg(pTd(100)), { justifyContent: "center", alignItems: "center" }]}>
                        <TextM style={{ fontWeight: '500', marginBottom: pTd(20), }}>您可以通过二维码账号+密码登陆</TextM>
                        <TextM style={{ fontWeight: '500', }}>Login</TextM>
                    </View>
                    <View style={Gstyle.marginArg(pTd(50), pTd(80))}>
                        <Input secureTextEntry={true} onChangeText={(text) => this.originPsw(text)} placeholder='旧密码' />
                        <View style={{position:"relative"}}>
                            <Input
                                secureTextEntry={true}
                                onBlur={() => this.pswBlur()}
                                onChangeText={(text) => this.psw("psw", text)}
                                placeholder='新密码'
                            />
                            { pswRule && <TextM style={styles.pswTip}>密码格式错误</TextM> }
                        </View>
                        <View style={{position:"relative"}}>
                            <Input
                                secureTextEntry={true}
                                onBlur={() => this.pswComfirmBlur()}
                                onChangeText={(text) => this.psw("pswConfirm", text)}
                                placeholder='确认密码'
                            />
                            { pswConfirmRule && <TextM style={styles.pswConfirm}>密码格式错误</TextM> }
                        </View>
                        {
                            pswDifferent && <TextM style={{color:"red", ...Gstyle.marginArg(pTd(20))}}>您两次输入的密码不一致</TextM>
                        }

                        <TextS style={{ color: Colors.fontGray, marginTop: pTd(20) }}>*密码必须大于等于12位，而且同时包含大写字母、小写字母、数字和字符</TextS>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: pTd(80) }}>
                        <Button
                            title="确认修改"
                            onPress={() => this.changeModalStatus()}
                            buttonStyle={{ backgroundColor: "#817AFD", width: pTd(260) }}
                        />

                    </View>
                </ScrollView>
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

export default ChangeLoginPsw

const styles = StyleSheet.create({
    containerStyle: {
        width: pTd(500)
    },
    btnStyle: {
        width: "50%", textAlign: "center", height: pTd(80), lineHeight: pTd(80),
        justifyContent: 'center', alignItems: "center"
    },
    pswTip:{
        position:"absolute",
        color:"red",
        right:0, top:pTd(40)
    },
    pswConfirm:{
        position:"absolute",
        color:"red",
        right:0, top:pTd(40)
    }
})
