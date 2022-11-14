import React from "react";
import {

} from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../View/Cart";
import CheckOut from "../View/CheckOut";
const Stack = createNativeStackNavigator();
export default StackNativeCart = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown : false}}>
            <Stack.Screen name="Cart"
                        component={Cart}
                        options={{animation:'simple_push'}}/>
            <Stack.Screen name="CheckOut"
                        component={CheckOut}
                        options={{animation : 'slide_from_right'}}/>
        </Stack.Navigator>
    )
}