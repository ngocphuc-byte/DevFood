import { Alert, ToastAndroid } from "react-native";
import { idAccount } from "../View/Login";
const api = 'http://10.0.2.2:3000/account_user';
export const getAccount = (username, password) => {
    fetch(api+'/get',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( {
            username : username,
            password : password,
        })
    })
        .then(res=>res.json())
        .then(result => {
            if(result === null){
                ToastAndroid.show('Sai tài khoản hoặc mật khẩu', ToastAndroid.SHORT)
            } else {
                ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT)
                idAccount = result._id;
            }
        })
        .catch(err=>console.log(err))
}

const createAccount = (username, password, fullname, address, phone) => {
    fetch(api+'/insert',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            username : username,
            password : password,
            fullname : fullname,
            address : address,
            phone : phone,
        })
    })
    .then(res=>res.json())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
}

export const checkAccount = (username, password, fullname, address, phone) => {
    fetch(api+'/check',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            username : username,
        })
    })
    .then(res=>res.json())
    .then(result => {
        if(result == null){
            
            Alert.alert(
                'Đăng ký tài khoản',
                'Tài khoản đăng ký thành công',
                [
                    {
                        text : 'OK',
                        onPress : ()=>{
                            createAccount(username, password, fullname, address, phone);
                        }
                    }
                ]
                )
        } else {
            Alert.alert(
                'Đăng ký tài khoản',
                'Tài khoản hoặc số điện thoại đã được sử dụng vui lòng thay đổi tên tài khoản khác',
                [
                    {
                        text : 'OK',
                        onPress : ()=>{}
                    }
                ]
                )
        }
    })
    .catch(err=>console.log(err))
}
    