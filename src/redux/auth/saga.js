import { all, takeEvery, put, call, fork } from "redux-saga/effects";
import * as actionTypes from "./actionTypes";
import * as jwtHelper from "../../helper/jwtHelper";
import * as api from "./api";

const setJwtToSessionStorage = function* setJwtToSessionStorage() {
  yield takeEvery(
    actionTypes.SIGN_IN_AND_SET_JWT,
    function* setJwtToSessionStorageSaga({ jwt }) {
      yield call(() => jwtHelper.setJwt(jwt));
      yield put({ type: actionTypes.SIGN_IN_AND_SET_JWT_SUCCESS });
    }
  );
};

const removeJwtToSessionStorage = function* removeJwtToSessionStorage() {
  yield takeEvery(
    actionTypes.SIGN_OUT_AND_REMOVE_JWT,
    function* removeJwtToSessionStorageSaga() {
      yield call(() => jwtHelper.removeJwt());
      yield put({ type: actionTypes.SIGN_OUT_AND_REMOVE_JWT_SUCCESS });
    }
  );
};

const jwtValidate = function* jwtValidate() {
  yield takeEvery(actionTypes.JWT_VALIDATE, function* jwtValidateSaga() {
    try {
      const jwtExpiryValidation = yield jwtHelper.jwtExpiryValidate();
      if (jwtExpiryValidation)
        yield put({ type: actionTypes.JWT_VALIDATE_TURE });
      else yield put({ type: actionTypes.JWT_REFRESH });
    } catch (error) {
      yield put({ type: actionTypes.SIGN_OUT_AND_REMOVE_JWT });
    }
  });
};

const jwtRefresh = function* jwtRefresh() {
  yield takeEvery(actionTypes.JWT_REFRESH, function* jwtRefreshSaga() {
    const newJwt = yield api.jwtRefresh();
    if (newJwt) yield call(() => jwtHelper.setJwt(newJwt));
    else yield put({ type: actionTypes.SIGN_OUT_AND_REMOVE_JWT });
  });
};

export default function* authSaga() {
  yield all([
    fork(setJwtToSessionStorage),
    fork(removeJwtToSessionStorage),
    fork(jwtValidate),
    fork(jwtRefresh)
  ]);
}
