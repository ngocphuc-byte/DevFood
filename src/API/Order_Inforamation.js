const API = 'http://10.0.2.2:3000/OrderDetail'
export const getCart = (id_Cart, setCart) => {
    fetch(API+'/getCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>{
        // console.log(res)
        setCart(res);
    }).catch(err=>console.log(err))
}
export const getFood = (id_Food, setFood) => {
    fetch(API+'/getFood', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Food,
        })
    }).then(res=>res.json())
    .then(res=>setFood(res))
    .catch(err=>console.log(err))
}
export const totalCart = (id_Cart, setTotal) => {
    fetch(API+'/getTotalCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart
        })
    }).then(res=>res.json())
    .then(res=>setTotal(res))
    .catch(err=>console.log(err))
}
export const totalQuantity = (id_Cart, setQuantity) => {
    fetch(API+'/getTotalQuantity',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>setQuantity(res))
    .catch(err=>console.log(err))
}