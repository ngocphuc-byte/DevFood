import React from "react";
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Account from "../View/Account";
import AccountSystem from "../View/AccountSystem";
import Login from "../View/Login";
import LoyalCustomer from "../View/LoyalCustomer";
import Order_Information from "../View/Order_Infomation";
const Stack = createNativeStackNavigator();
export default StackNativeAccount = ()=>{
    return (
        <Stack.Navigator screenOptions={{
            headerShown : false,
            animation : 'slide_from_bottom',
            animationDuration : 5000,
            }}>
            <Stack.Screen name="Account"
                        component={Account}/>
        </Stack.Navigator>
    )
}