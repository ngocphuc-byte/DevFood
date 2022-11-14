const API = 'http://10.0.2.2:3000/food'
export const onHandlerFood = (setData) => {
    fetch(API+'/getfood')
        .then(res=>res.json())
        .then(result => setData(result))
        .catch(err=>console.log(err))
}
export const onHandlerDrink = (setData) => {
    fetch(API+'/getdrink')
        .then(res=>res.json())
        .then(result => setData(result))
        .catch(err=>console.log(err))
}
export const onHandlerSideFood = (setData) => {
    fetch(API+'/getsidefood')
        .then(res=>res.json())
        .then(result => setData(result))
        .catch(err=>console.log(err))
}