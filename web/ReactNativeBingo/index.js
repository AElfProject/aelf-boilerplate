/**
 * @file index.js
 * @author zmh3788
 * @format
 */

import './shim';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
