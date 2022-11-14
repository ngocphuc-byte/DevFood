/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import StackNativeLogin from './src/Navigation/StackNativeLogin';
import Order_Information from './src/View/Order_Infomation';
AppRegistry.registerComponent(appName, () => StackNativeLogin);
