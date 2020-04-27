import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import navigationService from "../../utils/navigationService"
import pTd from ".././../utils/unit";
import {isIphoneX} from '../../utils/device';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    headerWrap: {
        height: isIphoneX ? pTd(140) : pTd(120),
        paddingTop: isIphoneX ? pTd(60) : pTd(40),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderBottomWidth: pTd(1),
        borderColor: "#D8D8D8",
    },
    backWrapStyle: {
        width: pTd(100),
        height: pTd(80),
        alignItems: "center",
        justifyContent: "center",
    },
    backContainer: {
        backgroundColor: "red",
        width: pTd(100),
        height: pTd(100),
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: pTd(36),
        color: Colors.fontColor,
        fontWeight: "500"
    },
    rightBtn: {
        minWidth: pTd(100),
        height: pTd(100),
        justifyContent: "center",
        alignItems: "center"
    },

});
const CommonHeader = props => {
    const {
        canBack, leftElement,
        titleElement, title, subTitle,
        goBack,
        rightElement, headerStyle, titleStyle, toIndex
    } = props;
    return (
        <View style={[styles.headerWrap, headerStyle]}>
            <View style={styles.backWrapStyle}>
                {
                    canBack ? (
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() =>  navigationService.goBack() }
                        >
                            <Icon name={"left"} size={24} color={Colors.fontColor} />
                        </TouchableOpacity>
                    ) : null
                }
                {
                    leftElement !== null ? leftElement : null
                }
            </View>
            {
                titleElement ? titleElement : (
                    <View style={{ alignItems: "center" }}>
                        <Text style={[styles.title, titleStyle]}>{title || "详情"}</Text>
                        {subTitle && <Text style={{ color: "#fff" }}>比赛时间：{subTitle || "副标题"}</Text>}
                    </View>
                )
            }

            <View style={styles.rightBtn}>
                {rightElement !== null ? rightElement : null}
            </View>
        </View>
    );
};
CommonHeader.defaultProps = {
    rightElement: null
};

export default CommonHeader;
