import React from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native"
import { ListItem } from 'react-native-elements'

import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";

/*
 * 安全中心
 **/
export default class SecurityCenter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            securityCenters: [
                // {
                //     name: "修改用户名",
                //     router: "changeUserName"
                // },
                {
                    name: "Change Transaction Password",
                    router: "ChangeTransactionPsw"
                },
                // {
                //     name: "修改登陆密码",
                //     router: "ChangeLoginPsw"
                // },
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
        const { securityCenters } = this.state
        return (
            <View style={Gstyle.container}>
                <CommonHeader canBack title="Security Center" />
                <ScrollView>
                    {
                        securityCenters.map((item, index) => {
                            return (
                                <ListItem
                                    onPress={() => this.goRouter(item.router)}
                                    title={item.name}
                                    key={index}
                                    chevron
                                    bottomDivider
                                />
                            )
                        })
                    }

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({});
