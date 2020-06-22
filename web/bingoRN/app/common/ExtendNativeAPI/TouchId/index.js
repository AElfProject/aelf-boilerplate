import React, { Component } from "react"
import * as LocalAuthentication from 'expo-local-authentication';

/* 生物识别 */
React.Component.prototype.touchAuth = function (successFunc, cancelFunc, noSupported) {    
    const options = {
        hintMessage: 'Verify your identity',
        fallbackLabel: 'Use password',
        promptMessage:'Aelf Authenticate'
    };
    LocalAuthentication.isEnrolledAsync()
        .then(success => {
            LocalAuthentication.authenticateAsync(options)
                .then(suc => {                    
                    const { success } = suc
                    if (success) {
                        successFunc && successFunc()
                    } else {
                        cancelFunc && cancelFunc()
                    }
                })
                .catch(error => {
                    //点击取消
                    cancelFunc && cancelFunc()
                });
        })
        .catch(error => {
            //设备不支持TouchID验证后进行的操作
            noSupported && noSupported()
        });

}