
function getRuleDetail(rule) {
    switch(rule){
        case 0:
            return "大小单双";

        case 1:
            return "一星直选";
        case 10:
            return "二星直选";
        case 100:
            return "三星直选";
        case 1000:
            return "四星直选";
        case 10000:
            return "五星直选";

        case 11:
            return "组三包号";

        case 110:
            return "组六包号";

        case 111:
            return "组三和值";
        case 1110:
            return "组六和值";

        case 1111:
            return "二星组选";

        case 11111:
            return "二星直选和值";

        case 111111:
            return "五星通选";

        default:
            return "选个jb";
    }

}

//五星通选的
function getNameOfReward(reward){

    switch(reward){
        case 20440:
            return "一等奖";
        case 220:
            return "二等奖";
        case 40:
            return "三等奖";
        case 20:
            return "四等奖";

        default:
            return "JB奖";
    }
}

module.exports.getRuleDetail = getRuleDetail;
module.exports.getNameOfReward = getNameOfReward;