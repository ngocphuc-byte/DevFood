import React from "react";
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { styles } from "../Style/Order_Information";
import Icon from 'react-native-vector-icons/Ionicons'
import { black, greenlight, orange, yellow } from "../Style/colors";
import { ScrollView } from "react-native-gesture-handler";
import { Caption, Paragraph } from "react-native-paper";
import { useEffect } from "react";
import { getFood, getCart, totalCart, totalQuantity } from "../API/Order_Inforamation";
import { useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { UpdateOrder } from "../../Redux/Actions/OrderAction";
import { deleteAll, getIdCart, insertCart } from "../API/History";
import { AddCart, RemoveAll } from "../../Redux/Actions/CartAction";
import { updateTotal } from "../API/Cart";

const Header = ({navigation}) => {
    return(
        <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Chi tiết đơn hàng</Text>
            <TouchableOpacity style={styles.buttonHeader}>
                <Icon name="arrow-back-outline" color={yellow} size={32} onPress={()=>navigation.goBack()} />
            </TouchableOpacity>
        </View>
    )
}
const ImageFood = ({item}) => {
    const [food, setFood] = useState([]);
    useEffect(()=>{
        getFood(item.id_Food, setFood);
    },[])
    return (
        <View style={{flexDirection : 'row'}}>
            <Image source={{uri : food.img}}
                                style={styles.image}
                                resizeMode='center'/>
            <View style={styles.containerTextFood}>
                <Text style={styles.textFood} numberOfLines={1}>{food.name}</Text>
            </View>
        </View>
    )
}
const renderFood = (item) => {
    return (
        <View style={styles.containerItem}>
            <View style={[styles.containerItem,{borderRightWidth : 1, borderColor : greenlight}]}>
                <ImageFood item={item}/>
                <View style={styles.containerTotal}>
                    <Text style={[styles.textFood,{width : 30}]}>x{item.quantity}</Text>
                    <Text style={[styles.textFood,{width : 100,textAlign : 'center'}]}>{item.price}.000 VNĐ</Text>
                </View>
            </View>
        </View>
    )
}
const Body = ({item, cart, setCart,idCart, onHandlerCart}) => {
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const Account = useSelector(state=>state.Login);
    const dispatch = useDispatch();
    let date = item.createdAt;
    useEffect(()=>{
        getCart(item.id_Cart, setCart)
        totalCart(item.id_Cart, setTotal)
        totalQuantity(item.id_Cart, setQuantity)
        console.log(item)
        // dispatch(UpdateOrder(item._id, false))
    },[])
    const onHandlerReOrder = () => {
        
        Alert.alert('Thành công','Món ăn đặt lại đã được thêm vào giỏ hàng !',[
            {
                text : 'OK',
                onPress: ()=>{
                    deleteAll(idCart);
                    dispatch(RemoveAll())
                    getCart(item.id_Cart, setCart);
                    onHandlerCart();
                }
            }
        ])
    }
    return(
        <View style={styles.containerBody}>
            <View style={styles.containerState}>
                <View style={styles.containerDot}>
                    {
                        item.order_Status == 'Đang chuẩn bị' || item.order_Status == 'Đợi duyệt' ?
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={[styles.dot,{color : orange, fontSize : 32}]}>◉</Text>
                            <Text style={[styles.textState,{fontWeight : 'bold', fontSize : 16, color : black}]}>Đã đặt</Text>
                        </View>
                        :
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={styles.dot}>◉</Text>
                            <Text style={styles.textState}>Đã đặt</Text>
                        </View>
                    }
                    <Text>--------------------</Text>
                    {  
                        item.order_Status == 'Món ăn đã có' ?
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={[styles.dot,{color : orange, fontSize : 32}]}>◉</Text>
                            <Text style={[styles.textState,{fontWeight : 'bold', fontSize : 16, color : black}]}>Đã lấy</Text>
                        </View>
                        :
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={styles.dot}>◉</Text>
                            <Text style={styles.textState}>Đã lấy</Text>
                        </View>
                    }
                    <Text>--------------------</Text>
                    {
                        item.order_Status == 'Hoàn tất' ?
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={[styles.dot,{color : orange, fontSize : 32}]}>◉</Text>
                            <Text style={[styles.textState,{fontWeight : 'bold', fontSize : 16, color : black}]}>Hoàn thành</Text>
                        </View>
                        :
                        <View style={{justifyContent : 'center', alignItems : 'center'}}>
                            <Text style={styles.dot}>◉</Text>
                            <Text style={styles.textState}>Hoàn thành</Text>
                        </View>
                    }
                </View>
            </View>
            <View style={styles.containerInformation}>
                <Text style={{fontSize : 17, fontWeight : 'bold', color :black}}>Đồ ăn:</Text>
                <Caption style={{fontSize : 15}}>{total}.000 VNĐ - {quantity} phần - {item.payment_Method}</Caption>
                <Caption style={{fontSize : 15}}>{Account.fullname} - {Account.phone}</Caption>
            </View>
            <View style={[styles.containerInformation,{borderBottomWidth : 1, borderColor : '#eee'}]}>
                <Text style={{fontSize : 17, fontWeight : 'bold', color:black}}>Phương thức nhận hàng</Text>
                <Caption style={{fontSize : 15}}>{item.receive_Method}</Caption>
                <Caption style={{fontSize : 15}}>Thời gian tạo đơn hàng: {date.slice(0,10)} {date.slice(11,19)}</Caption>
            </View>
            <View style={styles.containerContact}>
                <Text style={[styles.textState,{fontSize : 17, fontWeight :'bold', color :black}]}>Tình trạng: 
                    <Text style={{fontWeight : '300'}}> {item.order_Status}</Text>
                </Text>
            </View>
            <View style={styles.containerFood}>
                    <FlatList data={cart}
                            renderItem={({item})=>renderFood(item)}
                            keyExtractor = {(item, index)=>index}
                            horizontal={true}/>
            </View>
            <View style={styles.containerSumary}>
                <View style={styles.containerTextSumary}>
                    <Text style={styles.textTotal}>Tổng</Text>
                    <Text style={styles.textTotal}>{total}.000</Text>
                </View>
                <View style={styles.containerDetailTotal}>
                    {
                        item.receive_Method != 'Nhận tại cửa hàng' ?
                        <View style={styles.containerDetail}>
                            <Text style={styles.textDetail}>Phí giao hàng</Text>
                            <Text style={styles.textDetail}>30.000 VNĐ</Text>
                        </View> : null
                    }
                    {
                        item.id_DetailVoucher == 'undefined' ?
                        null :
                        <View style={styles.containerDetail}>
                            <Text style={styles.textDetail}>Voucher</Text>
                            <Text style={styles.textDetail}>-30.000 VNĐ</Text>
                        </View>
                    }
                    <Text style={styles.textTotalSumary}>{item.total}.000 VNĐ</Text>
                </View>
                <View style={styles.containerButtonReOrder}>
                    <TouchableOpacity onPress={onHandlerReOrder}>
                        <Text style={styles.textReOrder}>Đặt lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

const History_Information = ({route, navigation}) => {
    const {item} = route.params;
    const [cart, setCart] = useState([]);
    const [idCart, setIdCart] = useState();
    const Account = useSelector(state=>state.Login);
    const dispatch = useDispatch();
    useEffect(()=>{
        getIdCart(Account.idAccount, setIdCart)
    },[])
    const onHandlerCart = () => {
        cart.map(item=>dispatch(AddCart(item.id_Food, item.quantity, item.price)))
        cart.map(item=>insertCart(idCart, item.id_Food, item.quantity, item.price))
        updateTotal(Account.idAccount);
    }
    // useEffect(()=>{
    //     onHandlerCart();
    // },[cart])
    // console.log(item);
    return (
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Body item={item} cart = {cart} setCart={setCart} idCart={idCart} onHandlerCart={onHandlerCart}/>
        </View>
    )
}

export default History_Information;