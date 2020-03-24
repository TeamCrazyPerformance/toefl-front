import React, { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../redux/auth/actions";
import LoadingSpinner from "../../components/LoadingSpinner";
import fetchHelper from "../../helper/fetchHelper";
import { useValidateInput } from "../../customHooks";

const SignIn = props => {
  const { setUserInformationAndJwt, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [
    idVal,
    updateIdVal,
    idValErrMsg,
    updateIdValErrMsg,
    validateIdVal
  ] = useValidateInput("");
  const [
    passwordVal,
    updatePasswordVal,
    passwordValErrMsg,
    updatePasswordValErrMsg,
    validatePasswordVal
  ] = useValidateInput("");

  const validateId = (newValue = idVal) => {
    return validateIdVal([
      {
        validation: !(newValue === ""),
        validationFalse: "아이디를 입력해 주세요"
      }
    ]);
  };

  const validatePassword = (newValue = passwordVal) => {
    return validatePasswordVal([
      {
        validation: !(newValue === ""),
        validationFalse: "비밀번호를 입력해 주세요"
      }
    ]);
  };

  const updateAndVlidateIdVal = event => {
    updateIdVal(event.target.value);
    validateId(event.target.value);
  };

  const updateAndVlidatePasswordVal = event => {
    updatePasswordVal(event.target.value);
    validatePassword(event.target.value);
  };

  const validateInputs = () => {
    const idValValidation = validateId();
    const passwordValValidation = validatePassword();

    return idValValidation && passwordValValidation;
  };

  const validateInputsAndSignIn = () => {
    const inputsValidation = validateInputs();
    if (inputsValidation) {
      fetchHelper(
        {
          url: "/login",
          method: "post",
          body: { id: idVal.value, password: passwordVal.value }
        },
        {
          apiCallPending: setIsLoading(true),
          apiCallSuccess: response => {
            setIsLoading(false);
            if (response.success) {
              setUserInformationAndJwt({
                jwt: response.token,
                userInformation: {
                  id: response.userInformation.id,
                  email: response.userInformation.email,
                  nickName: response.userInformation.nickName
                }
              });
            } else {
              updateIdValErrMsg("아이디 혹은 비밀번호 오류입니다");
              updatePasswordValErrMsg("아이디 혹은 비밀번호 오류입니다");
            }
          },
          apiCallFailure: () => {
            setIsLoading(false);
          }
        }
      );
    }
  };

  return (
    <LoadingSpinner loadingState={isLoading}>
      <h1>Title</h1>
      <input
        value={idVal}
        placeholder="아이디"
        onChange={updateAndVlidateIdVal}
      />
      <div>{idValErrMsg}</div>
      <input
        type="password"
        value={passwordVal}
        placeholder="비밀번호"
        onChange={updateAndVlidatePasswordVal}
      />
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
