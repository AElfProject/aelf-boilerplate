/**
 * React-navigation 路由任意跳转封装
 */
import { NavigationActions, StackActions } from 'react-navigation';

let _navigator;
let _routers;
let _navigation;

/**
 * 设置顶层路由导航
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}


/**
 * 跳转到指定页面
 * @param routeName
 * @param params
 */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NavigationActions.NAVIGATE,
            routeName,
            params,
        })
    );
}

/**
 * 返回到顶层
 */
function popToTop() {
    _navigator.dispatch(NavigationActions.popToTop())
}

/**
 * 返回第n个页面
 * @param n
 */
function popToN(n) {
    if (n <= 0) {
        return;
    }
    let len = _routers.length;
    if (len < n || n === len - 1) {
        this.popToTop();
        return;
    }
    _navigation.goBack(_routers[len - n].key);

}

/**
 * 返回
 */
function goBack() {
    _navigator.dispatch(NavigationActions.back({ type: NavigationActions.BACK }));
}

/**
 * 把路由重置到首页
 */
function reset(routeName) {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routeName })]
    });
    _navigator.dispatch(resetAction);
}

function push(routeName, params) {
    const pushAction = StackActions.push({
        routeName,
        params
    });
    _navigator.dispatch(pushAction);
}


export default {
    setTopLevelNavigator,
    navigate,
    goBack,
    popToTop,
    reset,
    push
};
