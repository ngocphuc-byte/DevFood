import { AddOrder } from "../../Redux/Actions/OrderAction";

const API ='http://10.0.2.2:3000/Payment';
export const InsertPayment = (id_Cart, id_DetailVoucher,
     payment_Method, receive_Method, confirm_Order, order_Status, total) => {
    fetch(API+'/insert',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Cart : id_Cart,
            id_DetailVoucher : id_DetailVoucher,
            payment_Method : payment_Method,
            receive_Method : receive_Method,
            confirm_Order : confirm_Order,
            order_Status : order_Status,
            total : total,
        })
    }).then(res=>res.json())
    .then(result => {
        if(id_DetailVoucher=='undefined'){
            console.log(result);
            changeStateCart(id_Cart);
        } else{
            console.log(result);
            changeStateCart(id_Cart);
            changeStateVoucher(id_DetailVoucher);
        }
    }).catch(err=>console.log(err))
}
const changeStateCart = (id_Cart) => {
    fetch(API+'/changeStateCart', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    })
}
const changeStateVoucher = (id_DetailVoucher) => {
    fetch(API+'/changeStateVoucher',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_DetailVoucher,
        })
    })
}
export const onHandlerGetOrder = (id_Cart, dispatch) => {
    fetch(API+'/getOrder',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Cart : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>{
        res.map(item=> 
            dispatch(AddOrder(item._id, item.id_Cart,
                item.id_DetailVoucher, item.payment_Method, item.receive_Method,
                item.confirm_Order, item.order_Status, item.state, item.total, item.createdAt)))
    }).catch(err=>console.log(err))
}