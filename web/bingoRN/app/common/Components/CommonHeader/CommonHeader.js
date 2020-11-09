import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native";
import navigationService from "../../utils/navigationService"
import pTd from ".././../utils/unit";
import { statusBarHeight, pixelSize } from '../../utils/device';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
    statusBarStyle: {
        paddingTop: statusBarHeight,
        backgroundColor: "#fff",
    },
    headerWrap: {
        height: pTd(88),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: pixelSize,
        borderColor: "#D8D8D8",
    },
    backWrapStyle: {
        width: pTd(100),
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: pTd(36),
        color: Colors.fontColor,
        fontWeight: "500"
    },
    leftBox: {
        height: '100%',
        paddingHorizontal: 10,
        justifyContent: 'center'
    }

});
const CommonHeader = props => {
    const {
        canBack, leftElement,
        titleElement, title, subTitle, statusBar,
        rightElement, headerStyle, titleStyle
    } = props;
    return (
        <View style={[styles.statusBarStyle, { backgroundColor: headerStyle?.backgroundColor }]}>
            {
                statusBar && statusBar
            }
            <View style={[styles.headerWrap, headerStyle]}>
                <View style={styles.backWrapStyle}>
                    {
                        canBack ? (
                            <TouchableOpacity
                                style={styles.leftBox}
                                activeOpacity={0.75}
                                onPress={() => navigationService.goBack()}
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

                <View style={styles.backWrapStyle}>
                    {rightElement !== null ? rightElement : null}
                </View>
            </View>
        </View>
    );
};
CommonHeader.defaultProps = {
    rightElement: null
};

export default CommonHeader;
