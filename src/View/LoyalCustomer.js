import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Style,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import { styles } from "../Style/LoyalCustomer";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Entypo'
import { ProgressBar, MD3Colors, Card, Paragraph} from 'react-native-paper';
import { greenlight, white, yellow } from "../Style/colors";
import { insertVoucher, onHandlerGetSpecial } from "../API/Voucher";
import { useDispatch, useSelector } from "react-redux";
import { onHandlerMinusPoint } from "../API/Point";
import { UpdatePointAccount } from "../../Redux/Actions/AccountAction";
const Header = ({navigation}) => {
    return (
        <View style={styles.containerHeader}>
            <Icon name="arrow-down-circle" color={yellow} size={32} onPress={()=>navigation.goBack()}/>
            <Text style={styles.textTitle}>
                Khách hàng thân thiết
            </Text>
        </View>
    )
}

const renderItem = (item,Account,dispatch, setIndex, index) => {
    const onHandlerInsertVoucher = () => {
        insertVoucher(item._id, Account.idAccount)
        onHandlerMinusPoint(Account.idAccount, item.point)
        dispatch(UpdatePointAccount(Account.idAccount, Account.point-item.point))
        setIndex(index - item.point)
        Alert.alert('Thông báo', 'Bạn đã sử dụng điểm để đổi voucher thành công', [
            {
                text : 'OK',
            }
        ])
    }
    return (
        <View style={styles.containerVoucher}>
            <View style={styles.voucher}>
                        <View style={styles.containerTextVoucher}>
                            <Text style={styles.textVoucher}>Voucher</Text>
                        </View>
                        <View style={styles.containerLogo}>
                            <Text style={[styles.textVoucher,{color:greenlight,transform:[{rotate:'0deg'}], fontSize : 28}]}>DEV</Text>
                            <Text style={[styles.textVoucher,{transform:[{rotate:'0deg'}], fontSize : 28}]}>FOOD</Text>
                        </View>
                        <View style={styles.containerInfoVoucher}>
                            <Text style={[styles.textInfoVoucher,{fontWeight : 'bold'}]}>Giảm {item.name}%</Text>
                            <Text style={[styles.textInfoVoucher,{fontSize : 15}]}>Giảm {item.discount}k đơn tối thiểu {item.minprice}k</Text>
                            {
                                index >= item.point ?
                                <TouchableOpacity style={styles.containerButton} onPress={onHandlerInsertVoucher}>
                                    <Text style={[styles.textInfoVoucher,{fontSize : 16,textAlign:'center',color : '#fff'}]}>Đổi {item.point} point để lấy voucher</Text>
                                </TouchableOpacity> :
                                <TouchableOpacity style={[styles.containerButton,{backgroundColor : '#ccc'}]} disabled={true}>
                                    <Text style={[styles.textInfoVoucher,{fontSize : 16,textAlign:'center',color : '#000'}]}>Đổi {item.point} point để lấy voucher</Text>
                                </TouchableOpacity>
                            }
                            
                        </View>
            </View>
        </View>
    )
}
const Body = () => {
    const [index, setIndex] = useState(0.1);
    const Account = useSelector(state=>state.Login);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    useEffect(()=>{
        onHandlerGetSpecial(setData);
        setIndex(Account.point);
    },[setIndex])
    return(
        <View style={styles.containerBody}>
            <View style={styles.containerProgressBar}>
                <ProgressBar progress={index/100}
                            color={greenlight} 
                            style={styles.progressBar}
                            />
                <Text style={styles.textPoint}>{index} Point</Text>
                
            </View>
            <FlatList data={data}
                    renderItem={({item})=> renderItem(item,Account,dispatch, setIndex, index)}
                    style={{height : '100%', width : '100%'}}/>
        </View>
    )
}
export default LoyalCustomer = ({navigation}) => {
    
    return(
        <View style={styles.container}>
            <Header navigation={navigation}/>
            <Body />
        </View>
    )
}