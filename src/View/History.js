import React, { useCallback, useEffect, useState } from 'react'
import {
    Alert,
    FlatList,
    Style,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Icon2 from 'react-native-vector-icons/Octicons'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
import { black, yellow } from '../Style/colors';
import { styles } from '../Style/History';
import { deleteAll, getCart, getIdCart, insertCart, onHandlerCheckCart } from '../API/History';
import {updateTotal} from '../API/Cart'
import { AddCart, RemoveAll } from '../../Redux/Actions/CartAction';
import { onHandlerAddPoint } from '../API/Point';
import { UpdatePoint } from '../../Redux/Actions/OrderAction';
import { UpdatePointAccount } from '../../Redux/Actions/AccountAction';
const Header = ({navigation}) => {
    const onHandlerBack = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={onHandlerBack}>
                <Icon name='arrow-down-circle' color={yellow} size={32}/>
            </TouchableOpacity>
            <Text style={styles.textHeader}>Lịch sử</Text>
        </View>
    )
}
const ButtonPoint = ({item, dispatch,Account})=> {
    const [statePoint, setStatePoint] = useState(true);
    const updatePoint = () => {
        let calculation = Math.round(item.total/10);
        onHandlerAddPoint(Account.idAccount, calculation, item._id);
        dispatch(UpdatePoint(item._id, false))
        dispatch(UpdatePointAccount(Account.idAccount, Account.point+calculation))
        setStatePoint(false)
    }
    useEffect(()=>{
        setStatePoint(item.point)
    },[])
    return(
        <View>
                {  
            statePoint == true ?
                    <TouchableOpacity style={styles.buttonReOrder} onPress={updatePoint}>
                        <Text style={styles.buttonReOrder.text}>Point</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.buttonReOrder,{backgroundColor : '#ccc'}]} onPress={UpdatePoint} disabled={true}>
                        <Text style={styles.buttonReOrder.text}>Point</Text>
                    </TouchableOpacity>
                }
        </View>
        
    )
}
const renderItem = (item, setCart, dispatch, idCart, navigation, Account, stateCart)=>{
    const date = item.createdAt;
    const onHandlerReOrder = () => {
        if(stateCart==true){
            Alert.alert('Thành công','Món ăn đặt lại đã được thêm vào giỏ hàng !',[
                {
                    text : 'OK',
                    onPress: ()=>{
                        deleteAll(idCart);
                        dispatch(RemoveAll())
                        getCart(item.id_Cart, setCart);
                    }
                }
            ])
        } else {
            Alert.alert('Thông báo','Vui lòng thêm bất kì sản phẩm vào giỏ hàng sau đó quay lại đặt hàng lại',[
                {
                    text : 'OK',
                }
            ])
        }
    }
    
    const onHandlerDetail = () => {
        navigation.navigate('History_Information',{item})
    }
    return(
        <View>
            {
                item.order_Status == 'Hoàn tất' ?

                <View style={styles.containerHistory}>
                    <Card mode='contained' onPress={onHandlerDetail}>
                        <View style={styles.containerTitleHistory}>
                            <Text style={[styles.textTitleHistory,{color : black, fontWeight :'bold'}]} numberOfLines={1}>Đồ ăn : #<Text style={styles.textTitleHistory}>{item.id_Cart}</Text></Text>
                            <Text>{date.slice(0,10)}</Text>
                        </View>
                            <View style={styles.containerInfoHistory}>
                                <View style={styles.containerLogo}>
                                    <Text style={styles.textLogo}>DEV</Text>
                                    <Text style={styles.textLogo}>FOOD</Text>
                                </View>
                                <View style={styles.containerInformation}>
                                    <View style={styles.containerTextInfo}>
                                        <Icon2 name='feed-star' color={yellow} size={18}/>
                                        <Text style={[styles.textInfo,{color : black}]}>Quán ăn DEV FOOD</Text>
                                    </View>
                                    <View style={styles.containerTextInfo}>
                                        <Icon3 name='money' color={yellow} size={18}/>
                                        <Text style={styles.textInfo}>{item.total}.000 VNĐ</Text>
                                    </View>
                                    <View style={styles.containerReOrder}>
                                        <Text>{item.order_Status}</Text>
                                        <ButtonPoint item={item} dispatch={dispatch} Account={Account}/>
                                        <TouchableOpacity style={styles.buttonReOrder} onPress={onHandlerReOrder}>
                                            <Text style={styles.buttonReOrder.text}>Đặt lại</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    </Card>
                </View>
        : null
            }
        </View>
    )
}
const Body = ({navigation}) => {
    const [order, setOrder] = useState([]);
    const [cart, setCart] = useState([]);
    const [idCart, setIdCart] = useState();
    const [stateCart, setStateCart] = useState(true);
    const Order = useSelector(state=>state.Order);
    const Account = useSelector(state=>state.Login);
    const dispatch = useDispatch();
    const getOrder =useCallback(()=>{
        setOrder(Order);
    },[])
    useEffect(()=>{
        getOrder()
        getIdCart(Account.idAccount, setIdCart)
        console.log(Account)
        console.log(Order)
        onHandlerCheckCart(Account.idAccount, setStateCart)
    },[])
    const onHandlerCart = () => {
            cart.map(item=>dispatch(AddCart(item.id_Food, item.quantity, item.price)))
            cart.map(item=>insertCart(idCart, item.id_Food, item.quantity, item.price))
            updateTotal(Account.idAccount);
    }
    useEffect(()=>{
        onHandlerCart();
    },[cart])
    return(
        <View style={styles.containerBody}>
            <View style={styles.containerItem}>
                <FlatList data={order}
                        renderItem={({item})=>renderItem(item, setCart, dispatch,idCart, navigation, Account, stateCart)}
                        keyExtractor={(item,index)=>index}/>
            </View>
        </View>
    )
}
const History = ({navigation}) => {
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Body navigation={navigation}/>
        </View>
    )
}
export default History;