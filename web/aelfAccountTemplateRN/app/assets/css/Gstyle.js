import { StyleSheet } from 'react-native';
import pTd from '../../common/utils/unit';

global.Gstyle = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.bgColor
    },

    //-------- margin -----------
    marginArg: function(){
        var margin = {};
      
        switch (arguments.length) {
            case 1:
                margin = {
                    marginTop: arguments[0],
                    marginRight: arguments[0],
                    marginBottom: arguments[0],
                    marginLeft: arguments[0]
                };
                break;
            case 2:
                margin = {
                    marginVertical: arguments[0],
                    marginHorizontal: arguments[1]
                };
                break;
            case 3:
                margin = {
                    marginTop: arguments[0],
                    marginHorizontal: arguments[1],
                    marginBottom: arguments[2]
                };
                break;
            case 4:
                margin = {
                    marginTop: arguments[0],
                    marginRight: arguments[1],
                    marginBottom: arguments[2],
                    marginLeft: arguments[3]
                };
                break;
            default:
                break;
        }
        return margin;
    },
    //-------- padding -----------
    paddingArg: function(){
        var padding = {};
        switch (arguments.length) {
            case 1:
                padding = {
                    paddingTop: arguments[0],
                    paddingRight: arguments[0],
                    paddingBottom: arguments[0],
                    paddingLeft: arguments[0]
                };
                break;
            case 2:
                padding = {
                    paddingVertical: arguments[0],
                    paddingHorizontal: arguments[1]
                };
                break;
            case 3:
                padding = {
                    paddingTop: arguments[0],
                    paddingHorizontal: arguments[1],
                    paddingBottom: arguments[2]
                };
                break;
            case 4:
                padding = {
                    paddingTop: arguments[0],
                    paddingRight: arguments[1],
                    paddingBottom: arguments[2],
                    paddingLeft: arguments[3]
                };
                break;
            default:
                break;
        }
        return padding;
    },
    //-------- raduis -----------
    radiusArg: function(){
        var borderRaduis = {};
        switch (arguments.length) {
            case 1:
                borderRaduis = {
                    borderTopLeftRadius: arguments[0],
                    borderTopRightRadius: arguments[0],
                    borderBottomRightRadius: arguments[0],
                    borderBottomLeftRadius: arguments[0]
                };
                break;
            case 2:
                borderRaduis = {
                    borderTopLeftRadius: arguments[0],
                    borderTopRightRadius: arguments[1],
                  
                };
                break;
            case 4:
                borderRaduis = {
                    borderTopLeftRadius: arguments[0],
                    borderTopRightRadius: arguments[1],
                    borderBottomRightRadius: arguments[2],
                    borderBottomLeftRadius: arguments[3]
                };
                break;
            default:
                break;
        }
        return borderRaduis;
    },
    //-------- BORDER -----------
    borderArg:function(types){
        switch (types) {
            case "bottom":
                return {
                    borderBottomColor:Colors.borderColor,
                    borderBottomWidth:pTd(1)
                }
            case "top":
                return {
                    borderTopColor:Colors.borderColor,
                    borderTopWidth:pTd(1)
                }
            case "right":
                return {
                    borderRightColor:Colors.borderColor,
                    bordeRightWidth:pTd(1)
                }
            default:
                return {
                    borderColor:Colors.borderColor,
                    borderWidth:pTd(1)
                }
        }
    },
    //图标
    left_ico: {
        width: pTd(24),
        height: pTd(36)
    },
    
    //布局
    frc: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    frcc:{
        flexDirection: "row", alignItems: "center", justifyContent: "center"
    },
         
})