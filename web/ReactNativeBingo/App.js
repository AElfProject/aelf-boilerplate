/**
 * @file App.js
 * @author zmh3788
 */

import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';

import Home from './app/js/Home/Home';
import Bingo from './app/js/Bingo/Bingo';

export default class App extends Component {
    render() {
        return (
            <Router>
                  <Scene key='root'>
                      <Scene
                          key='Bingo'
                          title='Bingo'
                          component={Home}
                          initial
                      />
                      <Scene
                          key='PalyGame'
                          title='Paly Game'
                          component={Bingo}
                      />
                  </Scene>
            </Router>
        );
    }
}
