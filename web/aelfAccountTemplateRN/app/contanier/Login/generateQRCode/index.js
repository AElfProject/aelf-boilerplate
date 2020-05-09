import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity ,Platform, TouchableWithoutFeedback, ScrollView, StatusBar } from "react-native"
import CameraRoll from "@react-native-community/cameraroll"
import QRCode from 'react-native-qrcode-svg';
import RNFS from "react-native-fs"
import ViewShot from "react-native-view-shot";
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from "react-native-elements"
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"


import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";
import { TextL, TextM, TextS, MutilText } from "../../../common/UI_Component/CommonText";
import Loading from '../../../common/UI_Component/Loading';

import AElf from 'aelf-sdk';
import connect from "../../../common/utils/myReduxConnect";
const {appInit} = require('../../../common/utils/aelfProvider');



/*
 * 生成二维码
 **/
class MyGenerateQRCode extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            QRCodeValue: "111",
            data:"222",
            loadingVisible: false
        }
    }
    componentDidMount() {

        this.requestOrder();


    }
    async requestOrder() {
        Promise.resolve()
        .then(res => {
            return this.generateKeystore();
        })
        .then(res =>{
            return this.initProvider(res);
        })
        .then(res => {
            this.setState({
                loadingVisible : false,
            });
            return 0 ;
        });
    }
    async showLoading(){
        this.setState({
            loadingVisible : true,
        });
    }

    async generateKeystore() {
        let params = this.props.navigation.getParam("params");

        var newWallet = params.wallet;
        // try {
        //     newWallet = AElf.wallet.createNewWallet();
        // } catch (error) {
        //     console.error(error);
        // }

        const keyStore = JSON.stringify(AElf.wallet.keyStore.getKeystore({
            mnemonic: newWallet.mnemonic,
            privateKey: newWallet.privateKey,
            address: newWallet.address,
            nickName:params.username,
          }, params.psw));


        //console.log(newWallet.privateKey);

        await AsyncStorage.setItem(Storage.userToken,"userToken");
        await AsyncStorage.setItem(Storage.userPrivateKey,newWallet.privateKey);
        await AsyncStorage.setItem(Storage.userKeyStore, keyStore);

        this.setState({
            QRCodeValue: keyStore
            // QRCodeValue: '23333'
        });

        return {privateKey: newWallet.privateKey, address: newWallet.address};

    }

    async initProvider(data){
        this.props.onLoginSuccess({contracts: await appInit(data.privateKey),address: data.address});
    }

    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    /* 完成 */
    rightElement() {
        return (
            <TouchableOpacity onPress={() => this.goRouter("SetTransactionPsw")}>
                <TextM>完成</TextM>
            </TouchableOpacity>
        )
    }

    /* 保存图片至相册 */
    async savePicture() {
        const storeLocation = `${RNFS.DocumentDirectoryPath}`;
        let pathName = new Date().getTime() + "QRcode.jpg";
        let downloadDest = `${storeLocation}/${pathName}`;

        const viewShotTmpUri = await this.refs.viewShot.capture();

        const fileInfo = await RNFS.readFile(viewShotTmpUri, 'base64');

        RNFS.writeFile(downloadDest, fileInfo, 'base64')
          .then(() => {
              return CameraRoll.saveToCameraRoll(`file://${downloadDest}`, 'photo')
          })
          .then(() => {
              this.tipMsg("Success");
          });
    }
    render() {
        const { QRCodeValue, data } = this.state
        return (
            <View style={Gstyle.container}>
                <CommonHeader title="备份二维码" rightElement={this.rightElement()} />
                <ScrollView>

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(120), marginBottom: pTd(80) }}>

                        <TextM style={styles.tip}>此二维码即是您的账号</TextM>
                    </View>
                    <View style={[Gstyle.marginArg(0, pTd(80)), { justifyContent: "center", alignItems: "center" }]}>
                        <MutilText style={{ textAlign: "center", marginBottom: pTd(60) }}> 丢失、二维码等同于丢失账号，您的资产将无法找回，请务必妥善保管您的二维码账号 </MutilText>
                        <ViewShot
                          ref="viewShot" options={{ format: "jpg", quality: 0.9 }}
                          style={{width: 200}}
                        >
                            <QRCode
                              value={ QRCodeValue }
                              getRef={(c) => (this.svg = c)}
                              logo={require("../../../assets/images/home/aelf_blue.jpg")}
                              logoSize={38}
                              logoMargin={4}
                              logoBackgroundColor={"#fff"}
                              size={200}
                            />
                            <Text style={{marginTop: 2}}>Account: {JSON.parse(QRCodeValue).nickName}</Text>
                        </ViewShot>

                    </View>
                    <Image style={{width:pTd(50), height:pTd(50)}} source={{uri:`data:image/jpg;base64,${data}`}}/>
                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: pTd(120) }}>
                        <Button
                            title="保存至相册"
                            onPress={() => this.savePicture()}

                            buttonStyle={styles.btnStyle}
                        />

                    </View>
                </ScrollView>
                {this.state.loadingVisible && (<Loading />)}
            </View>
        )
    }
}
const GenerateQRCode = connect(MyGenerateQRCode);
export default GenerateQRCode

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
})
