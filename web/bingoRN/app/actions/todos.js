//ADD_TO_SHOPCART
export const ADD_TO_SHOPCART = 'ADD_TO_SHOPCART';
export const REDUCE_TO_SHOPCART = 'REDUCE_TO_SHOPCART';

export const CHANGE_SHOPITEM_CHECKSTATUS = 'CHANGE_SHOPITEM_CHECKSTATUS';
export const CHANGE_SHOP_CHECKSTATUS = 'CHANGE_SHOP_CHECKSTATUS';

export const todos = (json) => ({
    type: ADD_TO_SHOPCART,
    data: json
});
 