import React from "react"
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import Clipboard from "@react-native-community/clipboard";
import Icon from 'react-native-vector-icons/AntDesign';
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"
import QRCode from 'react-native-qrcode-svg';

import pTd from "../../../common/utils/unit";
import { TextM, TextL } from "../../../common/UI_Component/CommonText";
import CommonModal from "../../../common/Components/CommonModal/CommonModal";

/*
 * 充值
 **/
class Recharge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            keyStore: "1",
            accountAddress: "1"
        }
    }
    componentDidMount() {
        this.getFirstRequest();
    }
    async getFirstRequest() {
        const keyStoreString =  await AsyncStorage.getItem(Storage.userKeyStore);
        const keyStoreObject = JSON.parse(keyStoreString) || {};
        const userAddress =  keyStoreObject.address;

        this.setState({
            keyStore: keyStoreString,
            accountAddress: userAddress
        })

    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* changeModestatus */
    changeModalStatus() {
        this.setState(pre => ({
            modalVisible: !pre.modalVisible
        }))
    }
    /* 复制账户地址 */
    copyAddress() {
        Clipboard.setString(this.state.accountAddress);
    }

    /* 二维码账户 */
    modalContent() {
        const { accountAddress } = this.state
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: pTd(500) }}>
                <TextL >Please transfer ELF token.</TextL>
                <QRCode
                        value={ accountAddress }
                        logo={require("../../../assets/images/home/aelf_blue.jpg")}
                        logoSize={38}
                        logoMargin={4}
                        logoBackgroundColor={"#fff"}
                        size={200}
                    />
            </View>
        )
    }
    render() {
        // const { modalVisible, accountAddress, keyStore, depositInfo } = this.state;
        const { modalVisible, accountAddress } = this.state;
        return (
            <View style={Gstyle.container}>
                <CommonHeader canBack title="Recharge" />
                <ScrollView>
                    <View style={{ justifyContent: "center", alignItems: "center", ...Gstyle.marginArg(pTd(40), 0, pTd(160), 0) }}>
                        <View style={[Gstyle.frc, Gstyle.marginArg(pTd(40), 0)]}>
                           <Icon name="customerservice"  size={18} color={ Colors.primaryColor} />
                            <TextM style={{ color: Colors.primaryColor, marginLeft: pTd(20)  }}>Contact customer service</TextM>
                        </View>
                        {/*<QRCode*/}
                        {/*    value={ depositInfo }*/}
                        {/*    logoBorderRadius={1}*/}
                        {/*    color={'#191919'}*/}
                        {/*    backgroundColor={'#ffffff'}*/}
                        {/*    logoSize={30}*/}
                        {/*    size={150}*/}
                        {/*/>*/}
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        {/*<View style={[Gstyle.frcc]}>*/}
                        {/*    <Image style={styles.phoneImg} source={require("../../../assets/images/mine/myBet.png")} />*/}
                        {/*    <TextM style={{ fontWeight: '500', }}>客服转账，自动充值</TextM>*/}
                        {/*</View>*/}
                        <View style={{ flexDirection: "row", ...Gstyle.marginArg(pTd(20), 0) }}>
                            <TextM>Account: </TextM>
                            <TextM style={{ width: pTd(450) }}>{accountAddress}</TextM>
                            <TouchableOpacity onPress={() => this.copyAddress()}>
                                <Icon name="copy1" size={18} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeModalStatus()}>
                            <View style={{ ...Gstyle.frcc }}>
                                <TextM>Receipt QR Code：</TextM>

                                <Icon name="barcode" size={18} color="#000" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <CommonModal
                    changeModalStatus={() => this.changeModalStatus()}
                    visible={modalVisible}
                    content={this.modalContent()}
                />
            </View>
        )
    }
}

export default Recharge

const styles = StyleSheet.create({
    phoneImg: {
        width: pTd(36), height: pTd(42), marginRight: pTd(20)
    }
})
