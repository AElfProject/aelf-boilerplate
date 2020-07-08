
import React, { Component } from 'react';
import {
    StyleSheet,
    View, Text,
    TouchableOpacity,
    Animated,
    PermissionsAndroid,
    default as Easing,
    ImageBackground,
    ActivityIndicator, DeviceEventEmitter,
} from 'react-native';
import { RNCamera } from 'react-native-camera'
import AsyncStorage from "@react-native-community/async-storage"
import Storage from  "../../../constants/storage"

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
// import Password from 'react-native-password-pay'
import { Button, Overlay, Input } from "react-native-elements"
import Icon from 'react-native-vector-icons/AntDesign';

import CommonHeader from '../../../common/Components/CommonHeader/CommonHeader';
import pTd from '../../../common/utils/unit';
import { TextM, TextL } from '../../../common/UI_Component/CommonText';
import navigationService from '../../../common/utils/navigationService';
import CommonModal from '../../../common/Components/CommonModal/CommonModal';
import Loading from '../../../common/UI_Component/Loading';

import AElf from 'aelf-sdk';
import connect from "../../../common/utils/myReduxConnect";
import { appInit } from '../../../common/utils/aelfProvider'

class MyAccountLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //中间横线动画初始值
            moveAnim: new Animated.Value(-2),
            enterAccount: false,
            modalVisible: false,
            originPsw: "123456",
            psw: "",
            keyStore: "",
            loadingVisible: false,
            tipStatus: false,
            overlayVisible: true,
            inputErrorMessage: '',
        };
        this.requestCameraPermission = this.requestCameraPermission.bind(this)
    }
    componentWillMount() {
        this.requestCameraPermission();
    }
    componentDidMount() {
        this.startAnimation();
    }
    //请求权限的方法
    async requestCameraPermission() {
        // if (Platform.OS === 'ios') {
        //     return;
        // }
        // try {
            // await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.CAMERA,
            //     {
            //         title: '申请摄像头权限',
            //         message:
            //             '登录需要使用您的摄像头' +
            //             '扫描您的二维码。',
            //
            //         buttonNegative: '不行',
            //         buttonPositive: '好吧',
            //     },
            // );

            // console.log('granted:', granted);
            // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //console.log('现在你获得摄像头权限了');
            // } else {
                //console.log('用户并不屌你');
            // }
        // } catch (err) {
        //     console.warn(err);
        // }
    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    rightElement() {
        return (
            <TouchableOpacity style={styles.albumBox} onPress={() => this.usePhotoAlbum()}>
                <TextM>Album</TextM>
            </TouchableOpacity>
        )
    }
    /* 调用相册 */
    async usePhotoAlbum() {
        try {
            const camera = await ImagePicker.requestCameraPermissionsAsync();
            const cameraRoll = await ImagePicker.requestCameraRollPermissionsAsync();
            if (camera.status !== 'granted' && cameraRoll.status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            } else {
                const images = await ImagePicker.launchImageLibraryAsync({
                    allowMultipleSelection: false,
                });
                if (images.uri) {
                    this.recoginze(images);
                } else {
                    alert("Image load failed.")
                }
            }
        } catch (err) {
            alert("Image load failed.")
        }
    }
    /* 识别二维码图片 */
    recoginze = async (images) => {
        try {
            const imageData = await BarCodeScanner.scanFromURLAsync(images.uri, [
                BarCodeScanner.Constants.BarCodeType.qr,
            ]);

            // console.log('scanFromURLAsync: ', imageData[0].data);

            if (imageData.length) {
                this.setState({
                    enterAccount: true,
                    keyStore: imageData[0].data
                });
            } else {
                alert("Image load failed.");
            }
        } catch {
            alert("Image load failed.");
        }
    };
    /** 扫描框动画*/
    startAnimation = () => {
        this.state.moveAnim.setValue(-2);
        Animated.sequence([
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: 200,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true
                },
            ),
            Animated.timing(
                this.state.moveAnim,
                {
                    toValue: -1,
                    duration: 1500,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            )
        ]).start(() => this.startAnimation())

    };
    /* 二维码扫描结果 */
    onBarCodeRead = (result) => {
        const { data } = result; //Determine whether to log in the QR code
        if (data && typeof data === 'string' && data.includes('aelf')) {
            this.setState({
                enterAccount: true,
                keyStore: data
            })
        } else {
            this.tipMsg('Please use the login QR code')
        }
    };
    /* 扫描二维码 html */
    RNCameraHTML() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                autoFocus={RNCamera.Constants.AutoFocus.on}/*自动对焦*/
                style={[styles.preview,]}
                type={RNCamera.Constants.Type.back}/*切换前后摄像头 front前back后*/
                flashMode={RNCamera.Constants.FlashMode.off}/*相机闪光模式*/
                onBarCodeRead={this.onBarCodeRead}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <View style={{
                    width: 500,
                    height: pTd(260),
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }} />

                <View style={[{ flexDirection: 'row' }]}>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />
                    <ImageBackground source={require('../../../assets/images/login/icon_scan_rect.png')} style={{ width: 200, height: 200 }}>
                        <Animated.View style={[
                            styles.border,
                            { transform: [{ translateY: this.state.moveAnim }] }]} />
                    </ImageBackground>
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 200, width: 200 }} />

                </View>

                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 500, alignItems: 'center' }}>
                    <Text style={styles.rectangleText}>Scan the QR code</Text>
                </View>
            </RNCamera>
        )
    }
    async showLoading(){
        this.setState({
            loadingVisible : true,
        });
    }
    loginSuccess = async (keyStoreTemp, privateKey) => {
        try {
            const contracts = await appInit(privateKey)
            this.props.onLoginSuccess({
                contracts,
                address: keyStoreTemp.address,
                keystore: keyStoreTemp
            });
        } catch (error) {
            console.warn(error, "连接合约失败");
        }
    }
    /* 登陆 */
    async accountLogin() {
        const { psw, originPsw, keyStore } = this.state;
        const keyStoreTemp = JSON.parse(keyStore);

        try {
            const { mnemonic: ksMn, privateKey } = AElf.wallet.keyStore.unlockKeystore(keyStoreTemp, psw);
            if (!!privateKey) {
                this.setState({
                    modalVisible: true,
                    tipStatus: true,
                    loadingVisible: false
                });
                this.setToken(privateKey, keyStore);
                this.loginSuccess(keyStoreTemp, privateKey);

                setTimeout(() => {
                    this.changeModalStatus();
                }, 1000);
                return true;
            } else {
                return false
            }
        } catch (error) {
            this.setState({
                modalVisible: true,
                tipStatus: false,
                loadingVisible: false
            })
            setTimeout(() => {
                this.changeModalStatus();
            }, 1000);
            return false;
        }

    }
    async setToken(pk, ks){


        await AsyncStorage.setItem(Storage.userToken,"userToken");
        await AsyncStorage.setItem(Storage.userPrivateKey,pk);
        await AsyncStorage.setItem(Storage.userKeyStore, ks);
        DeviceEventEmitter.emit("checkPrivateKey");

        // setTimeout(()=>{
        //     this.goRouter("HomePage",{keyStore:ks});
        // }, 1000)
    }
    /* 文本框可控 */
    onChangeText(text) {
        this.setState({
            psw: text
        })
    }

    /* 输入密码 */
    enterPsw() {
        let ks = JSON.parse(this.state.keyStore);
        const {overlayVisible, inputErrorMessage} = this.state;

        return (
            <View style={{
                backgroundColor: "#FFF", justifyContent: "center",
                alignItems: "center", flex: 1
            }}>
                <Overlay isVisible={overlayVisible} onBackdropPress={() => this.setState({ enterAccount: false })}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TextL
                          style={{ marginTop: pTd(50), marginLeft: pTd(50), marginRight: pTd(50) }}
                        >Please input the password of {ks.nickName}</TextL>

                        <Input
                          secureTextEntry={true}
                          placeholder="Please input login password"
                          placeholderTextColor="#999"
                          onChangeText={(text) => this.onChangeText(text)}
                          errorStyle={{ color: 'red' }}
                          errorMessage={inputErrorMessage}
                        />

                        <View style={{ justifyContent: "center", alignItems: "center", marginBottom: pTd(30) }}>
                            <Button
                                title="Confirm"
                                onPress={async () => {
                                    this.showLoading().then(()=>{
                                        this.accountLogin().then(res =>{
                                            if (!res) {
                                                this.setState({
                                                    inputErrorMessage: 'Login failed'
                                                });
                                                return;
                                            }
                                            setTimeout(()=>{
                                                this.setState({
                                                    overlayVisible: false
                                                });
                                                this.goRouter("SetTransactionPsw");
                                            }, 1)}).catch(error => {
                                                console.log('accountLogin error', error);
                                        });
                                    })}
                                    }
                                buttonStyle={styles.btnStyle}
                            />
                        </View>
                    </View>
                </Overlay>
                {this.state.loadingVisible && (<Loading />)}
            </View>
        )
    }
    /* 改变状态 */
    changeModalStatus() {
        this.setState(prev => ({
            modalVisible: !prev.modalVisible
        }))

    }
    /* 弹框内容 */
    modalContent() {
        const { tipStatus } = this.state
        return tipStatus ? (
            <View style={styles.tip}>
                {/* <Icon name="checkcircle" size={38} color={"green"} /> */}
                <ActivityIndicator size="large" color={'green'} />
                <TextL style={{marginTop:pTd(20)}}>Success</TextL>
            </View>
        ) : (
                <View style={styles.tip}>
                    <Icon name="closecircle" size={38} color={Colors.primaryColor} />
                    <TextL style={{marginTop:pTd(20)}}>Password error</TextL>
                </View>
            )
    }
    render() {
        const { enterAccount, modalVisible } = this.state;
        return (
            <View style={Gstyle.container}>
                {!enterAccount && <CommonHeader canBack title="LOGIN" rightElement={this.rightElement()} />}
                {
                    enterAccount ? (
                        this.enterPsw()
                    ) : (
                            this.RNCameraHTML()
                        )
                }
                <CommonModal
                    containerStyle={styles.containerStyle}
                    visible={modalVisible}
                    changeModalStatus={this.changeModalStatus.bind(this)}
                    content={this.modalContent()}
                />
            </View>
        )
    }
}

//连接redux
const AccountLogin = connect(MyAccountLogin);
export default AccountLogin;



const styles = StyleSheet.create({
    /* 二维码 */
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#817AFD',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 196,
        height: 2,
        backgroundColor: '#817AFD',
        borderRadius: 50
    },
    /* 密码输入框 */
    psw_wrap: {
        width: pTd(660),
        height: pTd(500),
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        ...Gstyle.radiusArg(pTd(20)),
        position: "relative",
    },
    icon_style: {
        position: "absolute",
        right: -pTd(2),
        top: -pTd(2),
    },
    inputStyle: {
        borderColor: "#666",
        borderWidth: pTd(1),
        ...Gstyle.marginArg(pTd(40), 0),
        ...Gstyle.paddingArg(pTd(4), pTd(10)),
        width: pTd(460)
    },
    btnStyle: {
        backgroundColor: "#817AFD",
        ...Gstyle.radiusArg(pTd(60)),
        width: pTd(400),

        marginTop: pTd(50)
    },
    containerStyle: {
        width: pTd(300),
        height: pTd(300),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal:0
    },
    tip: {
        width: pTd(300),
        height: pTd(300),
        ...Gstyle.radiusArg(pTd(10)),
        justifyContent: "center",
        alignItems: "center"
    },
    albumBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});