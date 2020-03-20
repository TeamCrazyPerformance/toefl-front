import { all, takeEvery, put, call, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as jwtHelper from "../../helper/jwtHelper";
import * as api from "./api";

const setUserInformationAndJwt = function* setUserInformationAndJwt() {
  yield takeEvery(
    actionTypes.SET_USER_INFORMATION_AND_JWT,
    function* setUserInformationAndJwtSaga({
      jwt,
      userInformation: { id, email, nickName }
    }) {
      yield call(() => jwtHelper.setJwt(jwt));
      yield put({
        type: actionTypes.SET_USER_INFORMATION,
        userInformation: { id, email, nickName }
      });
    }
  );
};

const removeUserInformationAndJwt = function* removeUserInformationAndJwt() {
  yield takeEvery(
    actionTypes.REMOVE_UESR_INFORMATION_AND_JWT,
    function* removeUserInformationAndJwtSaga() {
      yield call(() => jwtHelper.removeJwt());
      yield put({ type: actionTypes.REMOVE_UESR_INFORMATION });
    }
  );
};

const validateJwt = function* validateJwt() {
  yield takeEvery(actionTypes.VALIDATE_JWT, function* validateJwtSaga() {
    try {
      const jwtExpiryValidation = yield jwtHelper.validateJwt();
      if (jwtExpiryValidation)
        yield put({ type: actionTypes.VALIDATE_JWT_TURE });
      else yield put({ type: actionTypes.REFRESH_JWT });
    } catch (error) {
      yield put({ type: actionTypes.REMOVE_UESR_INFORMATION_AND_JWT });
    }
  });
};

const refreshJwt = function* refreshJwt() {
  yield takeEvery(actionTypes.REFRESH_JWT, function* refreshJwtSaga() {
    const newJwt = yield api.refreshJwt();
    if (newJwt) yield call(() => jwtHelper.setJwt(newJwt));
    else yield put({ type: actionTypes.REMOVE_UESR_INFORMATION_AND_JWT });
  });
};

export default function* authSaga() {
  yield all([
    fork(setUserInformationAndJwt),
    fork(removeUserInformationAndJwt),
    fork(validateJwt),
    fork(refreshJwt)
  ]);
}
