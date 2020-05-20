import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, StatusBar } from "react-native"
import { Input, Button } from "react-native-elements"
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";
import { TextL, TextM, TextS } from "../../../common/UI_Component/CommonText";
import Loading from '../../../common/UI_Component/Loading';

import {config} from '../../../common/utils/config';

import AElf from 'aelf-sdk';

const {passwordReg} = config;
/*
 * 注册
 **/

class Registered extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            userNameRule: false,

            psw: "",
            pswRule: false,

            pswConfirm: "",
            pswConfirmRule: false,

            pswDifferent: false,
            loadingVisible: false,

            newWallet : null
        }
    }
    componentDidMount() {
        this.requestOrder();
    }
    requestOrder() {
        Promise.resolve().then(res => {
            return this.getFirstRequest();
        })
    }
    async getFirstRequest() {

        this.generateKeystore();

    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    onChangeText(text) {
        this.setState({
            userName: text
        })
    }
    /* 验证 用户名 */
    userNameBlur() {
        const { userName } = this.state
        let re = /^[a-zA-Z0-9]+$/;
        if (!re.test(userName)) {
            this.setState({
                userNameRule: true
            })
        }
        else if (re.test(userName)) {
            this.setState({
                userNameRule: false
            })
        }

    }
    /* mima  */
    psw(type, text) {
        this.setState({
            [type]: text
        })
    }
    /* pswBlur 验证密码 */
    pswBlur() {
        const { psw, pswConfirm } = this.state;
        const re = passwordReg;
        if (!re.test(psw)) {
            this.setState({
                pswRule: true
            })
        }
        else if (re.test(psw)) {
            this.setState({
                pswRule: false
            })
        }

        if (pswConfirm && psw && (pswConfirm != pswConfirm)) {
            this.setState({
                pswDifferent: true
            })
        }

        else if (pswConfirm && psw && (pswConfirm == pswConfirm)) {
            this.setState({
                pswDifferent: false
            })
        }
    }
    /* pswComfirmBlur 验证确认密码 */
    pswComfirmBlur() {
        const { pswConfirm, psw } = this.state;
        const re = passwordReg;
        if (!re.test(pswConfirm)) {
            this.setState({
                pswConfirmRule: true
            })
        }
        else if (re.test(pswConfirm)) {
            this.setState({
                pswConfirmRule: false
            })
        }

        if (pswConfirm && psw && (psw != pswConfirm)) {
            this.setState({
                pswDifferent: true
            })
        } else if (pswConfirm && psw && (psw == pswConfirm)) {
            this.setState({
                pswDifferent: false
            })
        }
    }
    async generateKeystore() {

        var newWallet;
        try {
            newWallet = AElf.wallet.createNewWallet();
        } catch (error) {
            console.error(error);
        }

        this.setState({
            newWallet: newWallet
        })

        return newWallet;
    }

    /* 提交信息 */
    async submitInfo() {
        const {
            userName,
            userNameRule,

            psw,
            pswRule,

            pswConfirm,
            pswConfirmRule,

            pswDifferent
        } = this.state;
        this.windowOnBlur()

        /* 文本框有值 且 符合规则 */ //暂时简化
        this.goRouter("GenerateQRCode",{username:userName,psw:psw, wallet:this.state.newWallet});
        // if ((userName && psw && pswConfirm) && (!userNameRule && !pswRule && !pswConfirmRule) && !pswDifferent) {
        //     //this.goRouter("GenerateQRCode", `${userName},${psw}`)
        //     this.goRouter("GenerateQRCode", {username:userName,psw:psw});
        // } else {
        //     this.tipMsg("请正确填写信息")
        // }

    }
    async changeLoading(status){
        this.setState({
            loadingVisible : status,
        });
    }
    windowOnBlur() {
        this.user.blur()
        this.pswNode.blur()
        this.cpswNode.blur()
    }
    render() {
        const { pswRule, pswConfirmRule, userNameRule, pswDifferent } = this.state;
        return (
            <View style={Gstyle.container}>
                {this.state.loadingVisible && (<Loading />)}
                <CommonHeader canBack title="注册" />
                <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => this.windowOnBlur()}>
                    <View style={Gstyle.marginArg(pTd(200), pTd(50), 0)}>

                        <View style={{ position: "relative" }}>
                            <Input
                                ref={u => this.user = u}
                                onBlur={() => this.userNameBlur()}
                                onChangeText={(text) => this.onChangeText(text)}
                                placeholder='用户名'
                            />
                            {userNameRule && <TextM style={styles.pswTip}>用户名格式错误</TextM>}
                        </View>
                        <View style={{ position: "relative" }}>
                            <Input
                                ref={p => this.pswNode = p}
                                secureTextEntry={true}
                                onBlur={() => this.pswBlur()}
                                onChangeText={(text) => this.psw("psw", text)}
                                placeholder='新密码'
                            />
                            {pswRule && <TextM style={styles.pswTip}>密码格式错误</TextM>}
                        </View>
                        <View style={{ position: "relative" }}>
                            <Input
                                ref={ps => this.cpswNode = ps}
                                secureTextEntry={true}
                                onBlur={() => this.pswComfirmBlur()}
                                onChangeText={(text) => this.psw("pswConfirm", text)}
                                placeholder='确认密码'
                            />
                            {pswConfirmRule && <TextM style={styles.pswConfirm}>密码格式错误</TextM>}
                        </View>
                        {
                            pswDifferent && <TextM style={{ color: "red", ...Gstyle.marginArg(pTd(20)) }}>您两次输入的密码不一致</TextM>
                        }

                        <TextS style={{ color: Colors.fontGray, marginTop: pTd(20) }}>*用户名中的字符只能是英文或数字</TextS>
                        <TextS style={{ color: Colors.fontGray, marginTop: pTd(20) }}>*密码必须大于等于12位，而且同时包含大写字母、小写字母、数字和字符</TextS>

                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(80) }}>
                        <Button
                            title="注册"
                            onPress={async () => {
                                this.submitInfo();
                            }}
                            buttonStyle={{ backgroundColor: "#817AFD", width: pTd(260) }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Registered

const styles = StyleSheet.create({
    pswTip: {
        position: "absolute",
        color: "red",
        right: pTd(14), top: pTd(40)
    },
    pswConfirm: {
        position: "absolute",
        color: "red",
        right: pTd(14), top: pTd(40)
    }
});
