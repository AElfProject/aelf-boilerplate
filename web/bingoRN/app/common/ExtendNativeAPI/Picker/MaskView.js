import React, {Component} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import RootSiblings from 'react-native-root-siblings'

let MaskView = undefined

/**
 * 遮罩
 */
export default {

    show(callback){
        MaskView = new RootSiblings(
            <TouchableOpacity
                onPress={() => this.hide(callback)}
                style={ [ StyleSheet.absoluteFill, {backgroundColor: "rgba(0,0,0,0.5)", zIndex:10}] }
            />
        )
    },

    hide: (callback)=> {
        if (MaskView instanceof RootSiblings) {
            MaskView.destroy()
            callback && callback()
        }
    }

}
//StyleSheet.absoluteFill,