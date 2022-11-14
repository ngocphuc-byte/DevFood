import { ADD_TO_ORDER, REMOVE_ITEM, REMOVE_ORDER, UPDATE_ORDER } from "../Reducers/OrderReducer"


export const AddOrder = (_id, id_Cart, id_DetailVoucher, payment_Method
    , receive_Method, confirm_Order, order_Status, state, total, createdAt) =>
    async dispatch => {
        try {
            dispatch({
                type : ADD_TO_ORDER,
                _id : _id,
                id_Cart : id_Cart,
                id_DetailVoucher : id_DetailVoucher,
                payment_Method : payment_Method,
                receive_Method : receive_Method,
                confirm_Order : confirm_Order,
                order_Status : order_Status,
                state : state,
                total : total,
                createdAt : createdAt,
            })
        } catch (error) {
            console.log(error);
        }
    }
export const RemoveOrder = () =>
    async dispatch => {
        try {
            dispatch({
                type : REMOVE_ORDER,
            })
        } catch (error) {
            console.log(error)
        }
    }

export const RemoveItem = (id_Cart) => 
    async dispatch => {
        try {
            dispatch({
                type : REMOVE_ITEM,
                id_Cart : id_Cart,
            })
        } catch (error) {
            console.log(dispatch)
        }
    }
export const UpdateOrder = (_id, state) =>
    async dispatch => {
        try {
            dispatch({
                type : UPDATE_ORDER,
                _id : _id,              
                state : state
            })
        } catch (error) {
            console.log(error)
        }
    }