'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    FlatList,
    RefreshControl,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import BlankPage from "../../CommonPages/BlankPage/BlankPage";

export default class ListComponent extends Component {
    //renderItem
    static propTypes = {
        WhetherAutomatic: PropTypes.bool,         //是否自动加载更多，如果有吸顶则不能设置此属性为true
        UpPullRefresh: PropTypes.func,            //下拉刷新的回调
        data: PropTypes.array.isRequired,         //数据源数组
        onEndReachedThreshold: PropTypes.number,  //决定当距离内容最底部还有多远时触发onEndReached回调。默認0.3
        onEndReached: PropTypes.func,             //上拉刷新的回调,
        LoadCompleted: PropTypes.bool,            //是否已加载全部数据,隐藏尾部组件
        NoPositionTips: PropTypes.string,
        showFooter: PropTypes.bool,
        allLoadedTips: PropTypes.string,
    }
    static defaultProps = {
        data: [],
        onEndReachedThreshold: 0.3,
        WhetherAutomatic: false
    }
    constructor(props) {
        super(props);
        this.state = {
            bottomLoad: false,
            refreshing: false,
        }
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
    _onEndReached = (touch) => {
        if (touch === true || (this.canLoadMore && !this.props.LoadCompleted)) {
            this.setState({ bottomLoad: true }, () => {
                this.props.onEndReached && this.props.onEndReached()
                this.canLoadMore = false
            })
        }
    }
    _onRefresh = _ => {
        this.setState({ refreshing: true }, () => {
            this.props.UpPullRefresh && this.props.UpPullRefresh()
        })
    }
    //结束下拉刷新
    endUpPullRefresh = _ => {
        this.endRefresh && clearTimeout(this.endRefresh)
        this.endRefresh = setTimeout(() => {
            this.setState({ refreshing: false })
        }, 1000);
    }
    _ListFooterComponent = _ => {
        const { bottomLoad } = this.state
        const { LoadCompleted, allLoadedTips } = this.props
        if (LoadCompleted) {
            return (
                <View style={styles.FooterStyles}>
                    <Text>{allLoadedTips || '已加载全部'}</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this._onEndReached(true)}
                style={styles.FooterStyles}>
                {
                    bottomLoad ?
                        <ActivityIndicator size="large" color={'green'} />
                        : <Text>点击加载更多</Text>
                }
            </TouchableOpacity>
        )
    }
    listProps = {
        ...this.props.listProps,
        //提高性能
        windowSize: 50,
        maxToRenderPerBatch: 5,
        // removeClippedSubviews: false,
        // legacyImplementation: true
    }
    //结束底部刷新状态
    endBottomRefresh = _ => {
        this.setState({ bottomLoad: false })
    }
    _onMomentumScrollBegin = _ => {
        this.canLoadMore = true;
    }
    render() {
        const { data, UpPullRefresh, WhetherAutomatic, LoadCompleted, showFooter } = this.props
        const { refreshing } = this.state
        return (
            data && data.length ?
                <FlatList
                    {...this.props}
                    extraData={this.state.bottomLoad && LoadCompleted}
                    keyExtractor={(item, index) => index.toString()}       //不重复的key
                    ref={flatList => this._flatList = flatList}
                    onMomentumScrollBegin={this._onMomentumScrollBegin}
                    ListFooterComponent={!showFooter ? null : this._ListFooterComponent}
                    onEndReached={WhetherAutomatic ? this._onEndReached : null}
                    refreshControl={
                        UpPullRefresh != undefined
                            ? <RefreshControl
                                refreshing={refreshing}
                                colors={[Colors.primaryColor]}
                                tintColor={Colors.primaryColor}
                                onRefresh={this._onRefresh} />
                            : refreshing} />
                : <BlankPage />
        );
    }
}
const styles = StyleSheet.create({

});



