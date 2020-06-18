import React from 'react';
import { Text, StyleSheet } from 'react-native';
import pTd from '../../utils/unit';


const styles = StyleSheet.create({
    textS: {
        fontSize: pTd(24),
    },
    textM: {
        fontSize: pTd(28)
    },
    textL: {
        fontSize: pTd(32)
    },
    textTitle: {
        fontSize: pTd(38),
        fontWeight: "500",
    },
    mutilText: {
        lineHeight: pTd(36),
        fontSize: pTd(28)
    }
})

export const TextS = (props) => {
    return <Text {...props} style={[styles.textS, props.style]}>{props.children }</Text>
}

export const TextM = (props) => {
    return <Text {...props} style={[styles.textM, props.style]}>{props.children }</Text>
}

export const TextL = (props) => {
    return <Text {...props} style={[styles.textL, props.style]}>{props.children }</Text>
}

export const TextTitle = (props) => {
    return <Text {...props} style={[styles.textTitle, props.style]}>{props.children }</Text>
}

export const MutilText = (props) => {
    return <Text {...props} style={[styles.mutilText, props.style]}>{props.children }</Text>
}

 
