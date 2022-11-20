import { Alert } from "react-native"
import { API_General } from "./API_General"
export const UpdateAccount = (idAccount,fullname, address, phone, avatar, latitude, longtitude) => {
    fetch(API_General+'/account_user/update',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            _id : idAccount,
            fullname : fullname,
            address : address,
            phone : phone,
            avatar : avatar,
            latitude : latitude,
            longtitude : longtitude
        })
    })
    .then(res=>res.json())
    .then(result => {
        Alert.alert('Chỉnh sửa thông tin', 'Chinhr sửa thông tin cá nhân thành công',[
            {
                text : 'OK',
                onPress : ()=>{
                }
            }
        ])
    }).catch(err=>console.logerr)
}