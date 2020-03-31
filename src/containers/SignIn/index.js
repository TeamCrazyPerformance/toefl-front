import React, { useState } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authActions from "../../redux/auth/actions";
import LoadingSpinner from "../../components/LoadingSpinner";
import apiCallHelper from "../../helper/apiCallHelper";
import * as authApi from "../../api/authApi";
import { useValidateInput } from "../../customHooks";
import SignInComponent from "../../components/SignInComponent";

const SignIn = props => {
  const { setUserInformationAndJwt } = props;
  const [isLoading, setIsLoading] = useState(false);
  const id = useValidateInput("");
  const password = useValidateInput("");

  const validateId = (newValue = id.value) => {
    return id.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "아이디를 입력해 주세요"
      }
    ]);
  };

  const validatePassword = (newValue = password.value) => {
    return password.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "비밀번호를 입력해 주세요"
      }
    ]);
  };

  const updateAndValidateId = event => {
    id.setValue(event.target.value);
    validateId(event.target.value);
  };

  const updateAndValidatePassword = event => {
    password.setValue(event.target.value);
    validatePassword(event.target.value);
  };

  const validateInputs = () => {
    const idValidation = validateId();
    const passwordValidation = validatePassword();

    return idValidation && passwordValidation;
  };

  const validateInputsAndSignIn = () => {
    const inputsValidation = validateInputs();
    if (inputsValidation) {
      apiCallHelper(
        authApi.signInFetcher({ id: id.value, password: password.value }),
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
              id.setFeedbackMsgAndValidation(
                "아이디 혹은 비밀번호 오류입니다",
                false
              );
              password.setFeedbackMsgAndValidation(
                "아이디 혹은 비밀번호 오류입니다",
                false
              );
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
      <SignInComponent
        id={id.value}
        idValidation={id.validation}
        idFeedbackMsg={id.feedbackMsg}
        updateAndValidateId={updateAndValidateId}
        password={password.value}
        passowrdValidation={password.validation}
        passwordFeedbackMsg={password.feedbackMsg}
        updateAndValidatePassword={updateAndValidatePassword}
        validateInputsAndSignIn={validateInputsAndSignIn}
        signUpPageUrl="/signup"
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
