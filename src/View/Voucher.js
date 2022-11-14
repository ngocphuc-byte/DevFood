import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { yellow } from "../Style/colors";
import { styles } from "../Style/Voucher";
import { onHandlerGet, onHandlerCheck, onHandlerCheckSave } from "../API/Voucher";
import { useSelector } from 'react-redux';
export default Voucher = () => {
    const [refreshing, setRefreshing] = useState(false);
    const account = useSelector(state=>state.Login)
    const [data, setData] = useState([]);
    const renderItem = (item) => {
        const onPress = () => {
            onHandlerCheck(item._id, account.idAccount);
        }
        return (
            <View style={styles.containerVoucher}>
                <View style = {styles.containerLogo}>
                    <Text style={styles.textLogo}>Dev</Text>
                    <Text style={styles.textLogo}>Food</Text>
                </View>
                <View style={styles.containerTextVoucher}>
                    <Text style={styles.textTitleVoucher}>Giảm {item.name}%</Text>
                    <Text style={styles.textVoucher}>Giảm {item.discount}k đơn tối thiểu {item.minprice}k</Text>
                    <Text style={[styles.textVoucher,{color : '#f12'}]}>Có hiệu lực: chỉ dùng được 1 lần 1 ngày</Text>
                </View>
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={[styles.textVoucher,{fontSize : 16,color:yellow, textAlign : 'center'}]}>Lưu voucher</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const onHandlerRefreshing = () => {
        setRefreshing(!refreshing);
        onHandlerGet(setData);
    }
    useEffect(()=>{
        onHandlerGet(setData);
    })
    return (
        <View style ={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>VOUCHER</Text>
            </View>
            <View style={styles.containerList}>
                <View style={{height : 5, backgroundColor : '#ddd'}}/>
                <FlatList data={data.slice(0)}
                        renderItem  = {({item})=>renderItem(item)}
                        keyExtractor={(item, index) => index}
                       onRefresh={onHandlerRefreshing}
                       refreshing={false}/>
            </View>
        </View>
    )
}