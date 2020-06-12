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
        WhetherAutomatic: PropTypes.bool,         //Whether to automatically load more, if there is a ceiling, you can not set this property to true
        UpPullRefresh: PropTypes.func,            //Pull-down refresh callback
        data: PropTypes.array.isRequired,         //Data source array
        onEndReachedThreshold: PropTypes.number,  //Determines how far away the onEndReached callback is when it is far from the bottom of the content. default0.3
        onEndReached: PropTypes.func,             //Pull-refresh callback,
        LoadCompleted: PropTypes.bool,            //Whether all data has been loaded and the tail component is hidden
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
    //End pull-down refresh
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
                    <Text>{allLoadedTips || 'All loaded'}</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this._onEndReached(true)}
                style={styles.FooterStyles}>
                {
                    bottomLoad ?
                        <ActivityIndicator size="large" color={'green'} />
                        : <Text>Click to load more</Text>
                }
            </TouchableOpacity>
        )
    }
    listProps = {
        ...this.props.listProps,
        //Improve performance
        windowSize: 50,
        maxToRenderPerBatch: 5,
        // removeClippedSubviews: false,
        // legacyImplementation: true
    }
    //End the bottom refresh state
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
                    keyExtractor={(item, index) => index.toString()}       //Unique key
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



