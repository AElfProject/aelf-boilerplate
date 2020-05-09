import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import pTd from '../../utils/unit';

const styles = StyleSheet.create({
    blankContanier:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})


const BlankPage = (props) => {
    const { message } = props;
    return (
        <View style={styles.blankContanier}>
            <Image style={{width:pTd(289), height: pTd(339),...Gstyle.marginArg(pTd(20), 0)}} source={require("../../../assets/images/navigateMenuIco/blank.png")}/>
            <Text style={Gstyle.marginArg(pTd(20), 0)}>{message || "空空如也~"}</Text>
        </View>
    )
}

export default BlankPage
