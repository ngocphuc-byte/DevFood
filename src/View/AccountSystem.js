import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';
import { Card, TextInput } from "react-native-paper";
import {styles} from '../Style/Account'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons'; 
import { white, yellow } from "../Style/colors";
import { useDispatch, useSelector } from 'react-redux';
import { AccountLogin } from "../../Redux/Actions/AccountAction";
import ImagePicker from 'react-native-image-crop-picker';
import { UpdateAccount } from "../API/Account";
import FastImage from 'react-native-fast-image';
const Header = ({navigation}) => {
    return (
        <View style={styles.containerHeader}>
            <Text style={[styles.text,{color: yellow, fontFamily : 'Righteous'}]}>
                Thiết lập tài khoản
            </Text>
            <TouchableOpacity style={styles.buttonHeader}>
                <Icon name="arrow-down-circle" color={yellow} size={32} onPress={()=>navigation.goBack()} />
            </TouchableOpacity>
        </View>
    )
}
const Body =() =>{
    const [state, setState] = useState(false);
    const account = useSelector(state=>state.Login)
    const [fullname, setFullname] = useState();
    const [address, setAddress] = useState();
    const [phone, setPhone] = useState();
    const [avatar, setAvatar] = useState();
    const [uri, setUri] = useState();
    const [type, setType] = useState();
    const [name , setName] = useState();
    const dispatch = useDispatch();
    const uploadCloudinary = (photo) => {
        const data = new FormData();
        data.append('file', photo);
        data.append('upload_preset', 'phucdeptrai');
        data.append('cloud_name','phucdeptrai');
        data.append('tags', 'browser_upload');
        fetch('https://api.cloudinary.com/v1_1/phucdeptrai/upload',{
            method : 'POST',
            body : data,
        }).then(res=>res.json())
        .then(data=>{
            // setAvatar(data.secure_url);
            console.log(data.secure_url);
            UpdateAccount(account.idAccount,fullname, address, phone, data.secure_url);
            dispatch(AccountLogin(account.idAccount, fullname, address, phone, avatar))
        }).catch(err=>console.log(err))
    }
    const onHandlerEditAvatar = () => {
        setState(true)
        ImagePicker.openPicker({
            width : 200,
            height : 200,
        })
        .then(image => {
            console.log(image,'********');
            setAvatar(image.path)
            setUri(image.path);
            setType(image.mime);
            setName(image.path.substring(image.path.lastIndexOf('/')+1));
            // const source = {
            //     uri,
            //     type,
            //     name
            // };
            // uploadCloudinary(source)
        }).catch(err=>{
            console.log('Người dùng huỷ chọn ảnh');
            setState(false);
        })
    }
    const onHandlerSave = () => {
        if(state == true) {
            const source = {
                uri,
                type,
                name
            };
            uploadCloudinary(source);
        } else {
            UpdateAccount(account.idAccount,fullname, address, phone, avatar);
            dispatch(AccountLogin(account.idAccount, fullname, address, phone, avatar))
        }
        
    }
    
    useEffect(()=>{
        setFullname(account.fullname);
        setAddress(account.address);
        setPhone(account.phone);
        setAvatar(account.avatar);
    },[])
    return (
        <View style={styles.containerBody}>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-100}>
                <View style={styles.body}>
                    <View style={styles.containerAvatar}>
                        <FastImage style={styles.avatar}
                                source={{
                                    uri: avatar,
                                    priority: FastImage.priority.high,
                                    }}/>
                        <TouchableOpacity style={styles.containerEdit} onPress={onHandlerEditAvatar}>
                            <Icon2 name="edit" style={styles.edit} size={40} color='#000'/>
                        </TouchableOpacity>
                    </View>            
                    <View style={[styles.containerComponent]}>
                        <View style={[styles.containerInput,{ }]}>
                            <TextInput mode="outlined"
                                        label='Họ và tên'
                                        value={fullname}
                                        onChangeText={text=>setFullname(text)}/>
                        </View>
                        <View style={[styles.containerInput,{ }]}>
                            <TextInput mode="outlined"
                                        label='Số điện thoại'
                                        value={phone}
                                        keyboardType='phone-pad'
                                        onChangeText={text=>setPhone(text)}/>
                        </View>
                        <View style={[styles.containerInput,{ }]}>
                            <TextInput mode="outlined"
                                        label='Địa chỉ'
                                        value={address}
                                        onChangeText={text=>setAddress(text)}
                                        />
                        </View>

                        <TouchableOpacity style={[styles.containerInput,{ alignItems : 'center', marginTop : 30, backgroundColor : yellow, height : 50, justifyContent : 'center' }]}
                                        onPress={onHandlerSave}>
                            <Text style={[styles.text,{}]}>Lưu thông tin</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}
const AccountSystem = ({navigation}) => {
    
    return (
        <View style={styles.container}>
                <Header navigation={navigation}/>
                <Body />
        </View>
    )
}
export default AccountSystem;