import { Platform } from "react-native";
import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from './App';
import StaticWeb from "./src/components/StaticWeb";

if( Platform.OS !== 'web'){
    registerRootComponent(App);
} else {
    registerRootComponent(() => <StaticWeb/>);
}
