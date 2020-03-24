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
  const idVal = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "아이디를 입력해 주세요"
    }
  ]);
  const passwordVal = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "비밀번호를 입력해 주세요"
    }
  ]);

  const validateInputs = () => {
    const idValValidation = idVal.validate();
    const passwordValValidation = passwordVal.validate();

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
              idVal.updateErrMsg("아이디 혹은 비밀번호 오류입니다");
              passwordVal.updateErrMsg("아이디 혹은 비밀번호 오류입니다");
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
      <input value={idVal.value} onChange={idVal.updateValue} />
      <div>{idVal.errMsg}</div>
      <input value={passwordVal.value} onChange={passwordVal.updateValue} />
      <div>{passwordVal.errMsg}</div>
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
