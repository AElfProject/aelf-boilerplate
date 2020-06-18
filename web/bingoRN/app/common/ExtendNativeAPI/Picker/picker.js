import React, {Component} from "react"
import Picker from "react-native-picker";
import MaskView from "./MaskView"
import area from "./area";

/* 
   picker 选择器

   data：         array 可选数据 
   selectedValue: array 默认选项
   callback:      function 
   type:          string 选项的key
*/
React.Component.prototype.pickerInit = function(data, selectedValue, callback, type) {
    if(data.length == 0){
        alert("暂时没有可选项")
        return 
    }
    
    Picker.init({
        pickerData: data,
        selectedValue: selectedValue,
        pickerTitleText: "",
        pickerConfirmBtnText: "确定",
        pickerCancelBtnText: "取消",
        pickerConfirmBtnColor: [0, 0, 0, 1],
        pickerCancelBtnColor: [0, 0, 0, 1],
        pickerTitleColor: [255, 255, 255, 1],
        pickerToolBarBg: [233, 233, 233, 1],
        pickerBg: [255, 255, 255, 1],
        //确定
        onPickerConfirm: (pickedValue, pickedIndex) => {
            callback(type, pickedValue);
            MaskView.hide()
        },
        //取消
        onPickerCancel: data => {
            Picker.hide();
            MaskView.hide()
        },
        //选择
        onPickerSelect: data => {}
    });
    //遮罩显示
    MaskView.show(Picker.hide)
    //下拉选项显示
    Picker.show();
};

/* 
  创建可选年月日
  params: year-> 到多少年
  isDay:是否显示天 默认显示
*/
React.Component.prototype.createYMD = function(year=(new Date().getFullYear()), isDay = true) {
    let date = [];
    for (let i = 1970; i <= year; i++) {
        let month = [];
        for (let j = 1; j < 13; j++) {
            if(isDay){
                let day = [];
                if (j === 2) {
                    for (let k = 1; k < 29; k++) {
                        day.push(k);
                    }
                    if (i % 4 === 0) {
                        day.push(29);
                    }
                } else if (j in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let k = 1; k < 32; k++) {
                        day.push(k);
                    }
                } else {
                    for (let k = 1; k < 31; k++) {
                        day.push(k);
                    }
                }
                let _month = {};
                _month[j] = day;
                month.push(_month);
            }
            else {
                month.push(j);
            }
           
        }
        let _date = {};
        _date[i] = month;
        date.push(_date);
    }
   // console.log(date)
    return date;
};
/* 
  城市的选择
  param: 类型是number， 可传参2：二级联动； 3：三级联动
*/
React.Component.prototype.createAreaData = function(num=3) {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
        let city = [];
        for (let j = 0, cityLen = area[i]["city"].length; j < cityLen; j++) {
            let _city = {};
           
            _city[area[i]["city"][j]["name"]] = area[i]["city"][j]["area"];
            //默认三级
            if(num === 3){
                city.push(_city);
            }
            //二级
            else if(num===2){
                city.push(area[i]["city"][j].name);
            }
            
        }

        let _data = {};
        _data[area[i]["name"]] = city;
        data.push(_data);
    }
  
    return data;
};

/* 
  期望薪金列表
  maxSalary:最高的薪资
*/
React.Component.prototype.getSalary = function(maxSalary = 20) {
    
        let minList = [],
            minS = 0,
            salaryList = [],
            data = [];
        for (let i = 0, len = maxSalary; i < len; i++) {
            minS += 1;
            minList.push(minS);
            //加以上
            if (i == len - 1) {
                minList.push(`${minS}以上`);
                minList.push(`面议`);
            }
        }

        minList.map(item => {
            let maxList = [],
                maxS = item,
                maxSUse = item;
            _data = {};
            let numRe = /^\d+$/;
            if (!numRe.test(item)) {
                _data[item] = [""];
                return data.push(_data);
            }
            for (let i = 0, l = 5; i < l; i++) {
                maxS += 1;
                maxSUse = maxS;
                maxList.push(maxSUse + "k");
            }
            _data[item + "k"] = maxList;
            data.push(_data);
        });
        return data;
    
};
