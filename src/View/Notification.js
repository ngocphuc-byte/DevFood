import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
} from 'react-native';
import { styles } from "../Style/Notification";
import {Card, Paragraph} from 'react-native-paper';
import { getNotification, onHandlerGetNews, updateState } from "../API/Notification";
import { useDispatch, useSelector } from "react-redux";
import { orange } from "../Style/colors";
import { getImage, getOrder } from "../API/Order";
import { AddOrder, RemoveItem, RemoveOrder } from "../../Redux/Actions/OrderAction";
const Header = () => {
    return (
            <View style={styles.containerHeader}>
                <Text style={styles.textHeader}>Thông báo</Text>
            </View>
    )
}


const renderNews = (item) => {
    return(
        <View style={{width : '100%', alignItems : 'center', marginBottom : 10}}>
                            <Card style={styles.News}>
                                <View style={styles.containerTitleNews}>
                                    <Text style={styles.textTitle}>{item.title}</Text>
                                </View>
                                <View style={styles.containerInfoNews}>
                                    <Paragraph style={{fontSize :16, textAlign : 'center'}}>{item.content}</Paragraph>
                                </View>
                            </Card>
                        </View>
    )
    }
const ImageFood = ({item}) => {
    // const [image,setImage] = useState([]);
    // useEffect(()=>{
    //     getImage(item.id_Cart,setImage)
    // },[])
    
    return(
        <Image source={{uri : 'https://i.postimg.cc/rmVFvq7N/tra-sua-tran-chau-khoai-mon-600x600-removebg-preview.png'}}
                                style={styles.image}
                                resizeMode='center'/>
    )
}
const renderOrder = (item,navigation, dispatch, onHandlerRefresh) => {
    const date = item.createdAt.toString();
    const onPress = () => {
        updateState(item._id, dispatch)
        onHandlerRefresh();
        navigation.navigate('Order_Information',{item})
    }
        return(
            <Card onPress={onPress}>
                {
                    item._id == undefined ?
                    null :
                    <View>
                                {
                            item.state == true ?
                            <View style={styles.notification}>
                                <ImageFood item={item}/>
                                <View style={styles.containerInfoNotification}>
                                    <Text style={[styles.textNotification,{fontWeight : 'bold',fontSize : 20}]}>Đơn hàng của bạn: <Text style={{color:orange}}>{item.order_Status}</Text></Text>
                                    <Text style={[styles.textNotification]}>Cảm ơn bạn đã tin tưởng và đặt hàng trên ứng dụng của chúng tôi</Text>
                                    <Text style={[styles.textNotification,{fontSize : 13}]}>{date.slice(0,10)} {date.slice(11,19)}</Text>
                                </View>
                                <View style={styles.coverItem}/>
                            </View> 
                            :
                            <View style={styles.notification}>
                                <ImageFood item={item}/>
                                <View style={styles.containerInfoNotification}>
                                        <Text style={[styles.textNotification,{fontWeight : 'bold',fontSize : 20}]}>Đơn hàng của bạn: <Text style={{color:orange}}>{item.order_Status}</Text></Text>
                                        <Text style={[styles.textNotification]}>Cảm ơn bạn đã tin tưởng và đặt hàng trên ứng dụng của chúng tôi</Text>
                                        <Text style={[styles.textNotification,{fontSize : 13}]}>{date.slice(0,10)} {date.slice(11,19)}</Text>
                                    </View>
                            </View>
                        }
                    </View>
                }
            </Card>
        )
    }
    // {date.slice(0,10)} {date.slice(11,19)}
const Body = ({navigation}) => {
    const [data, setData] = useState([]);
    const Order = useSelector(state=>state.Order);
    const Account = useSelector(state=>state.Login);
    const [order, setOrder] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        onHandlerGetNews(setData)
        setOrder(Order);
    },[refreshing])
    const onHandlerWatchAll = () => {
        console.log(order);
    }
    const onHandlerRefresh = () => {
            setRefreshing(true);
            dispatch(RemoveOrder());
            setOrder([])
            setTimeout(()=>{
                getNotification(Account.idAccount,dispatch, AddOrder, setOrder);
                setRefreshing(false)
                console.log(Order)
            },300)
    }
    
    return (
        <View style={styles.containerBody}>
            <View style={styles.containerNews}>
                <FlatList  
                    data={data}
                    renderItem={({item})=> renderNews(item)} 
                    />
            </View>
            <View style={styles.containerStateDelivery}>
                <View style={styles.containerTitleState}>
                    <Text style={styles.textState}>Cập nhật đơn hàng</Text>
                    <TouchableOpacity onPress={onHandlerWatchAll}>
                        <Text style={[styles.textState,{color : '#ff6900'}]}>Xem tất cả (6)</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerNotification}>
                    <FlatList data={order}
                            renderItem={({item})=> renderOrder(item,navigation,dispatch, onHandlerRefresh)}
                            keyExtractor={(item, index)=>index}
                            style={{height : '70%'}}
                            refreshControl={
                                <RefreshControl 
                                    refreshing={refreshing}
                                    onRefresh={onHandlerRefresh}
                                />
                            }/>
                </View>
            </View>
         </View>
    )
}
export default Notification = ({navigation}) => {
    const cart = useSelector(state=>state.Cart);
    console.log(cart);
    return (
        <View style={styles.container}>
            <Header />
            <Body navigation={navigation}/>
        </View>
    )
}