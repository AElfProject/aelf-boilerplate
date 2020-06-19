import React from "react";
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"
 
React.Component.prototype.checkTokenStatus = async ()=>{
    let token = await AsyncStorage.getItem(Storage.userToken);
    let pk = await AsyncStorage.getItem(Storage.userPrivateKey);
    return token,pk
} 