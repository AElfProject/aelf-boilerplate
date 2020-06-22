import React from "react"
import { StatusBar } from "react-native"
import NavigationMain from './Navigation'
//redux
import { Provider, connect } from "react-redux";

import { createStore } from "redux";
import aelf from "../reducers/aelf";

let store = createStore(aelf);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <StatusBar
                    translucent={true}
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <NavigationMain />
            </Provider>
        );
    }
}
