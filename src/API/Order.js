const API = 'http://10.0.2.2:3000/Payment';
export const getOrder = (id_Account, dispatch, AddOrder) => {
    fetch(API+'/get',{
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
    })
    .catch(err=>console.log(err))
}
export const getImage = (id_Cart, setImage) => {
    fetch(API+'/getImage',{
        method : 'POST',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>{
        setImage(res.map(item=>item.img));
        // console.log(res.map(item=>item.img))
    })
    .catch(err=>console.log(err))
}
