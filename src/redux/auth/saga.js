import { all, takeEvery, put, call, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as jwtHelper from "../../helper/jwtHelper";
import * as api from "./api";

const setJwt = function* setJwt() {
  yield takeEvery(actionTypes.SIGN_IN_AND_SET_JWT, function* setJwtSaga({
    jwt
  }) {
    yield call(() => jwtHelper.setJwt(jwt));
    yield put({ type: actionTypes.SIGN_IN_AND_SET_JWT_SUCCESS });
  });
};

const removeJwt = function* removeJwt() {
  yield takeEvery(
    actionTypes.SIGN_OUT_AND_REMOVE_JWT,
    function* removeJwtSaga() {
      yield call(() => jwtHelper.removeJwt());
      yield put({ type: actionTypes.SIGN_OUT_AND_REMOVE_JWT_SUCCESS });
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
      yield put({ type: actionTypes.SIGN_OUT_AND_REMOVE_JWT });
    }
  });
};

const refreshJwt = function* refreshJwt() {
  yield takeEvery(actionTypes.REFRESH_JWT, function* refreshJwtSaga() {
    const newJwt = yield api.refreshJwt();
    if (newJwt) yield call(() => jwtHelper.setJwt(newJwt));
    else yield put({ type: actionTypes.SIGN_OUT_AND_REMOVE_JWT });
  });
};

export default function* authSaga() {
  yield all([
    fork(setJwt),
    fork(removeJwt),
    fork(validateJwt),
    fork(refreshJwt)
  ]);
}
