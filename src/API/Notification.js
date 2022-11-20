import { UpdateOrder } from "../../Redux/Actions/OrderAction";
import {API_General} from './API_General'
var API = API_General+'/News';

export const onHandlerGetNews = (setData) => {
    fetch(API+'/get')
        .then(res=>res.json())
        .then(result => {
            setData(result);
        })
        .catch(err=>console.log(err))
}
export const getNotification = (id_Account, dispatch, AddOrder, setOrder) => {
    fetch(API_General+'/Payment/get',{
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
            setOrder(res);
        })
    .catch(err=>console.log(err))
}
export const updateState = (_id, dispatch) => {
    fetch(API_General+'/Payment/updateState',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : _id,
        })
    }).then(res=>res.json())
    .then(res=>{
        dispatch(UpdateOrder(_id, false))
    })
}