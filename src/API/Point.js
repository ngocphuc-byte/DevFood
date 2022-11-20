import { Alert } from "react-native";
import {API_General} from './API_General'
const API = API_General+'/Point';
export const onHandlerAddPoint = (id_Account, point,_id)=>{
    fetch(API+'/AddPoint',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            _id : id_Account,
            point : point,
        })
    }).then(res=>res.json())
    .then(res=>onHandlerStatePoint(_id))
    .catch(err=>console.log(err))
}
export const onHandlerMinusPoint = (id_Account, point)=>{
    fetch(API+'/MinusPoint',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            _id : id_Account,
            point : point,
        })
    }).then(res=>res.json())
    .then(res=>{
        console.log(res);
    })
    .catch(err=>console.log(err))
}
const onHandlerStatePoint = (_id) => {
    fetch(API+'/ChangeStatePoint',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            _id : _id,
        })
    }).then(res=>res.json())
    .then(res=>{
        Alert.alert('Thông báo','Bạn đã tích điểm thành công',[
            {
                text :'OK',
            }
        ])
    }).catch(err=>console.log(err))
}
