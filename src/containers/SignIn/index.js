import React, { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../redux/auth/actions";
import callSignInApi from "./api";
import LoadingSpinner from "../../components/LoadingSpinner";

import { useValidateInput } from "../../customHooks";

const SignIn = props => {
  const { setUserInformationAndJwt, history } = props;
  const [loadingState, setLoadingState] = useState(false);
  const [
    idVal,
    updateIdVal,
    idValErrMsg,
    updateIdValErrMsg,
    validateIdVal
  ] = useValidateInput("practice", { emptyErrMsg: "ID를 입력해 주세요" });
  const [
    passwordVal,
    updatePasswordVal,
    passwordValErrMsg,
    updatePasswordValErrMsg,
    validatePasswordVal
  ] = useValidateInput("practice", { emptyErrMsg: "Password를 입력해 주세요" });

  const validateInputs = async () => {
    let validation = false;
    validation = await validateIdVal();
    validation = await validatePasswordVal();
    return validation;
  };

  const validateInputsAndSignIn = async () => {
    const inputsValidation = await validateInputs();
    if (inputsValidation) {
      callSignInApi({
        id: idVal,
        password: passwordVal,
        apiCallStart: () => setLoadingState(true),
        apiCallSuccess: res => {
          setLoadingState(false);
          setUserInformationAndJwt({
            jwt: res.token,
            userInformation: {
              id: res.userInformation.id,
              email: res.userInformation.email,
              nickName: res.userInformation.nickName
            }
          });
        },
        apiCallFailure: () => {
          updateIdValErrMsg("아이디 혹은 비밀번호가 일치하지 않습니다");
          updatePasswordValErrMsg("아이디 혹은 비밀번호가 일치하지 않습니다");
          setLoadingState(false);
        }
      });
    }
  };

  return (
    <LoadingSpinner loadingState={loadingState}>
      <h1>Title</h1>
      <input value={idVal} onChange={updateIdVal} />
      <div>{idValErrMsg}</div>
      <input value={passwordVal} onChange={updatePasswordVal} />
      <div>{passwordValErrMsg}</div>
      <input type="button" value="로그인" onClick={validateInputsAndSignIn} />
      <input
        type="button"
        value="회원가입"
        onClick={() => history.push("/signup")}
      />
    </LoadingSpinner>
  );
};

SignIn.propTypes = {
  setUserInformationAndJwt: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(authActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
