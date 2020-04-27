import React, { Component } from "react"
import TouchID from 'react-native-touch-id';

/* 指纹认证 */
React.Component.prototype.touchAuth = function (successFunc,cancelFunc, noSupported) {
    let time = 0
    const optionalConfigObject = {
        title: '指纹支付', // Android
        imageColor: '#e00606', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: '验证指纹', // Android
        sensorErrorDescription: '指纹认证失败', // Android
        cancelText: '取消', // Android
        fallbackLabel: '显示密码', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.isSupported()    //判断设备是否支持TouchID验证
        .then(success => {
            
            TouchID.authenticate('请验证您的指纹，以用于支付', optionalConfigObject)
                .then(success => {
                    //指纹认证成功
                    successFunc()
                })
                .catch(error => {
                    //点击取消
                    cancelFunc()
                });
        })
        .catch(error => {
            //设备不支持TouchID验证后进行的操作
            noSupported()
        });

}