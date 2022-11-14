import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Food from "../View/Food";
import Drink from "../View/Drink";
import SideDish from "../View/SideDish";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import { greenlight } from "../Style/colors";
import { useSelector } from "react-redux";
const topTab = createMaterialTopTabNavigator();
export default TopTabHome = () => {
    const account = useSelector(state=>state.Login.idAccount);
    return(
            <topTab.Navigator>
                <topTab.Screen name="Food"
                                component={Food}
                                options={{ tabBarShowLabel : false,
                                    tabBarIndicatorStyle : {backgroundColor :greenlight},
                                    tabBarIcon : ({focused})=>(
                                    <View>
                                        <Icon name="food-turkey" size={27} color={greenlight}/>
                                    </View>
                                )}}/>
                <topTab.Screen name="Drink"
                                component={Drink}
                                options={{ tabBarShowLabel : false,
                                    tabBarIndicatorStyle : {backgroundColor :greenlight},
                                    tabBarIcon : ({focused})=>(
                                    <View>
                                        <Icon2 name="drink" size={25} color={greenlight}/>
                                    </View>
                                )}}/>
                <topTab.Screen name="SideFood"
                                component={SideDish}
                                options={{ tabBarShowLabel : false,
                                    tabBarIndicatorStyle : {backgroundColor :greenlight},
                                    tabBarIcon : ({focused})=>(
                                        <Icon name="french-fries" color={greenlight} size={26}/>
                                )}}/>
            </topTab.Navigator>
    )
}