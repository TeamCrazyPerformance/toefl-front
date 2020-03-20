import * as actionTypes from "./actionTypes";

const authStoreInitialState = {
  isSignIn: false
};

const authReducer = (state = authStoreInitialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_AND_SET_JWT_SUCCESS: {
      return { isSignIn: true };
    }
    case actionTypes.SIGN_OUT_AND_REMOVE_JWT_SUCCESS: {
      return { isSignIn: false };
    }
    case actionTypes.VALIDATE_JWT_TURE: {
      return { isSignIn: false };
    }
    default:
      return state;
  }
};

export default authReducer;
