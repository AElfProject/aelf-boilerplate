import React, { Component } from 'react';
import {
    View,
    Modal,
    StyleSheet
} from 'react-native';
// import ProgressBarAndroid from '../ProgressBarAndroid';
// hava not remove ProgressBarAndroid in 0.62.4 yet. If import the community version,
// It will throw `register two views with the same name`;
// import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';
import { ProgressBarAndroid } from 'react-native';

export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    render() {

        return(
            <Modal
                transparent = {true}
                onRequestClose={()=> this.onRequestClose()}
            >
                <View style={style.loadingBox}>
                    <ProgressBarAndroid styleAttr='Inverse' color='#FF4500' />
                </View>
            </Modal>
        );
    }

}

const style = StyleSheet.create({
    loadingBox: { // Loading居中
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgba(0, 0, 0, 0.5)', // 半透明
    }
});
