import { combineReducers } from 'redux';
import AccountReducer from './AccountReducer';
import CartReducer from './CartReducer';
import OrderReducer from './OrderReducer';

const ReducerAccount = combineReducers({
    Login : AccountReducer,
    Cart : CartReducer,
    Order : OrderReducer,
})
export default (state, action) => ReducerAccount(state, action)