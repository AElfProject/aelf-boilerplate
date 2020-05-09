import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import { TextL, TextM } from '../CommonText';
import { DividerH, DividerW } from "../Divider/index"
import pTd from "../../utils/unit"

const ConfirmTip = (props) => {
    const { tipMsg, rightText, rightFunc=()=>{}, leftText, leftFunc=()=>{} } = props
    return (
        <View>
            <View style={{ justifyContent: "center", alignItems: "center", marginVertical: pTd(50) }}>

                <TextM style={{ marginTop: pTd(20) }}>{ tipMsg || "确定要退出吗？"}</TextM>
            </View>
            <DividerW />
            <View style={{ flexDirection: "row", }}>
                <TouchableOpacity style={styles.modal_btnStyle} onPress={() =>rightFunc()} >
                    <TextL style={{ color: "#000" }}>{ rightText ||  "输入密码"}</TextL>
                </TouchableOpacity>

                <DividerH />
                <TouchableOpacity style={styles.modal_btnStyle} onPress={() => { leftFunc() }}>
                    <TextL style={{ color: "#0c69c4" }}>{leftText || "确定"}</TextL>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ConfirmTip

const styles = StyleSheet.create({
    modal_btnStyle: {
     
        width: "50%", textAlign: "center", height: pTd(100), lineHeight: pTd(100),
        justifyContent: 'center', alignItems: "center"
    },
})

