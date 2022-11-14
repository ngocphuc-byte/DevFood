import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Animated,
} from 'react-native';
import styles from '../Style/Cart';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {useSelector, useDispatch} from 'react-redux'
import { black, greendark, greenlight, white, yellow } from "../Style/colors";
import { getCart, getFood, getTotal, getIdVoucher, onHandlerUpdateQuantityDown, onHandlerUpdateQuantityUp, getVoucher, RemoveItemCart, updateTotal } from "../API/Cart";
import { Card, Modal } from "react-native-paper";
import { UpdateCart, RemoveItem } from "../../Redux/Actions/CartAction";
import  {Swipeable, GestureHandlerRootView}  from "react-native-gesture-handler";
const Header = ({navigation}) => {
    const onHandlerBack = () => {
        navigation.goBack();
    }
    return(
        <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Giỏ hàng</Text>
            <TouchableOpacity style={styles.icon} onPress={onHandlerBack}>
                <Icon2 name="arrow-back-outline" size={34} color={yellow}/>
            </TouchableOpacity>
        </View>
    )
}
const NameFood = ({id}) => {
    const [name, setName] = useState()
    const [img, setImg] = useState();

    getFood(id, setName, setImg)
    return (
        <View style={styles.containerTextFood}>
            <Text style={styles.textFood}>{name}</Text>
        </View>
    )
}
const ImageFood = ({id}) => {
    const [name, setName] = useState()
    const [img, setImg] = useState();
    getFood(id, setName, setImg)
    return (
        <Image style ={styles.image}
            resizeMode ='contain'
            source={{uri : img}}/>
    )
}
const Quantity = ({item,setTotal, total}) => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.Cart)
    const idAccount = useSelector(state=>state.Login.idAccount)

    const onHandlerQuantityUp = () => {
        setTotal(total+(item.price/item.quantity))
        dispatch(UpdateCart(item.id_Food, item.quantity+=1,item.price+=item.price/(item.quantity-1)))
        onHandlerUpdateQuantityUp(idAccount, item.id_Food)
    }
    const onHandlerQuantityDown = () => {
        setTotal(total-(item.price/item.quantity))
        dispatch(UpdateCart(item.id_Food, item.quantity-=1, item.price-=item.price/(item.quantity+1)))
        onHandlerUpdateQuantityDown(idAccount, item.id_Food)
    }
    return (
        <View style={{width : '100%', height : '100%', flexDirection : 'row'}}>
            <View style={styles.containerCount}>
                <TouchableOpacity onPress={onHandlerQuantityUp}>
                    <Icon name="keyboard-arrow-up" color={black} size={24}/>
                </TouchableOpacity>
                
                <Text style={styles.textCount}>{item.quantity}</Text>
                {
                    item.quantity > 1 ? 
                    <TouchableOpacity onPress={onHandlerQuantityDown}>
                        <Icon name="keyboard-arrow-down" color={black} size={24}/>
                    </TouchableOpacity> 
                    : 
                    <TouchableOpacity onPress={onHandlerQuantityDown} disabled={true}>
                        <Icon name="keyboard-arrow-down" color={black} size={24}/>
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.containerPrice}>
                <Text style={[styles.textFood,{width:'100%', textAlign : 'right'}]}>{item.price}.000</Text>
            </View>
        </View>
    )
}

const ButtonRemove = ({idAccount, item, setTotal, total}) => {
    const dispatch = useDispatch();
    const onHandlerRemove = () => {
        RemoveItemCart(idAccount,item.id_Food)
        updateTotal(idAccount)
        dispatch(RemoveItem(item.id_Food))
        setTotal(total-item.price)
    }
    return(
        <View style={styles.containerDelete}>
            <TouchableOpacity style={styles.buttonDelete} onPress={onHandlerRemove}>
                <Text style={[styles.textInfo,{color : white,fontSize : 18}]}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}

const renderFood = (item,index, setTotal, total, idAccount) => {
    const renderRight = () => {
        
        return(
            <ButtonRemove idAccount={idAccount} item={item} setTotal={setTotal} total={total}/>
        )
    }
    return(
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRight}>
                <View style={styles.containerFood} key={index}>
                    <ImageFood id={item.id_Food}/>
                    <NameFood id={item.id_Food}/>
                    <Quantity item={item} setTotal={setTotal} total ={total}/>
                    {/* <Price item={item}/> */}
                </View>
            </Swipeable>
        </GestureHandlerRootView>
            
    )
}
// const renderItem = (item, idAccount, setTotal, total) => {
//     return(
//         item.detail_Cart.map((item,index) => renderFood(item,index,idAccount,setTotal,total)     
//         )
//     )
// }
const NameVoucher = ({item, setDataVoucher,setApply ,setVisible, total}) => {
    const [voucher, setVoucher] = useState([]);
    useEffect(()=>{
        getVoucher(item.id_Voucher, setVoucher)
        // console.log(total)
    },[])
    const onHandlerSaveVoucher = () => {
        if(voucher.minprice <= total) {
            setDataVoucher(item._id);
            setApply(voucher.discount);
            setVisible(false);
        } else {
            Alert.alert('WARNING','Bạn không đủ điều kiện sử dụng voucher của chúng tôi !')
        }
    }
    return(
        <View style={styles.containerVoucherModal}>
            <View style={styles.containerInfoVoucher}>
                <Text style={styles.titleVoucher}>Giảm {voucher.name}%</Text>
                <Text style={styles.textInfo}>Giảm tối đa {voucher.discount}k đơn hàng tối thiểu {voucher.minprice}k</Text>
            </View>
            <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={onHandlerSaveVoucher}>
                <Text style={styles.textButton}>Sử dụng</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
const renderIdVoucher = (item, setDataVoucher, setApply, setVisible, total) => {
    return(
        <View style={styles.containerVoucherModal}>
            <View style={styles.containerLogo}>
                <Text style={styles.textLogo}>DEV</Text>
                <Text style={styles.textLogo}>FOOD</Text>
            </View>
            <NameVoucher item={item} setDataVoucher={setDataVoucher} setApply={setApply} setVisible={setVisible} total ={total}/>
        </View>
    )
}
const Body = ({navigation}) => {
    const Account = useSelector(state=>state.Login)
    const [data, setData] = useState([])
    const [total, setTotal] = useState();
    const [voucher, setVoucher] = useState([]);
    const [dataVoucher, setDataVoucher] = useState();
    const [apply ,setApply] = useState(0)
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(true);
    const [refreshing2, setRefreshing2] = useState(true);
    const cart = useSelector(state=>state.Cart)
    useEffect(()=>{
        getCart(Account.idAccount, setData);
        getTotal(Account.idAccount, setTotal)
        getIdVoucher(Account.idAccount, setVoucher)
        // console.log(cart)
    },[])
    const onHandlerRefresh = () => {
        setRefreshing(!refreshing);
        getIdVoucher(Account.idAccount, setVoucher)
    }
    const onHandlerRefresh2 = () => {
        setRefreshing2(!refreshing2);
        updateTotal(Account.idAccount)
        getTotal(Account.idAccount, setTotal)
    }
    const onHandlerCheckOut = () => {
        if(cart.length == 0) {
            Alert.alert('Thông báo', 'Hãy thêm sản phẩm vào giỏ hàng, xin cảm ơn !',[
                {
                    text : 'OK',
                    onPress : ()=>{

                    }
                }
            ])
        } else {
            navigation.navigate('CheckOut',{total, apply, dataVoucher, data});
        }
    }
    
    return(
        <View style={styles.containerBody}>  
            <View style={styles.containerCart}>
                <FlatList data={cart}
                        renderItem={({item,index})=> renderFood(item, index, setTotal, total, Account.idAccount)}
                        keyExtractor={(item,index)=>index}
                        refreshing={false}
                        onRefresh={onHandlerRefresh2}/>
            </View>
            <View style={styles.containerVoucher}>
                <TouchableOpacity style={styles.voucher} onPress={()=>setVisible(true)}>
                    {
                        apply == 0 ?
                        <Text style={[styles.textCount,{color: '#f12'}]}>Bạn muốn sử dụng voucher chứ ?</Text>
                        : <Text style={[styles.textCount,{color: '#f12'}]}>Bạn đang sử dụng voucher giảm {apply}k</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.containerTotal}>
                <Text style={[styles.textCount,{color: greenlight, fontSize : 30,height : '100%'}]}>Total</Text>
                {
                    Number(total-apply).toString().length >= 4 ?
                <Text style={[styles.textCount,{color: greenlight, fontSize : 30,height : '100%'}]}>{total.toString().slice(0,1)}.{total.toString().slice(1,4)}.000</Text>
                : <Text style={[styles.textCount,{color: greenlight, fontSize : 30,height : '100%'}]}>{total-apply}.000</Text>
                }
            </View>
            <TouchableOpacity style={styles.containerCheckOut} onPress={onHandlerCheckOut}>
                <Text style={styles.textButton}>Thanh toán</Text>
            </TouchableOpacity>
            <Modal visible={visible} onDismiss={()=>setVisible(false)}>
                <View style={styles.modal}>
                    <FlatList data={voucher}
                            renderItem={({item})=>renderIdVoucher(item, setDataVoucher, setApply, setVisible, total)}
                            onRefresh={onHandlerRefresh}
                            refreshing={false}
                            />
                </View>
            </Modal>
        </View>
    )
}
const Cart = ({navigation}) => {
    return (
        <View style = {styles.container}>
            <Header navigation={navigation}/>
            <Body navigation={navigation}/>
            
        </View>
    )
}
export default Cart;