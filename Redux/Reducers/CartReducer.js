export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_FROM_CART = 'UPDATE_FROM_CART';
export const REMOVE_ALL_CART = 'REMOVE_ALL_CART';
const initialState = [];
const CartReducer = (state = initialState, payload) => {
    switch(payload.type) {
        case ADD_TO_CART :
            return [
                ...state,
                {
                id_Food : payload.id_Food,
                quantity : payload.quantity,
                price : payload.price,
            }];
        case UPDATE_FROM_CART :
            return state.map(item=>{
                if(item.id_Food === payload.id_Food){
                    return {
                        ...item,
                        quantity : payload.quantity,
                        price : payload.price
                    }
                }
                return item;
            });
        case REMOVE_ALL_CART : 
            return [];
        case REMOVE_FROM_CART :
            return state.filter(item=>item.id_Food !== payload.id_Food)
    }
    return state;
}
export default CartReducer;