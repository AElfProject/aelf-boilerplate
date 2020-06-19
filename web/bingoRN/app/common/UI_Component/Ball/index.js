import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextL } from '../CommonText/index';
import pTd from "../../utils/unit"

const styles = StyleSheet.create({
    ball_wrap: {
        ...Gstyle.radiusArg(pTd(32)),
        width: pTd(70), height: pTd(70),
        borderColor: "#666",
        borderWidth: pTd(1),
        alignItems: "center", justifyContent: "center",
        ...Gstyle.marginArg(pTd(24), pTd(24))
    },
    ballColor: {
        color: "#fff",  
    },
    ball: {
        color: Colors.fontBlack, 
    },
    textClsactive: {
        color: "#fff", 
    }
});

export default Ball = (props) => {
    /* 
      ballType : red 红球  blue 篮球
      num： 球号
      active： 是否有背景色（实心）
      chooseBall： 点击出发函数
    */
    let { ballColor, num,  chooseBall, containerStyle } = props;
    /* 球字体颜色 */
    let ballTextStyle = ballColor ? styles.ballColor : styles.ball;

    let ballWrapActive =   ballColor && { backgroundColor: Colors.primaryColor, borderColor: Colors.primaryColor}; 

    return (
        chooseBall ? (
            <TouchableOpacity onPress={() => chooseBall(num, ballColor)}>
                <View style={[styles.ball_wrap,containerStyle, ballWrapActive]}>
                    <TextL style={{ ...ballTextStyle }}>{num}</TextL>
                </View>
            </TouchableOpacity>
        ) : (
                <View style={[styles.ball_wrap,containerStyle, ballWrapActive]}>
                    <TextL style={{ ...ballTextStyle  }}>{num}</TextL>
                </View>
            )
    )
}




