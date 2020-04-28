import React from "react"
import TipView from "./tip"

/**
 * 提示信息api
 */
React.Component.prototype.tipMsg = function(msg, time=2000) {
    TipView.show(msg);
    setTimeout(()=>{
        TipView.hide()
    }, time)
};
