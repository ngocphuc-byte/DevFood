import { Alert, ToastAndroid } from "react-native";
import {API_General} from './API_General'
const API = API_General+'/History';
export const getCart = (id_Cart, setCart) => {
    fetch(API+'/getCart', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>{
        console.log(res);
        setCart(res);
    }).catch(err=>console.log(err))
}
export const getIdCart = (id_Account, setIdCart) => {
    fetch(API+'/getIdCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account
        })
    }).then(res=>res.json())
    .then(res=>{
        setIdCart(res._id)
    }).catch(err=>console.log(err))
}
export const deleteAll = (id_Cart) => {
    fetch(API+'/deleteCurentCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    })
}
export const insertCart = (id_Cart, id_Food, quantity, price) => {
    fetch(API+'/insertCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
            id_Food : id_Food,
            quantity : quantity,
            price : price,
        })
    }).then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
}
export const onHandlerCheckCart = (id_Account, setStateCart) => {
    fetch(API+'/checkCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
        })
    })
    .then(res =>res.json())
    .then(result => {
        if(result == null){
            setStateCart(false);
        } else {
            setStateCart(true);
        }
    })
}