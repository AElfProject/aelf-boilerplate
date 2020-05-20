import React, { Component } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import BlankPage from "../../CommonPages/BlankPage/BlankPage";
import pTd from "../../utils/unit"

export default class CommonFlatList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: props.tabIndex,  //tab切换时是不是每次都请求

            listData: props.listData || [],
            method: props.method || "GET",
            loadingRefreshing: false,
            extraParams: props.extraParams || {},
            pageNumber: 0,
            totalPages: 10,
            showFoot: 0, // 加载的页脚

           
        };

        //在ScrollableTabView 中从第二个tab开始react会走一遍componentDidMount同时还会走一遍componentWillReceiveProps
        this.isFirstLoad = true;


    }
    componentDidMount() {
        //console.log(",,,mmmm")
        this._requestFirstPage();
    }
    componentWillReceiveProps(prevProps, prevState) {

        // //ScrollableTabView 切换至当前tab请求 
        if (this.isFirstLoad) {
            this.setState({
                extraParams: prevProps.extraParams
            }, () => {
                this._requestFirstPage();
                this.isFirstLoad = false;
            })
        }
        

    }

    /**
     * 首页数据
     */
    _requestFirstPage() {
        const { pageNumber, method } = this.state;
        let params = {
            page : 0,
            limit: 10
        };
        //console.log('first');
        this.getData(params, method, (res,totalPages) => {
            this.setState({
                totalPages: parseInt(parseInt(totalPages?totalPages:res[0].period / 10) ) , //待确认
                listData: res,
                loadingRefreshing: false
            });
            
        });
    }
    /**
     * next page
     *
     */
    async _requestNextPage() {
        const { pageNumber, method, listData } = this.state;
        let params = {
            page : pageNumber,
            limit: 10
        };
        
        //console.log('first2');
        this.getData(params, method, (res,totalPages) => {
            //console.log(res, "res")
            this.setState({
                //totalPages: parseInt(res[0].period)/10, //待确认
                listData: pageNumber==0? res : listData.concat(res),
                loadingRefreshing: false
            });
        });
    }
    /**
     * 获取数据
     */
    getData(params, method, successCallback) {
        const { requestFunc } = this.props;
        //const { extraParams } = this.state;
        const extraParams = this.props.extraParams;
        
        
        requestFunc && requestFunc({ ...params, ...extraParams }).then((res) => {
            successCallback(res.data, res.totalPages);
        });
    }
    /**
     * list 头部
     */
    _renderHeader() {
        const { renderHeader } = this.props;
        if (this.isEmpty(renderHeader)) {
            return null;
        }
        return renderHeader();
    }
    /**
     * list item
     */
    _renderCommonListItemView(item, index) {
        if (this.props.renderItem) {
            return this.props.renderItem(item, index);
        }
        return <Text>{index}</Text>;
    }
    /**
     * item 分割线
     */
    _renderItemDivider() {
        const { isItemSeparatorShow } = this.props;
        if (!isItemSeparatorShow) return null;
        return <Divider bgColor="#efefef" height={10} />;
    }
    /**
     * 上拉页脚显示
     */
    _renderFooter() {
        const { showFoot } = this.state;
        switch (showFoot) {
            case 1:
                return (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: pTd(20)
                        }}
                    >
                        <Text style={{ fontSize: pTd(24), color: "#666" }}>
                            ---我已经到底了哦---
                        </Text>
                    </View>
                );
            case 2:
                return (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginVertical: pTd(20)
                        }}
                    >
                        <ActivityIndicator />
                        <Text style={{ fontSize: pTd(24), color: "#666" }}>
                            正在加载更多数据...
                        </Text>
                    </View>
                );
            case 0:
                return null
        }
    }
    /**
     * 上拉刷新
     */
    async _onEndReached() {
        let { showFoot, totalPages, pageNumber } = this.state;
        //console.log('上拉了！！',pageNumber)
        if (pageNumber >= totalPages) {
            this.setState({ showFoot: 1 });
            return;
        } else{
            await this._requestNextPage()
            .then(res=>{
                this.setState(
                    prevState => ({
                        pageNumber: prevState.pageNumber + 1,
                        showFoot: 2
                    })
                );
            });
            // this.setState(
            //     prevState => ({
            //         pageNumber: prevState.pageNumber + 1,
            //         showFoot: 2
            //     }),
            //     () => {
            //         this._requestNextPage();
            //     }
            // );
        }
    }
    /**
     * 下拉
     */
    _onRefreshToRequestFirstPageData() {
        this.setState(
            {
                loadingRefreshing: true,
                pageNumber : 0
            },
            () => {
                this._requestFirstPage()
            }
        )
    }
    /* 滚动到顶部 */
    toTop() {
        
        this.scrollview && this.scrollview.scrollToIndex({ animated: true, index: 0, viewPosition: 0 });
    }
    _renderFlatList() {
        const { listData, loadingRefreshing } = this.state;

        return (
            <FlatList
                data={listData}
                keyExtractor={(item, index) => item.id || `${index}key`}
                ListHeaderComponent={() => this._renderHeader()}
                renderItem={({ item, index }) =>
                    this._renderCommonListItemView(item, index)
                }
                ref={(r) => this.scrollview = r}
                onEndReachedThreshold={0.8} //距离底部多少时触发
                ItemSeparatorComponent={() => this._renderItemDivider()}
                ListFooterComponent={this._renderFooter.bind(this)}
                //上拉
                onEndReached={this._onEndReached.bind(this)} //
                //下拉 内置下拉动画， 需要其他的要手动配置
                refreshing={loadingRefreshing}
                onRefresh={this._onRefreshToRequestFirstPageData.bind(this)}
            />
        );
    }
    render() {
        const { containStyle } = this.props;
        const { listData } = this.state;

        return (
            <View style={[{ flex: 1, position: "relative" }, containStyle]}>
                {this.isEmpty(listData) ? (
                    <BlankPage />
                ) : (
                        this._renderFlatList()
                    )}
            </View>
        );
    }
}
