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
            <Text style={[{color:Colors.primaryColor, fontSize:30}]}>{message || "Empty~"}</Text>
        </View>
    )
}

export default BlankPage
