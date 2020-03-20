import * as actionTypes from "./actionTypes";

const authStoreInitialState = {
  isSignIn: false,
  userInformation: {
    id: "",
    email: "",
    nickName: ""
  }
};

const authReducer = (state = authStoreInitialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_INFORMATION: {
      return {
        isSignIn: true,
        userInformation: {
          id: action.userInformation.id,
          email: action.userInformation.email,
          nickName: action.userInformation.nickName
        }
      };
    }
    case actionTypes.REMOVE_UESR_INFORMATION: {
      return {
        isSignIn: false,
        userInformation: {
          id: "",
          email: "",
          nickName: ""
        }
      };
    }
    case actionTypes.VALIDATE_JWT_TURE: {
      return { ...state, isSignIn: true };
    }
    default:
      return state;
  }
};

export default authReducer;
