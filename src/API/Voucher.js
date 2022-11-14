import { Alert, ToastAndroid } from "react-native"

let API = 'http://10.0.2.2:3000/voucher'
export const onHandlerGet = (setData) => {
    fetch(API+'/get')
        .then(res=>res.json())
        .then(result => setData(result))
        .catch(err => console.log(err))
}
export const onHandlerGetSpecial = (setData) => {
    fetch(API+'/getspecial')
        .then(res=>res.json())
        .then(result=>setData(result))
        .catch(err=>console.log(err))
}
 const insertVoucher = (id_Voucher, id_Account) => {
    fetch(API+'/voucher_account',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Voucher : id_Voucher,
            id_Account : id_Account,
        })
    })
    .then(res=>res.json())
    .then(result=>ToastAndroid.show('Lưu voucher thành công',ToastAndroid.SHORT))
    .catch(err=>console.log(err))
 }
export const onHandlerCheck = (id_Voucher, id_Account) => {
    fetch(API+'/voucher_check',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Voucher : id_Voucher,
            id_Account : id_Account,
        })
    })
    .then(res=>res.json())
    .then(result => {
        result == null ?
        insertVoucher(id_Voucher, id_Account)
        :  Alert.alert('Warning', 'Đã được sử dụng hoặc đã lưu',[
            {
                text : 'OK'
            }
        ])
    })
    .catch(err=>console.log(err))
}
