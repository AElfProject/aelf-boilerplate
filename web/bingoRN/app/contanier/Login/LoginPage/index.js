import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from "react-native"
import { Button } from "react-native-elements"
import navigationService from "../../../common/utils/navigationService";


import pTd from "../../../common/utils/unit";

/*
 * 登录主页
 **/
class LoginPage extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.requestOrder()
    }
    requestOrder() {
        Promise.resolve().then(res => {
            return this.getFirstRequest();
        })
    }
    async getFirstRequest() {


    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    render() {
        return (
            <View style={Gstyle.container}>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(260) }}>
                    <Image style={{ width: pTd(450), height: pTd(450) }} source={require("../../../assets/images/login/login_bg.png")} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(200) }}>
                    <Button
                        title="Login"
                        onPress={()=>this.goRouter("AccountLogin")}
                        buttonStyle={[styles.btnStyle,{marginBottom:pTd(30)}]}
                    />
                    <Button
                        title="Register"
                        onPress={()=>this.goRouter("Registered")}
                        buttonStyle={styles.btnStyle}
                    />
                </View>
            </View>
        )
    }
}

export default LoginPage

const styles = StyleSheet.create({
    btnStyle:{
        ...Gstyle.radiusArg(pTd(60)),
        width: pTd(400),
        backgroundColor:"#756EF9"
    }
})
