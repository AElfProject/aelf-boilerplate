'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    FlatList,
    RefreshControl,
    Dimensions,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import BlankPage from "../../CommonPages/BlankPage/BlankPage";
const height = Dimensions.get('screen').height

export default class ListComponent extends Component {
    //renderItem
    static propTypes = {
        whetherAutomatic: PropTypes.bool,         //Whether to automatically load more, if there is a ceiling, you can not set this property to true
        upPullRefresh: PropTypes.func,            //Pull-down refresh callback
        data: PropTypes.array.isRequired,         //Data source array
        onEndReachedThreshold: PropTypes.number,  //Determines how far away the onEndReached callback is when it is far from the bottom of the content. default0.3
        onEndReached: PropTypes.func,             //Pull-refresh callback,
        loadCompleted: PropTypes.bool,            //Whether all data has been loaded and the tail component is hidden
        noPositionTips: PropTypes.string,
        showFooter: PropTypes.bool,
        allLoadedTips: PropTypes.string,
    }
    static defaultProps = {
        data: [],
        onEndReachedThreshold: 0.3,
        whetherAutomatic: false
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
    onEndReached = (touch) => {
        if (touch === true || (this.canLoadMore && !this.props.loadCompleted)) {
            this.setState({ bottomLoad: true }, () => {
                this.props.onEndReached && this.props.onEndReached()
                this.canLoadMore = false
            })
        }
    }
    onRefresh = _ => {
        this.setState({ refreshing: true }, () => {
            this.props.upPullRefresh && this.props.upPullRefresh()
        })
    }
    //End pull-down refresh
    endUpPullRefresh = _ => {
        this.endRefresh && clearTimeout(this.endRefresh)
        this.setState({ refreshing: false })
    }
    ListFooterComponent = _ => {
        const { bottomLoad } = this.state
        const { loadCompleted, allLoadedTips } = this.props
        if (loadCompleted) {
            return (
                <View style={styles.FooterStyles}>
                    <Text>{allLoadedTips || 'All loaded'}</Text>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this.onEndReached(true)}
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
    onMomentumScrollBegin = _ => {
        this.canLoadMore = true;
    }
    render() {
        const { data, upPullRefresh, whetherAutomatic, loadCompleted, showFooter } = this.props
        const { refreshing } = this.state
        return (
            data && data.length ?
                <FlatList
                    {...this.listProps}
                    {...this.props}
                    extraData={this.state.bottomLoad && loadCompleted}
                    keyExtractor={(item, index) => index.toString()}       //Unique key
                    ref={flatList => this._flatList = flatList}
                    onMomentumScrollBegin={this.onMomentumScrollBegin}
                    ListFooterComponent={!showFooter ? null : this.ListFooterComponent}
                    onEndReached={whetherAutomatic ? this.onEndReached : null}
                    refreshControl={
                        upPullRefresh != undefined
                            ? <RefreshControl
                                refreshing={refreshing}
                                colors={[Colors.primaryColor]}
                                tintColor={Colors.primaryColor}
                                onRefresh={this.onRefresh} />
                            : refreshing} />
                :
                <ScrollView
                    refreshControl={
                        upPullRefresh != undefined
                            ? <RefreshControl
                                refreshing={refreshing}
                                colors={[Colors.primaryColor]}
                                tintColor={Colors.primaryColor}
                                onRefresh={this.onRefresh} />
                            : refreshing}>
                    <View style={{ marginTop: 200, alignItems: 'center' }}>
                        <BlankPage />
                    </View>

                </ScrollView>
        );
    }
}



