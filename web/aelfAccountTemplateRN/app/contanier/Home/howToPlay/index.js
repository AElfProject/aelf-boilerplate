import React from "react"
            import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from  "react-native"

import navigationService from "../../../common/utils/navigationService";
import CommonHeader from "../../../common/Components/CommonHeader/CommonHeader";

import pTd from "../../../common/utils/unit";

        /*
         * 玩法
         **/

class HowToPlay extends React.Component {
           constructor(props){
               super(props)
           }
           componentDidMount(){
               this.requestOrder()
           }
           requestOrder() {
              Promise.resolve().then(res=>{
                  return this.getFirstRequest();
              })
           }
           async getFirstRequest() {
                let params = this.props.navigation.getParam("params");


           }
            goRouter(router, params){
                navigationService.navigate(router, {
                    params
                })
            }
           render(){
               return (
                   <View style={Gstyle.container}>
                      <CommonHeader canBack title="Help" />
                      <Text>Help Center</Text>
                   </View>
               )
           }
       }

      export default HowToPlay

const styles = StyleSheet.create({})
