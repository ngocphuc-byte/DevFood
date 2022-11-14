import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Card } from "react-native-paper";
import {styles} from '../Style/Account'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from "react-redux";
import FastImage from "react-native-fast-image";
import LoyalCustomer from "./LoyalCustomer";
import { RemoveAll } from "../../Redux/Actions/CartAction";
import { yellow } from "../Style/colors";
import { RemoveOrder } from "../../Redux/Actions/OrderAction";
const Header = ({navigation}) => {
    return (
        <View style={styles.containerHeader}>
            <Text style={[styles.text,{fontFamily : 'Righteous', color:yellow}]}>
                Profile
            </Text>
        </View>
    )
}
const Body =({navigation}) =>{
    const account = useSelector(state=>state.Login)
    const dispatch = useDispatch();
    const Item = ({value, onPress}) => {
        return(
            <Card style={[styles.containerInfor,{paddingLeft :20, paddingRight :3}]} onPress={onPress}>
                <View style={styles.containerInfor}>
                    <Text style={[styles.textPoint,{color : '#000'}]}>{value}</Text>
                    <Icon name="arrow-right" color='#000' size={16}/>
                </View>
            </Card>
        )
    }
    const onHandlerAccountSystem =() => {
        navigation.navigate('AccountSystem')
    }
    const onHandlerSignOut = () => {
        navigation.navigate('Login');
        dispatch(RemoveAll())
        dispatch(RemoveOrder())
    }
    const onHandlerLoyalCustomer = () => {
        navigation.navigate('LoyalCustomer');
    }
    const onHandlerHistory = () => {
        navigation.navigate('History');
    }
    return (
        <View style={styles.containerBody}>
            <View style={styles.body}>
                <View style={styles.containerAvatar}>
                    <FastImage style={styles.avatar}
                            source={{
                                uri : account.avatar,
                                priority: FastImage.priority.high,
                                }}/>
                    <Text style={[styles.text,{color : '#000', fontSize : 22}]}>
                        {account.fullname}
                    </Text>
                </View>
                <View style={styles.containerPoint}>
                    <View style={styles.point}>
                        <Text style={styles.textPoint}>Point: 4</Text>
                    </View>
                    <View style={styles.favorite}>
                        <Text style={styles.textPoint}>Yêu thích: 10</Text>
                    </View>
                </View>
                <View style={styles.containerComponent}>
                    <Item value='Thiết lập tài khoản' onPress={onHandlerAccountSystem}/>
                    <View style={{height : 15}}></View>

                    <Item value='Khách hàng thân thiết' onPress={onHandlerLoyalCustomer}/>
                    <View style={{height : 15}} ></View>
                    
                    <Item value='Lịch sử' onPress={onHandlerHistory}/>
                    <View style={{height : 15}} ></View>

                    <Item value='Đăng xuất' onPress={onHandlerSignOut}/>
                    
                </View>
            </View>
        </View>
    )
}
const Account = ({navigation}) => {
    return (
        <View style={styles.container}>
                <Header navigation={navigation}/>
                <Body navigation={navigation}/>
        </View>
    )
}
export default Account;