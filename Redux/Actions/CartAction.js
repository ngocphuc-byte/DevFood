import { ADD_TO_CART, UPDATE_FROM_CART, REMOVE_ALL_CART, REMOVE_FROM_CART } from "../Reducers/CartReducer";

export const AddCart = (id_Food, quantity, price) => 
    async dispatch => {
        try {
            dispatch ({
                type : ADD_TO_CART,
                id_Food : id_Food,
                quantity : quantity,
                price : price,
            })
        } catch (error) {
            console.log(error)
        }
}
export const UpdateCart = (id_Food, quantity, price) => 
    async dispatch => {
        try {
            dispatch({
                type : UPDATE_FROM_CART,
                id_Food : id_Food,
                quantity : quantity,
                price : price,
            })
        } catch (error) {
            console.log(error)
        }
    }

export const RemoveAll = () => 
    async dispatch => {
        try {
            dispatch({
                type : REMOVE_ALL_CART,
            })
        } catch (error) {
            console.log(error);
        }
    }

export const RemoveItem = (id_Food) => 
    async dispatch => {
        try {
            dispatch({
                type : REMOVE_FROM_CART,
                id_Food : id_Food,
            })
        } catch (error) {
            console.log(error)
        }
    }

