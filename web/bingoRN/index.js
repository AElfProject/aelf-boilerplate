/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import "./app/assets/css/theme"
import "./app/assets/css/Gstyle"
import "./app/common/ExtendNativeAPI/index"
import './app/common/utils/console'
import App from './app/contanier/root';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
