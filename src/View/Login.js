import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import styles from '../Style/Login'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import { TextInput } from 'react-native-paper';
import  Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, acc, add}  from "react-native-reanimated";
import {getAccount, checkAccount} from '../API/API_Login';
import {useSelector, useDispatch} from 'react-redux';
import { AccountLogin } from "../../Redux/Actions/AccountAction";
import { AddCart } from "../../Redux/Actions/CartAction";
import { AddOrder } from "../../Redux/Actions/OrderAction";

export const idAccount = ''; 
const Login = ({navigation}) => {
    const [state, setState] = useState(false);
    const imagePosition = useSharedValue(1);
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId : '682814715194-9std6o5vm9c8oiilkrp6iaumuf5gmdb2.apps.googleusercontent.com',
            offlineAccess : true,
            forceCodeForRefreshToken : true,
        });

    })
    const imageAnimatedStyle = useAnimatedStyle(()=>{
        const interpolation = interpolate(imagePosition.value, [0,1],[-height/4,2])
        return{
            transform:[{translateY: withTiming(interpolation,{duration:1000})}]
        }
    })
    
    const onHandlerLogin = () => {
        imagePosition.value = 0;
        setState(!state);
    }
    const onHandlerClose = () => {
        imagePosition.value = 1;
        setState(!state);
    }
    
    return(
        <Animated.View style={[styles.container]}>
            <View style={[styles.container]}> 
                <ImageBackground style={[styles.imagebackground]}
                                    source={require('../Image/background2.png')}
                                    resizeMode='cover'>
                </ImageBackground>
                <Image source={require('../Image/logoDev.png')}
                        style={styles.image}
                        resizeMode='contain'/>
            </View>
            <LoginHome state={state} imageAnimatedStyle={imageAnimatedStyle} onHandlerLoginState={onHandlerLogin} 
                        onHandlerClose={onHandlerClose} navigation={navigation}/>
        </Animated.View>
    )
}
const ButtonLogin = ({value, onhandler}) => {
    return(
        <TouchableOpacity style={[styles.button]}>
                <Text style={styles.text} onPress={onhandler}>
                    {value}
                </Text>
        </TouchableOpacity>
    )
}
const LoginHome = ({imageAnimatedStyle, state, onHandlerLoginState, onHandlerClose, navigation}) => {
    const dispatch = useDispatch();
    const idAccount = useSelector(state=>state.Login)
    const [stateRegister, setStateRegister] = useState(false);
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [stateGoogle, setStateGoogle] = useState(true);
    const [cart,setCart] = useState([]);
    const onHandlerState = () =>{
        setStateRegister(!stateRegister);
        setStateGoogle(true);
        setAccount('');
        setEmail('');
        setPassword('');
        setFullName('');
        setAddress('');
        setPhone('');
        setAvatar('');
    }
    const onHandlerLogin = () => {
        if(account.trim().length < 1 || password.trim().length < 1) {
            ToastAndroid.show('Nhập đầy đủ tài khoản và mật khẩu',ToastAndroid.SHORT);
        } else{
            fetch('http://10.0.2.2:3000/account_user/get',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify( {
                    username : account,
                    password : password,
                })
            })
                .then(res=>res.json())
                .then(result => {
                    if(result === null){
                        ToastAndroid.show('Sai tài khoản hoặc mật khẩu', ToastAndroid.SHORT)
                    } else {
                        ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT)
                        dispatch(AccountLogin(result._id, result.fullname,
                                        result.address, result.phone, result.avatar))
                        getOrder(result._id)
                    }
                })
                .catch(err=>console.log(err))
        }
    }
    const getCart = (id_Account) => {
        fetch('http://10.0.2.2:3000/Cart/get',{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                id_Account : id_Account,
            })
        })
        .then(res=>res.json())
        .then(result=>{
            const Result = result.map(item=>item.detail_Cart)
            Result.map(item=>item.map(item=>dispatch(AddCart(item.id_Food, item.quantity, item.price))))
        })
        .catch(err=>console.log(err))
    }
    const getOrder = (id_Account) => {
        fetch('http://10.0.2.2:3000/Payment/get',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                id_Account : id_Account,
            })
        }).then(res=>res.json())
        .then(res=>{
            res.map(item => dispatch(AddOrder(item._id, item.id_Cart,
                item.id_DetailVoucher, item.payment_Method, item.receive_Method,
                item.confirm_Order, item.order_Status, item.state, item.total, item.createdAt)))
                getCart(id_Account)
                navigation.navigate('BottomTab')
            })
        .catch(err=>console.log(err))
    }
    const onHandlerRegister = () => {
        if(account.trim().length < 1 || password.trim().length < 1 || fullName.trim().length < 1
        || address.trim().length < 1 || phone.trim().length < 1) {
            ToastAndroid.show('Nhập đầy đủ thông tin',ToastAndroid.SHORT);
        } else{
            checkAccount(account, password, fullName, address, phone);        
            setAccount('');
            setPassword('');
            setFullName('');
            setAddress('');
            setPhone('');
        }
    }
    const onHandlerCheckGoogle = (email, avatar) => {
        fetch('http://10.0.2.2:3000/account_user/checkgoogle',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                email : email,
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result == null) {
                setStateRegister(!stateRegister);
                setStateGoogle(!stateGoogle);
                random(account, password);
                setEmail(email);
                setAvatar(avatar);
                ToastAndroid.show('Chưa có tài khoản', ToastAndroid.SHORT);
            } else {
                ToastAndroid.show('Đã có tài khoản', ToastAndroid.SHORT);
                dispatch(AccountLogin(result._id, result.fullname,
                    result.address, result.phone, result.avatar))
                getOrder(result._id)
            }
        })
    }
    const random = (account, password) => {
        var Char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()_+|{}<>?.,' 
        var length = Char.length;
        for (let index = 0; index < 13; index++) {
            account += Char.charAt(Math.floor(Math.random()*length)) 
        }
        setAccount(account);
        for (let index = 0; index < 13; index++) {
            password += Char.charAt(Math.floor(Math.random()*length)) 
        }
        setPassword(password);
    }
    const onHandlerRegisterGoogle = () => {
        if(fullName.trim().length < 1 || phone.trim().length < 1 || address.trim().length < 1){
            ToastAndroid.show('Điền đầy đủ thông tin', ToastAndroid.SHORT);
        } else {
            fetch('http://10.0.2.2:3000/account_user/insertgoogle',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                username : account,
                password : password,
                fullname : fullName,
                address : address,
                phone : phone,
                email : email,
                avatar : avatar,
            })
        })
        .then(res=>res.json())
        .then(result => {
            dispatch(AccountLogin(result._id, result.fullname,
                result.address, result.phone, result.avatar))
                getOrder(result._id)
        })
        .catch(err=>console.log(err))
        }
    }
    const onHandlerGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
        //   console.log(userInfo.user)
        onHandlerCheckGoogle(userInfo.user.email,
                             userInfo.user.photo);
        } catch (error) {
            console.log('Message:___ ',error.message);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('Người dùng huỷ đăng nhập google')
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Signing in')
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Không có ứng dụng google trên máy')
          } else {
            console.log('Lỗi nào đó rồi nhá DEV chúng tôi không biết đâu hihi')
          }
        }
      };
    return(
        <Animated.View style={[styles.containerButton, imageAnimatedStyle]}>
                    {
                        !state ?
                        <ButtonLogin value={'Đăng nhập'} onhandler={onHandlerLoginState}/>
                        :
                    <View style={[styles.container,{alignItems : 'center', paddingTop : 20}]}>
                        {
                        !stateRegister ?
                        <View style={[styles.containerInput,{alignItems:'center'}]}>
                        <LoginForm account={account} setAccount={setAccount} password={password} setPassword={setPassword}/>
                        <TouchableOpacity style={[styles.button,{width :'90%', borderWidth : 0}]} onPress={
                                        onHandlerState
                                        }>
                            <Text style={[styles.text,{fontSize : 20, textAlign : 'right', width : '90%'}]}>Đăng ký nhanh</Text>
                        </TouchableOpacity>
                        <ButtonLogin value='Đăng nhập' 
                                                    onhandler={onHandlerLogin}
                                                    />
                        <Google signIn={onHandlerGoogle}/>
                            </View>
                             :

                        <View style={[styles.containerInput,{alignItems:'center'}]}>
                            {
                                stateGoogle ? 
                                <RegisterForm account={account} setAccount={setAccount}
                                            password={password} setPassword={setPassword}
                                            fullname={fullName} setFullname={setFullName}
                                            address={address} setAddress={setAddress}
                                            phone={phone} setPhone={setPhone}/>
                                :
                                <RegisterGoogleForm 
                                            fullname={fullName} setFullname={setFullName}
                                            address={address} setAddress={setAddress}
                                            phone={phone} setPhone={setPhone}/>
                            }
                            <TouchableOpacity style={[styles.button,{width :'90%', borderWidth : 0}]} onPress={onHandlerState}>
                                <Text style={[styles.text,{fontSize : 20, textAlign : 'right', width : '90%'}]}>Trở lại</Text>
                            </TouchableOpacity>
                            {
                                stateGoogle ?
                                <ButtonLogin value='Đăng ký' onhandler={onHandlerRegister}/>
                                :
                                <ButtonLogin value='Lưu thông tin' onhandler={onHandlerRegisterGoogle}/>
                            }
                        </View>
                        }
                        
                        
                        <View style={styles.containerClose}>
                            <TouchableOpacity style={[styles.button,{width : '11.8%',borderRadius : 50, borderColor : '#fff'}]}
                                            onPress={onHandlerClose}>
                                <Text style={[styles.text,{color:'#fff'}]}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                    
                </Animated.View>
    )
}
const Google = ({signIn}) =>{
    return(
        <TouchableOpacity style={styles.containerGoogle} onPress={signIn}>
            <Image source={require('../Image/google.png')}
                    style={styles.imageGoogle}
                    resizeMode='contain'/>
        </TouchableOpacity>
    )
} 
const RegisterForm = ({account, setAccount, password, setPassword, fullname, setFullname,
                        address,setAddress, phone,setPhone}) => {
    const [state, setState] = useState(false);
    const onHandlerState = () => {
        setState(!state)
    }
    return (
        <View style={[styles.containerInput,{paddingTop : 2}]}>
                <ScrollView>
                    <View style={[styles.containerInput,{paddingTop : 2}]}>
                        <TextInput label='Tài khoản'
                            theme={{colors: {primary:'#000'}}}
                            mode='flat'
                            value={account}
                            onChangeText={text=>setAccount(text)}/>
                        </View>
                    <View style={[styles.containerInput,{paddingTop : 2}]}>
                        <TextInput label='Mật khẩu'
                            theme={{colors: {primary:'#000'}}}
                            mode='flat'
                            secureTextEntry={state == false ? true : false}
                            value={password}
                            onChangeText={text=>setPassword(text)}

                            right={
                                state == false ?
                                <TextInput.Icon icon ='eye-off' onPress={onHandlerState}/> 
                                : <TextInput.Icon icon ='eye' onPress={onHandlerState}/>
                            }/>
                    </View>
                    <View style={[styles.containerInput,{paddingTop : 2}]}>
                        <TextInput label='Họ và tên'
                            theme={{colors: {primary:'#000'}}}
                            mode='flat'
                            value={fullname}
                            onChangeText={text=>setFullname(text)}/>                            
                    </View>
                    <View style={[styles.containerInput,{paddingTop : 2}]}>
                        <TextInput label='Địa chỉ'
                            theme={{colors: {primary:'#000'}}}
                            mode='flat'
                            value={address}
                            onChangeText={text=>setAddress(text)}/>            
                    </View>
                    <View style={[styles.containerInput,{paddingTop : 2}]}>
                        <TextInput label='Số điện thoại'
                            theme={{colors: {primary:'#000'}}}
                            mode='flat'
                            keyboardType="number-pad"
                            value={phone}
                            onChangeText={text=>setPhone(text)}/>                   
                    </View>
                </ScrollView>
        </View>
    )
}
const RegisterGoogleForm = ({fullname, setFullname, address,setAddress, phone,setPhone}) => {

        return (
        <View style={[styles.containerInput,{paddingTop : 2}]}>
        <ScrollView>
        <View style={[styles.containerInput,{paddingTop : 2}]}>
            <TextInput label='Họ và tên'
                theme={{colors: {primary:'#000'}}}
                mode='flat'
                value={fullname}
                onChangeText={text=>setFullname(text)}/>                            
        </View>
        <View style={[styles.containerInput,{paddingTop : 2}]}>
            <TextInput label='Địa chỉ'
                theme={{colors: {primary:'#000'}}}
                mode='flat'
                value={address}
                onChangeText={text=>setAddress(text)}/>            
        </View>
        <View style={[styles.containerInput,{paddingTop : 2}]}>
            <TextInput label='Số điện thoại'
                theme={{colors: {primary:'#000'}}}
                mode='flat'
                keyboardType="number-pad"
                value={phone}
                onChangeText={text=>setPhone(text)}/>                   
        </View>
        </ScrollView>
        </View>
        )
        }
const LoginForm = ({account, setAccount, password, setPassword}) => {
    const [state, setState] = useState(false);
    const onHandlerState = () => {
        setState(!state)
    }
    return(
        <View style={styles.containerInput}>
                <View style={styles.containerInput}>
                    <TextInput label='Tài khoản'
                            theme={{colors: {primary:'#000'}}}
                            mode='flat'
                            value={account}
                            onChangeText={text=>setAccount(text)}/>
                    </View>
                    <View style={styles.containerInput}>
                    <TextInput label='Mật khẩu'
                        theme={{colors: {primary:'#000'}}}
                        mode='flat'
                        value={password}
                        secureTextEntry={state == false ? true : false}
                        onChangeText={text=>setPassword(text)}
                        right={
                            state == false ?
                            <TextInput.Icon icon ='eye-off' onPress={onHandlerState}/> 
                            : <TextInput.Icon icon ='eye' onPress={onHandlerState}/>
                        }/>
                </View>
        </View>        
    )
}
export default Login;