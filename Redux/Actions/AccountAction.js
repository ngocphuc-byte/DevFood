import { Account } from "../Reducers/AccountReducer";

export const AccountLogin = (idAccount, fullname,address,phone, avatar) => 
    async dispatch => {
        try {
            dispatch({
                type : Account,
                idAccount : idAccount,
                fullname : fullname,
                address : address,
                phone : phone,
                avatar : avatar,
            })
        } catch (error) {
            console.log(error);
        }
    }