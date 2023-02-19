export const Account = 'Account';
export const UPDATE_POINT = 'UPDATE_POINT';
const initialState = {
  idAccount: '',
  fullname: '',
  address: '',
  phone: '',
  avatar: '',
  point: 0,
  latitude: '',
};
const AccountReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case Account:
      return {
        ...state,
        idAccount: payload.idAccount,
        fullname: payload.fullname,
        address: payload.address,
        phone: payload.phone,
        avatar: payload.avatar,
        point: payload.point,
        latitude: payload.latitude,
        longtitude: payload.longtitude,
      };
    case UPDATE_POINT:
      if (state.idAccount == payload.idAccount) {
        return {
          ...state,
          point: payload.point,
        };
      }

    default:
      return state;
  }
};
export default AccountReducer;
