import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Alert,
    Animated
} from 'react-native';
import styles from "../Style/CheckOut";
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { black, greenlight, white, yellow } from "../Style/colors";
import { useSelector, useDispatch } from "react-redux";
import { getFood, getTotal } from "../API/Cart";
import { Card, Modal, Paragraph } from "react-native-paper";
import {InsertPayment, onHandlerGetOrder} from '../API/CheckOut'
import RNMomosdk from 'react-native-momosdk';
import { RemoveAll } from "../../Redux/Actions/CartAction";
import { AddOrder } from "../../Redux/Actions/OrderAction";
const merchantname = "CGV Cinemas";
const merchantcode = "CGV01";
const merchantNameLabel = "Nhà cung cấp";
const billdescription = "DEV FOOD IS THE BEST FOR EVERY ONE";
const amount = 50000;
const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION

const Header = ({navigation}) => {
    const onHandlerBack = () => {
        navigation.goBack();
    }
    return(
        <View style={styles.containerHeader}>
            <Text style={styles.textHeader}>Thanh toán</Text>
            <TouchableOpacity style={styles.icon} onPress={onHandlerBack}>
                <Icon name="arrow-back-outline" size={34} color={yellow}/>
            </TouchableOpacity>
        </View>
    )
}
const Food = ({item}) => {
    const [name,setName] = useState();
    const [img, setImg] = useState();
    useEffect(()=>{
        getFood(item.id_Food, setName, setImg);
    })
    return (
        <View style={styles.containerItem}>
            <View style={styles.containerImage}>
                <Image source={{uri:img}}
                        style={styles.image}/>
            </View>
            <View style={styles.containerDetailFood}>
                <Text style={styles.textDetailFood}>{name}</Text>
                <View style={styles.containerQuantity}>
                    <Text style={styles.textDetailFood}>{item.price}.000 VNĐ</Text>
                    <Text style={styles.textDetailFood}>x{item.quantity}</Text>
                </View>
            </View>

        </View>
    )
}
const renderFood = (item) => {
    return(
        <View>
            <Food item={item}/>
        </View>
    )
}
const Body = ({total, apply, state, setState, sum, setSum, stateReceive, setStateReceive, stateLoading, setStateLoading, open, idCart, navigation, idVoucher}) => {
    const [data, setData] = useState([]);
    const [feeDelivery, setFeeDelivery] = useState(30);
    const Cart = useSelector(state=>state.Cart);
    const Account = useSelector(state=>state.Login);
    const onHandlerMethodPayment = () => {
        setState(!state)
    }
    const onHandlerMethodReceive1 = () => {
        setStateReceive(true)
        setSum(total-apply-feeDelivery)
    }
    const onHandlerMethodReceive2 = () => {
        setStateReceive(false)
        setSum(total-apply+feeDelivery)
    }
    useEffect(()=>{
        setData(Cart);
        setSum(total-apply)
    },[])
    return(
        <ScrollView style={styles.containerBody} horizontal={false}>
            <View style={styles.containerAccount}>
                <View style={styles.containerIcon}>
                    <Icon2 name="map-marker-radius-outline" size={32} color={yellow}/>
                </View>
                <View style={styles.containerInfo}>
                    <Text style={[styles.textInfo,{marginBottom : 5,fontWeight : 'bold'}]}>Địa chỉ nhận hàng :</Text>
                    <Text style={[styles.textInfo,{fontSize : 18}]}>{Account.fullname}</Text>
                    <Text style={[styles.textInfo,{fontSize : 18}]}>{Account.phone}</Text>
                    <Text style={[styles.textInfo,{fontSize : 18}]}>{Account.address}</Text>
                </View>
            </View>
            <View style={styles.containerFood}>
                <FlatList data={data}
                        renderItem={({item})=>renderFood(item)}
                        horizontal ={true}
                        style={{width : '100%', height : '100%'}}/>
            </View>
            <Card style={{padding : 10, marginBottom : 10}}>
                {
                    apply != 0 ?
                    <Paragraph style={styles.textVoucher}>Bạn đang sử dụng voucher giảm giá</Paragraph>
                    : <Paragraph style={styles.textVoucher}>Bạn không sử dụng voucher</Paragraph>
                }
            </Card>
                                            {/*Choose Method Payment */}
            <View style={styles.containerPayment}>
                <Text style={[styles.textVoucher,{color : black,marginBottom : 5}]}>Phương thức thanh toán :</Text>
                {
                    state == true ?
                    <TouchableOpacity style={[styles.containerButtonPayment,{marginBottom : 10, backgroundColor : greenlight}]} onPress={onHandlerMethodPayment} disabled={true}>
                        <View style={styles.containerRadioButton}>
                            {
                                state ==true ?
                                <Icon name="radio-button-on" size={28} color={yellow}/>
                                : <Icon name="radio-button-off" size={28}/>
                            }
                            <Paragraph style={[styles.textVoucher,{color:yellow}]}>Thanh toán bằng ví Momo</Paragraph>
                        </View>
                    </TouchableOpacity> : 
                    <TouchableOpacity style={[styles.containerButtonPayment,{marginBottom : 10}]}  onPress={onHandlerMethodPayment} >
                        <View style={styles.containerRadioButton}>
                            {
                                state ==true ?
                                <Icon name="radio-button-on" size={28}/>
                                : <Icon name="radio-button-off" size={28}/>
                            }
                            <Paragraph style={[styles.textVoucher,{color:black}]}>Thanh toán bằng ví Momo</Paragraph>
                        </View>
                    </TouchableOpacity>
                }
                {
                    state == false ?
                    <TouchableOpacity style={[styles.containerButtonPayment,{backgroundColor : greenlight}]} onPress={onHandlerMethodPayment} disabled={true}>
                        <View style={styles.containerRadioButton}>
                            {
                                state==false?
                                <Icon name="radio-button-on" size={28} color={yellow}/>
                                : <Icon name="radio-button-off" size={28}/>
                            }
                            <Paragraph style={[styles.textVoucher,{color:yellow}]}>Thanh toán bằng khi nhận hàng</Paragraph>
                        </View>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.containerButtonPayment} onPress={onHandlerMethodPayment}>
                        <View style={styles.containerRadioButton}>
                            {
                                state==false?
                                <Icon name="radio-button-on" size={28}/>
                                : <Icon name="radio-button-off" size={28}/>
                            }
                            <Paragraph style={[styles.textVoucher,{color:black}]}>Thanh toán bằng khi nhận hàng</Paragraph>
                        </View>
                    </TouchableOpacity>
                }
            </View>
                                    {/*Choose Method Receive Item */}
            <View style={styles.containerPayment}>
                <Text style={[styles.textVoucher,{color : black,marginBottom : 5}]}>Phương thức nhận hàng :</Text>
                    {
                        stateReceive == true ?
                        <TouchableOpacity style={[styles.containerButtonPayment,{marginBottom : 10, backgroundColor : greenlight}]} disabled={true}>
                            <View style={styles.containerRadioButton}>
                                {
                                    stateReceive ==true ?
                                    <Icon name="radio-button-on" size={28} color={yellow}/>
                                    : <Icon name="radio-button-off" size={28}/>
                                }
                                <Paragraph style={[styles.textVoucher,{color:yellow}]}>Nhận thức ăn tại cửa hàng</Paragraph>
                            </View>
                        </TouchableOpacity> : 
                        <TouchableOpacity style={[styles.containerButtonPayment,{marginBottom : 10}]}  onPress={onHandlerMethodReceive1} >
                            <View style={styles.containerRadioButton}>
                                {
                                    stateReceive ==true ?
                                    <Icon name="radio-button-on" size={28}/>
                                    : <Icon name="radio-button-off" size={28}/>
                                }
                                <Paragraph style={[styles.textVoucher,{color:black}]}>Nhận thức ăn tại cửa hàng</Paragraph>
                            </View>
                        </TouchableOpacity>
                    }
                    {
                        stateReceive == false ?
                        <TouchableOpacity style={[styles.containerButtonPayment,{backgroundColor : greenlight}]} disabled={true}>
                            <View style={styles.containerRadioButton}>
                                {
                                    stateReceive==false?
                                    <Icon name="radio-button-on" size={28} color={yellow}/>
                                    : <Icon name="radio-button-off" size={28}/>
                                }
                                <Paragraph style={[styles.textVoucher,{color:yellow}]}>Giao hàng tận nơi</Paragraph>
                            </View>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.containerButtonPayment} onPress={onHandlerMethodReceive2}>
                            <View style={styles.containerRadioButton}>
                                {
                                    stateReceive==false?
                                    <Icon name="radio-button-on" size={28}/>
                                    : <Icon name="radio-button-off" size={28}/>
                                }
                                <Paragraph style={[styles.textVoucher,{color:black}]}>
                                    Giao hàng tận nơi
                                    </Paragraph>
                            </View>
                        </TouchableOpacity>
                    }
            </View>
                                        {/**Form Detail information Client need payment */}
            <View style={styles.containerDetailPayment}>
                <View style={styles.containerDetail}>
                    <Icon2 name="calendar-text" size={34} color={yellow}/>
                    <Paragraph style={[styles.textVoucher,{color:black, marginLeft : 10, fontSize : 20}]}>Chi tiết thanh toán</Paragraph>
                </View>
                <View style={[styles.containerDetail,{justifyContent:'space-between',marginTop : 5}]}>
                    <Text style={{fontSize : 17}}>Tổng tiền hàng ({Cart.length})</Text>
                    <Text style={{fontSize : 17}}>{total}.000 VNĐ</Text>
                </View>
                {
                    apply != 0 ?
                    <View style={[styles.containerDetail,{justifyContent:'space-between',marginTop : 5}]}>
                        <Text style={{fontSize : 17}}>Tiền giảm của voucher</Text>
                        <Text style={{fontSize : 17}}>-{apply}.000 VNĐ</Text>
                    </View> 
                    : null
                }
                {
                    stateReceive==true ? 
                    null :
                    <View style={[styles.containerDetail,{justifyContent:'space-between',marginTop : 5}]}>
                    <Text style={{fontSize : 17}}>Phí vận chuyển</Text>
                        <Text style={{fontSize : 17}}>{feeDelivery}.000 VNĐ</Text>
                    </View>
                }
                <View style={[styles.containerDetail,{justifyContent:'space-between',marginTop : 5}]}>
                    <Text style={[styles.textVoucher,{color:black, fontSize : 20}]}>Tổng thanh toán</Text>
                    <Text style={[styles.textVoucher,{color:black, fontSize : 20}]}>{total}.000 VNĐ</Text>
                </View>
            </View>
            {
                open == false ?
                null : <Loading stateLoading={stateLoading} setStateLoading={setStateLoading} sum={total} state={state} stateReceive={stateReceive} idCart={idCart} idVoucher={idVoucher} navigation={navigation}
                    />
            }
        </ScrollView>
    )
}
const Loading = ({stateLoading, setStateLoading, sum, state, stateReceive, idCart, idVoucher, navigation}) => {
    
    const progress = useRef(new Animated.Value(0.5)).current; // useSharedValue(0)
    const scale = useRef(new Animated.Value(1)).current;
    useEffect(()=>{
        Animated.loop(
            Animated.parallel([
              Animated.sequence([
                Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
                Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
              ]),
              Animated.sequence([
                Animated.spring(scale, { toValue: 1.5, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
              ]),
            ]),
            { iterations: 1000 }

          ).start();
    },[stateLoading]);
    const cancleOrder = () => {
        Animated.loop(
            Animated.parallel([
              Animated.sequence([
                Animated.spring(progress, { toValue: 1, useNativeDriver: true }),
                Animated.spring(progress, { toValue: 0.5, useNativeDriver: true }),
              ]),
              Animated.sequence([
                Animated.spring(scale, { toValue: 2, useNativeDriver: true }),
                Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
              ]),
            ]),
            { iterations: 10 }
          ).stop();
          setStateLoading(false)
    }
    const dispatch = useDispatch();
    const Payment = () => {
        if(state == true) {
            console.log('Momo ',sum);
            // if(stateReceive==true) {
            //     console.log('Momo nhận thức ăn tại cửa hàng')
            //     // onPress()
            //     InsertPayment(idCart, idVoucher, 'Momo', 'tại cửa hàng', 'Đợi duyệt', 'Đợi duyệt', sum);
            // } else {
            //     console.log('Momo giao hàng tận nơi')
            //     // onPress()
            //     InsertPayment(idCart, idVoucher, 'Momo', 'tại nhà', 'Đợi duyệt', 'Đợi duyệt', sum);
            // }

            onPress(idCart, idVoucher, sum);
        }
         else {
            console.log('Nhận hàng', sum);
            if(stateReceive==true){
                console.log('Nhận hàng tại cửa hàng');
                InsertPayment(idCart, String(idVoucher), 'Cash', 'Nhận tại cửa hàng', 'Đợi duyệt', 'Đợi duyệt', sum);
                dispatch(AddOrder())
                dispatch(RemoveAll());
                Alert.alert('Đơn hàng', 'Chúng tôi đã nhận được đơn hàng của bạn, vui lòng đợi 1 ít phút để chúng tôi duyệt đơn hàng của bạn. Xin trân trọng cảm ơn !',[
                    {
                        text : 'OK',
                        onPress : () => {
                            onHandlerGetOrder(idCart, dispatch)
                            navigation.goBack();
                            navigation.navigate('FoodTab')
                        }
                    }
                ])
            } else {
                console.log('Giao hàng tận nơi');
                InsertPayment(idCart, String(idVoucher), 'Cash', 'Nhận tại nhà', 'Đợi duyệt', 'Đợi duyệt', sum);
                dispatch(RemoveAll());
                Alert.alert('Đơn hàng', 'Chúng tôi đã nhận được đơn hàng của bạn, vui lòng đợi 1 ít phút để chúng tôi duyệt đơn hàng của bạn. Xin trân trọng cảm ơn !',[
                    {
                        text : 'OK',
                        onPress : () => {
                            onHandlerGetOrder(idCart, dispatch)
                            navigation.goBack();
                            navigation.navigate('FoodTab')
                        }
                    }
                ])
            }
         }
        // setStateLoading(true);
        // setOpen(true);
    }
    const onPress = async (idCart, idVoucher, sum) => {
        let jsonData = {};
        jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
        jsonData.action = "gettoken"; //DO NOT EDIT
        jsonData.merchantname = merchantname; //edit your merchantname here
        jsonData.merchantcode = merchantcode; //edit your merchantcode here
        jsonData.merchantnamelabel = merchantNameLabel;
        jsonData.description = billdescription;
        jsonData.amount = sum*1000;//order total amount
        jsonData.orderId = "Một chú nai vàng ngơ ngác";
        jsonData.orderLabel = "Ma don hang";
        jsonData.appScheme = "momocgv20170101";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
        console.log("data_request_payment " + JSON.stringify(jsonData));
        if (Platform.OS === 'android'){
          let dataPayment = await RNMomosdk.requestPayment(jsonData);
          momoHandleResponse(dataPayment, idCart, idVoucher, sum);
        }else{
          RNMomosdk.requestPayment(jsonData);
        }
    }
    
    const momoHandleResponse = async (response, idCart, idVoucher, sum) => {
        console.log('---RESPONSE---: ',response)
      try{
        if (response && response.status == 0) {
          //SUCCESS continue to submit momoToken,phonenumber to server
          let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
          let momoToken = response.data;
          let phonenumber = response.phonenumber;
          let message = response.message;
            console.log('//TOKEN : ',momoToken)
            console.log('//PHONE NUMBER : ',phonenumber)
            console.log('//MESSAGE : ',message)
            if(stateReceive==true) {
                console.log('Momo nhận thức ăn tại cửa hàng')
                InsertPayment(idCart, String(idVoucher), 'Momo', 'Nhận tại cửa hàng' , 'Đợi duyệt', 'Đợi duyệt', sum);
                dispatch(RemoveAll());
                Alert.alert('Đơn hàng', 'Chúng tôi đã nhận được đơn hàng của bạn, vui lòng đợi 1 ít phút để chúng tôi duyệt đơn hàng của bạn. Xin trân trọng cảm ơn !',[
                    {
                        text : 'OK',
                        onPress : () => {
                            onHandlerGetOrder(idCart, dispatch)
                            navigation.goBack();
                            navigation.navigate('FoodTab')
                        }
                    }
                ])
            } else {
                console.log('Momo giao hàng tận nơi')
                InsertPayment(idCart, String(idVoucher), 'Momo', 'Nhận tại nhà', 'Đợi duyệt', 'Đợi duyệt', sum);
                dispatch(RemoveAll());
                Alert.alert('Đơn hàng', 'Chúng tôi đã nhận được đơn hàng của bạn, vui lòng đợi 1 ít phút để chúng tôi duyệt đơn hàng của bạn. Xin trân trọng cảm ơn !',[
                    {
                        text : 'OK',
                        onPress : () => {
                            onHandlerGetOrder(idCart, dispatch)
                            navigation.goBack();
                            navigation.navigate('FoodTab')
                        }
                    }
                ])
            } 
        } else {
          let message = response.message;
          console.log(message,'---ERROR---')
          //Has Error: show message here
        }
      }catch(ex){}
    }
    return(
        <Modal style={styles.Modal} visible={stateLoading}>
                <TouchableOpacity style={{borderRadius : 30, width : 350, height : 50, justifyContent : 'center',alignItems : 'center', backgroundColor : '#ccc', }}
                                    onPress={Payment}>
                    <Text style={[styles.textDetailFood,{color : black}]}>Nhấn vào đây để xác nhận đơn hàng !!!</Text>
                </TouchableOpacity>
                <Animated.View style={[styles.containerWaiting,
                    {
                        borderRadius: /* progress.value * SIZE / 2 */ progress.interpolate({
                          inputRange: [0.5, 1],
                          outputRange: [100 / 4, 100 / 2],
                        }),
                        opacity: progress,
                        transform: [
                          { scale },
                          {
                            rotate: /* progress.value * 2 * Math.PI */ progress.interpolate(
                              {
                                inputRange: [1, 1],
                                outputRange: ['1deg', '5deg'],
                              }
                            ),
                          },
                        ],
                      },
        ]}>
                    <TouchableOpacity style={{position:'absolute',left : 35}} onPress={cancleOrder}>
                        <Text style={{fontSize : 50}}>X</Text>
                    </TouchableOpacity>
                </Animated.View>   
        </Modal>
    )
}
const Footer = ({sum, state, stateReceive, idCart, idVoucher, navigation, stateLoading, setStateLoading, open, setOpen}) => {
    const onHandlerPayment = () => {
        setStateLoading(true);
        setOpen(true);
    }
    return (
        <View style={styles.containerFooter}>
            <View style={styles.containerTotal}>
                <Text style={styles.textTotal}>Tổng thanh toán</Text>
                <Text style={[styles.textTotal,{fontSize : 22, color : yellow}]}>{sum}.000 VNĐ</Text>
            </View>
            <TouchableOpacity style={styles.containerButton} onPress={onHandlerPayment}>
                <Text style={[styles.textHeader, {color : white, fontSize : 20}]}>Đặt hàng</Text>
            </TouchableOpacity>
        </View>
    )
}
const CheckOut = ({navigation, route}) => {
    const {apply, dataVoucher, data} = route.params;
    const [total, setTotal] = useState();
    const [state, setState] = useState(true);
    const [stateReceive, setStateReceive] = useState(true);
    const [sum, setSum] = useState();
    const [stateLoading, setStateLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const Account = useSelector(state=>state.Login);
    const idCart = useMemo(()=>{
        const item = data.map(item=>item._id)
        return item[0];
    },[])
    const idVoucher = useMemo(()=>{
        return dataVoucher;
    })
    useEffect(()=>{
        getTotal(Account.idAccount , setTotal);
    },[])
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Body total={total} apply={apply} state={state} setState={setState} sum={sum} setSum ={setTotal} stateReceive={stateReceive} setStateReceive={setStateReceive} stateLoading={stateLoading} setStateLoading={setStateLoading} open={open} idCart={idCart} navigation={navigation} idVoucher={idVoucher}/>
            <Footer sum={total} state={state} stateReceive={stateReceive} idCart={idCart} idVoucher={idVoucher} navigation={navigation} stateLoading={stateLoading} setStateLoading={setStateLoading} open={open} setOpen={setOpen}/>
        </View>
    )
}
export default CheckOut;