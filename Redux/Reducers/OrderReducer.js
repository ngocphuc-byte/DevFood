export const ADD_TO_ORDER = 'ADD_TO_ORDER';
export const REMOVE_ORDER = 'REMOVE_ORDER';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const UPDATE_ORDER = 'UPDATE_ORDER'
const initialState = [];
const OrderReducer = (state = initialState, payload) => {
    switch(payload.type) {
        case ADD_TO_ORDER:
                return [
                    ...state,
                    {
                        _id : payload._id,
                        id_Cart : payload.id_Cart,
                        id_DetailVoucher : payload.id_DetailVoucher,
                        payment_Method : payload.payment_Method,
                        receive_Method : payload.receive_Method,
                        confirm_Order : payload.confirm_Order,
                        order_Status : payload.order_Status,
                        state : payload.state,
                        total : payload.total,
                        createdAt : payload.createdAt,
                    }
                ];
        case REMOVE_ORDER : 
                return [];
        case REMOVE_ITEM : 
            return state.filter(item=>item.id_Cart == payload.id_Cart)
        case UPDATE_ORDER :
            return state.map(item=>{
                if(item._id == payload._id){
                    return {
                        ...item,
                        state : payload.state,
                    }
                }
                return item
            })
    }
    return state;
}
export default OrderReducer;