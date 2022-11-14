import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Style,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { styles } from "../Style/LoyalCustomer";
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/Entypo'
import { ProgressBar, MD3Colors, Card, Paragraph} from 'react-native-paper';
import { greenlight, white, yellow } from "../Style/colors";
import { onHandlerGetSpecial } from "../API/Voucher";
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

const renderItem = (item,index) => {
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
                                <TouchableOpacity style={styles.containerButton}>
                                    <Text style={[styles.textInfoVoucher,{fontSize : 16,textAlign:'center',color : '#fff'}]}>Đổi 10 point để lấy voucher</Text>
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
    const [data, setData] = useState([]);
    useEffect(()=>{
        onHandlerGetSpecial(setData);
    },[])
    return(
        <View style={styles.containerBody}>
            <View style={styles.containerProgressBar}>
                <ProgressBar progress={index}
                            color={greenlight} 
                            style={styles.progressBar}
                            />
                <Text style={styles.textPoint}>10 Point</Text>
                
            </View>
            <FlatList data={data}
                    renderItem={({item})=> renderItem(item,index*100)}
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