import React from 'react';
import { PermissionsAndroid } from 'react-native';

/* 相机 */
React.Component.prototype.getCameraPermission = async ()=>{
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "申请摄像头权限",
                message: "是否同意相机权限",
                buttonNegative: "拒绝",
                buttonPositive: "同意"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('现在你获得摄像头权限了');
        } else {
            console.log("用户sayno");
        }
        return ""
    } catch (err) {
        console.warn(err);
    }
}

/* 地址 */
React.Component.prototype.getLocationPermission = async ()=>{
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "申请地址权限",
                message: "是否同意地址权限",
                buttonNegative: "拒绝",
                buttonPositive: "同意"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('现在你获得地址权限了');
        } else {
            console.log("用户sayno");
        }
        return ""
    } catch (err) {
        console.warn(err);
    }
}