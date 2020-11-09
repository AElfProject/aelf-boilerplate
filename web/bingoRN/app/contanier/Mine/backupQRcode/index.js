import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native"
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from "react-native-elements"
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"

import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";
import { TextM, MutilText } from "../../../common/UI_Component/CommonText";
import { screenshots } from "../../../common/utils/utils";

/*
 * 备份二维码
 **/

class BackupQRcode extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            keyStore: '1'
        }

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
        let keyStoreString =  await AsyncStorage.getItem(Storage.userKeyStore);

        this.setState({
            keyStore: keyStoreString
        })


    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* 完成 */
    rightElement() {
        return (
            <TouchableOpacity onPress={()=>navigationService.goBack()}>
                <TextM>Done</TextM>
            </TouchableOpacity>
        )
    }
    /* 保存图片至相册 */
    async savePicture() {

        this.refs.viewShot && screenshots(this.refs.viewShot) 
    }
    render() {
        const { keyStore } = this.state;
        const keyStoreObject = JSON.parse(keyStore);
        console.log(keyStore);
        return (
            <View style={Gstyle.container}>
                <CommonHeader title="Qrcode Backup" rightElement={this.rightElement()} />
                <ScrollView>
                    <View style={{ justifyContent: "center", alignItems: "center", marginVertical: pTd(50) }}>
                        <Icon name="exclamationcircle" size={44} color={Colors.primaryColor} />
                        <TextM style={styles.tip}>This qrcode is your account</TextM>
                    </View>
                    <View style={[Gstyle.marginArg(0, pTd(80)), { justifyContent: "center", alignItems: "center" }]}>
                        <MutilText style={{ textAlign: "center" }}>Lost or QR code is the same as lost account. Your assets will not be recovered. Please keep your QR code account properly</MutilText>
                        <View ref="viewShot" style={styles.shotView}>
                            <QRCode
                                value={ keyStore }
                                getRef={(c) => (this.svg = c)}
                                logo={require("../../../assets/images/home/aelf_blue.jpg")}
                                logoSize={38}
                                logoMargin={4}
                                logoBackgroundColor={"#fff"}
                                size={200}
                            />
                            <Text style={{marginTop: 2}}>Account: {keyStoreObject.nickName}</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(120) }}>
                        <Button
                            title="Save to album"
                            onPress={() => this.savePicture()}
                            // titleStyle={{ fontSize: pTd(40) }}
                            buttonStyle={styles.btnStyle}
                        />

                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default BackupQRcode

const styles = StyleSheet.create({
    tip: {
        color: Colors.primaryColor, marginTop: pTd(20),
        fontWeight: "500"
    },
    btnStyle: {
        backgroundColor: Colors.primaryColor,
        ...Gstyle.radiusArg(pTd(60)),
        width: pTd(400),

        marginBottom: pTd(30)
    },
    shotView: {
        padding:10,
        backgroundColor: 'white',
        alignItems: 'center'
    }
})
