import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import LinearGradient from 'react-native-linear-gradient';
import Cart from '../View/Cart';
const tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'; 
import Icon3 from 'react-native-vector-icons/MaterialIcons'; 
import Notification from "../View/Notification";
import Voucher from "../View/Voucher";
import { greenlight, white, yellow } from "../Style/colors";
import TopTabHome from "./TopTabHome";
import StackNativeAccount from "./StackNativeAccount";
import { useSelector, useDispatch } from "react-redux";
import { AddCart } from "../../Redux/Actions/CartAction";
import StackNativeCart from "./StackNativeCart";
import { getOrder } from "../API/Order";
const BottomTabHome = ({navigation}) => {
    const cart = useSelector(state=>state.Cart);
    const order = useSelector(state=>state.Order);
    let count = order.filter(item=>count = item.state==true)
    useEffect(()=>{
        // console.log(cart);
        // getOrder(Account.idAccount, dispatch, AddOrder);
    },[])
    return (
        
        <tab.Navigator screenOptions={{
            tabBarShowLabel : false,
            headerShown : false,
            tabBarStyle :{
                position : 'absolute',
                bottom : 10,
                right : 20,
                left : 20,
                borderRadius : 15,
                elevation : 0,
                height : 70,
                backgroundColor : greenlight,
                ...styles.shadow,
            }
            }}>
            <tab.Screen name="FoodTab"
                        component={TopTabHome} 
                        options={{
                            // tabBarIconStyle : 'none',
                            tabBarIcon:({focused, color, size}) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('FoodTab')}
                                                    onLongPress={()=>navigation.navigate('FoodTab')}>
                                    {
                                        focused ?
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon2 name="food-fork-drink" size={24} color={yellow}/>
                                            <Text style={[styles.text, {color : yellow}]}>Trang chủ</Text>
                                        </View>
                                        :
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon2 name="food-fork-drink" size={22} color={white}/>
                                            <Text style={[styles.text,{fontSize:13}]}>Trang chủ</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )
                        }}/>
            <tab.Screen name="Voucher"
                        component={Voucher}
                        options={{
                            tabBarIcon :({focused}) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('Voucher')}
                                                onLongPress={()=>navigation.navigate('Voucher')}>
                                    {
                                        focused ?
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon2 name="ticket-percent" size={24} color={yellow}/>
                                            <Text style={[styles.text, {color : yellow}]}>Voucher</Text>
                                        </View>
                                        :
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon2 name="ticket-percent" size={22} color={white}/>
                                            <Text style={[styles.text,{fontSize : 13}]}>Voucher</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )
                        }}/>
            <tab.Screen name="StackCart"
                        
                        component={StackNativeCart}
                        options={{ tabBarStyle:{display: 'none'},
                            tabBarBadge : cart.length,
                            tabBarIcon :({focused}) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('StackCart')}
                                            onLongPress={()=>navigation.navigate('Cart')}>
                                    <LinearGradient colors={['#1c6758','#1c6758','#1c6758']} style={styles.buttonCart}>
                                        {
                                            focused ?
                                            <View style={{alignItems :'center', justifyContent :'center'}}>
                                                <Icon name="shopping-cart" size={24} color={yellow}/>
                                                {/* <Text style={[styles.text, {color : '#F57328'}]}>Giỏ hàng</Text> */}
                                            </View>
                                            :
                                            <View style={{alignItems :'center', justifyContent :'center'}}>
                                                <Icon name="shopping-cart" size={22} color={white}/>
                                                {/* <Text style={[styles.text,{fontSize:14}]}>Giỏ hàng</Text> */}
                                            </View>
                                        }
                                    </LinearGradient>
                                </TouchableOpacity>
                            )
                        }}/>
            <tab.Screen name="Notification"
                        component={Notification}
                        options={{tabBarBadge : count.length,
                            tabBarIcon :({focused}) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('Notification')}
                                                    onLongPress={()=>navigation.navigate('Notification')}>
                                    {
                                        focused ?
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon3 name="notifications-active" size={24} color={yellow}/>
                                            <Text style={[styles.text, {color : yellow}]}>Thông báo</Text>
                                        </View>
                                        :
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon3 name="notifications-none" size={22} color={white}/>
                                            <Text style={[styles.text,{fontSize : 13}]}>Thông báo</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )
                        }}/>
            <tab.Screen name="StackAccount"
                        component={StackNativeAccount}
                        options={{
                            tabBarIcon :({focused}) => (
                                <TouchableOpacity onPress={()=>navigation.navigate('StackAccount')}
                                                    onLongPress={()=>navigation.navigate('StackAccount')}>
                                    {
                                        focused ?
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon name="user-alt" size={24} color={yellow}/>
                                            <Text style={[styles.text, {color : yellow}]}>Thông tin</Text>
                                        </View>
                                        :
                                        <View style={{alignItems :'center', justifyContent :'center'}}>
                                            <Icon name="user-alt" size={22} color={white}/>
                                            <Text style={[styles.text,{fontSize : 13}]}>Thông tin</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            )
                        }}/>
        </tab.Navigator>

    )
}
const styles = StyleSheet.create({
    shadow : {
        shadowColor : '#0e483d',
        shadowOffset : {
            width : 0,
            height : 20,
        },
        shadowOpacity : 1,
        shadowRadius : 3.5,
        elevation : 5,
    },
    text :{
        color : white,
        fontSize : 15,
        fontFamily : 'NunitoSans-Regular'
    },
    buttonCart : {
        bottom : 35,
        borderRadius : 100,
        height : 80,
        width : 80,
        alignItems : 'center',
        justifyContent : 'center',
    }
})
export default BottomTabHome;