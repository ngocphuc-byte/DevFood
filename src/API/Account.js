import { Alert } from "react-native"

export const UpdateAccount = (idAccount,fullname, address, phone, avatar) => {
    fetch('http://10.0.2.2:3000/account_user/update',{
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