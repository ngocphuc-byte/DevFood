import { API_General } from "./API_General"


const API = API_General+'/food'
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