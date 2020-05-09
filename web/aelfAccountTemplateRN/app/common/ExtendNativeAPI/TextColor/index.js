import React, { Component } from 'react'
import { Text, View } from 'react-native'
 
 
let textRender = Text.render;
Text.render = function() {
    let originText = textRender.apply(this, arguments);
     let giveStyle = {};
    if(originText.props.style && originText.props.style.length>0 ){
        for(var v of originText.props.style.values()){        
            giveStyle = Object.assign({}, giveStyle,  v)
        }  
         
    }
     
    return React.cloneElement(originText, {
       style:{
            color: Colors.fontBlack,
//            fontFamily: "AntDesign", 
           fontWeight: "normal", fontStyle: "normal",
            ...originText.props.style,
            ...giveStyle
       }
    })
}