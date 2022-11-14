import React from "react";
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../View/Login";
import { Provider } from "react-redux";
import { store } from "../../Redux/Store/Store";
import BottomTabHome from "./BottomTabHome";
import Order_Information from "../View/Order_Infomation";
import Account from "../View/Account";
import AccountSystem from "../View/AccountSystem";
import LoyalCustomer from "../View/LoyalCustomer";
import History from "../View/History";
import History_Information from "../View/History_Information";
const Stack = createNativeStackNavigator();
export default StackNativeLogin = () => {
    return(
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown : false, animation : 'slide_from_bottom', animationDuration : 15000}}>
                    <Stack.Screen name="Login"
                                    component={Login} />
                                    
                    <Stack.Screen name="BottomTab"
                                    component={BottomTabHome}/>
                    <Stack.Screen name="Order_Information"
                            component={Order_Information}/>
                    <Stack.Screen name="Account"
                        component={Account}/>
                    <Stack.Screen name="AccountSystem"
                                component={AccountSystem}/>
                    <Stack.Screen name = 'LoyalCustomer'
                                component={LoyalCustomer}/>
                    <Stack.Screen name="History" 
                                component={History}/>
                    <Stack.Screen name="History_Information"
                                component={History_Information}/>
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}