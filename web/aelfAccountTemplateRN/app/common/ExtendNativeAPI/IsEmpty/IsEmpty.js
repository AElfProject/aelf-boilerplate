import React from "react";

/* 
 空对象判断
*/
React.Component.prototype.isEmpty = function(v) {
    switch (typeof v) {
        case "undefined":
            return true;
        case "string":
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
                return true;
            break;
        case "boolean":
            if (!v) return true;
            break;
        case "object":
            if (null === v || v.length === 0) return true;
            for (var i in v) {
                return false;
            }
            return true;
    }
    return false;
};
