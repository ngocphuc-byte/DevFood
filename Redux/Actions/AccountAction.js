import { Account, UPDATE_POINT } from "../Reducers/AccountReducer";

export const AccountLogin = (idAccount, fullname,address,phone, avatar, point, latitude, longtitude) => 
    async dispatch => {
        try {
            dispatch({
                type : Account,
                idAccount : idAccount,
                fullname : fullname,
                address : address,
                phone : phone,
                avatar : avatar,
                point : point,
                latitude : latitude,
                longtitude : longtitude
            })
        } catch (error) {
            console.log(error);
        }
    }
export const UpdatePointAccount = (idAccount, point) => 
    async dispatch => {
        try {
            dispatch({
                type : UPDATE_POINT,
                idAccount : idAccount,
                point : point,
            })
        } catch (error) {
            console.log(error);
        }
    }