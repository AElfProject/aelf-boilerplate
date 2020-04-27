import React, { Component } from "react";
import { Platform, BackHandler } from "react-native";

/**
 * hander 退出app
 */
const BackHandlerHoc = WarppedComponent =>
    class extends Component {
        componentDidMount() {
            if (Platform.OS == "android") {
                BackHandler.addEventListener(
                    "hardwareBackPress",
                    this.exitAPP.bind(this)
                );
            }
        }
        componentWillUnmount() {
            if (Platform.OS == "android") {
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    this.exitAPP
                );
            }
        }
        exitAPP() {
            if (this.props.navigation.isFocused()) {
                //判断   该页面是否处于聚焦状态
                if (
                    this.lastBackPressed &&
                    this.lastBackPressed + 2000 >= Date.now()
                ) {
                    //最近2秒内按过back键，可以退出应用。
                    // return false;
                    BackHandler.exitApp(); //直接退出APP
                } else {
                    this.lastBackPressed = Date.now();
                    this.tipMsg("再按一次退出", 1000);
                    return true;
                }
            }
        }
        render() {
            return <WarppedComponent {...this.props} />;
        }
    };

export default BackHandlerHoc;
