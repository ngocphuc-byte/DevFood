export const Account = 'Account';
const initialState = {
    idAccount : '',
    fullname : '',
    address : '',
    phone : '',
    avatar : '',
};
const AccountReducer = (state = initialState, payload) => {
    switch(payload.type){
        case Account :
                return {
                    ...state,
                    idAccount : payload.idAccount,
                    fullname : payload.fullname,
                    address : payload.address,
                    phone : payload.phone,
                    avatar : payload.avatar,
                }
        default : return state;
    }
}
export default AccountReducer;