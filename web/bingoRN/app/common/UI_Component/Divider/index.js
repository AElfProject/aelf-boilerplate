import React from 'react'
import {View, StyleSheet} from 'react-native'
//utils
import pTd from '../../utils/unit';

const styles = StyleSheet.create({
  dividerWStyle:{
    height:pTd(1),
    backgroundColor: "#d8d8d8"
  },
  dividerHStyle:{
    height:"100%",
    width:pTd(1),
    backgroundColor: "#d8d8d8"
  }
})

/**
 * 水平方向的分割线
 */
export const DividerW = (props) => (
  <View style={[styles.dividerWStyle, props.style]} />
)

/**
 * 垂直方向的分割线
 */
export const DividerH = (props) => (
  <View style={[styles.dividerHStyle, props.style]} />
)


  