import {
    ADD_TO_SHOPCART,
    REDUCE_TO_SHOPCART,

    CHANGE_SHOPITEM_CHECKSTATUS,
    CHANGE_SHOP_CHECKSTATUS
} from '../actions/todos'

const todos = (state = [], action) => {
    let { data, type } = action;
    switch (type) {
        case ADD_TO_SHOPCART:

            if (!(data.constructor.name == "Array")) {
                data.number = data.number || 1
            }

            var newState = JSON.parse(JSON.stringify(state));
            if (state.find(item => item.goodsId == data.goodsId)) {

                newState = newState.map(item => {
                    if (item.goodsId == data.goodsId) {
                        item.number += 1
                    }
                    return item
                })
            } else if (data.constructor.name == "Array") {

                newState = newState.concat(data)
            } else {
                newState.push(data)
            }

            return Object.assign([], state, newState);
        case REDUCE_TO_SHOPCART:
            data.number = data.number || 1
            var newState = JSON.parse(JSON.stringify(state));
            if (state.find(item => item.goodsId == data.goodsId)) {
                newState = newState.map(item => {
                    if (item.goodsId == data.goodsId) {
                        console.log(item)
                        item.number -= 1
                    }
                    return item
                })
            } else {
                newState.push(data)
            }
            return Object.assign([], state, newState);
        /* 单选和多选 */
        case CHANGE_SHOPITEM_CHECKSTATUS:
            // data.checked = data.checked === "undefined" || false;
            var newState = JSON.parse(JSON.stringify(state));
            if (state.find(item => item.goodsId == data.goodsId)) {
                newState = newState.map(item => {
                    if (item.goodsId == data.goodsId) {
                        item.checked = !item.checked
                    }
                    return item
                })
            } 
            return Object.assign([], state, newState);
        case CHANGE_SHOP_CHECKSTATUS:
            var newState = JSON.parse(JSON.stringify(state));
            newState = newState.map(item => {
                item.checked = data
                return item
            })
            return Object.assign([], state, newState);
        default:
            return state;
    }
};

export default todos;