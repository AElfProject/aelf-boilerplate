import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native"
import { ListItem } from 'react-native-elements'
import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";
import { TextM, TextL } from "../../../common/UI_Component/CommonText";

/*
 * 关于我们
 **/

class AboutUs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLastVersion: false,
            aboutUs: [
                {
                    name: "Version Update",
                    router: "down"
                },
                {
                    name: "Update Logs",
                    router: "down"
                }
            ]
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
        let params = this.props.navigation.getParam("params");


    }
    goRouter(router, params) {
        navigationService.navigate(router, {
            params
        })
    }
    render() {
        const { isLastVersion, aboutUs } = this.state;
        return (
            <View style={Gstyle.container}>
                <CommonHeader canBack title="About" />
                <ScrollView>
                    <View style={{ justifyContent: "center", alignItems: "center", ...Gstyle.marginArg(pTd(160), 0) }}>
                        <Image resizeMode={"stretch"} style={{ width: pTd(180), height: pTd(180) }} source={require("../../../assets/images/home/aelf_blue.jpg")} />
                        <TextL style={{ fontWeight: '500', fontSize: pTd(38), marginTop: pTd(20), }}>aelf</TextL>
                    </View>
                    <View >
                        {
                            isLastVersion ? <TextM style={{ textAlign: "center", marginTop: pTd(80) }}>Newest Version</TextM> : (
                                aboutUs.map(item => {
                                    return (
                                        <ListItem
                                            title={item.name}
                                            bottomDivider
                                            chevron
                                        />
                                    )
                                })
                            )
                        }
                    </View>
                </ScrollView>

            </View>
        )
    }
}

export default AboutUs

const styles = StyleSheet.create({})
