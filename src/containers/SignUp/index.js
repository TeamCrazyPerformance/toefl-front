import React, { useState } from "react";
import PropTypes, { shape } from "prop-types";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import fetchHelper from "../../helper/fetchHelper";
import { useValidateInput } from "../../customHooks";

import EmailValidationComponent from "../../components/EmailValidationComponent";
import AdditionalInformationComponent from "../../components/AdditionalInformationComponents";

const SignUp = props => {
  const { history } = props;
  const [isLoaing, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const email = useValidateInput("");
  const validationCode = useValidateInput("");
  const id = useValidateInput("");
  const nickName = useValidateInput("");
  const password = useValidateInput("");
  const passwordConfirm = useValidateInput("");

  const cancelUrl = "/";

  const validateEmail = (newValue = email.value) => {
    return email.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "이메일을 입력해주세요"
      },
      {
        validation: /^[A-Za-z0-9+]*(@seoultech.ac.kr)$/.test(newValue),
        validationFalse: "서울과학기술대학교 이메일을 입력해주세요"
      }
    ]);
  };

  const updateAndValidateEmail = event => {
    email.setValue(event.target.value);
    validateEmail(event.target.value);
  };

  const validateValidationCode = (newValue = validationCode.value) => {
    return validationCode.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "인증번호를 입력해주세요"
      }
    ]);
  };

  const updateAndValidateValidationCode = event => {
    validationCode.setValue(event.target.value);
    validateValidationCode(event.target.value);
  };

  const validateId = (newValue = id.value) => {
    return id.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "아이디를 입력해주세요"
      },
      {
        validation: /^[A-Za-z0-9+]*$/.test(newValue),
        validationFalse: "영어혹은 숫자만 사용할 수 있습니다"
      },
      {
        validation: true,
        validatePending: "아이디 사용가능 여부를 검사 중입니다",
        validationFalse: "사용할 수 없는 아이디 입니다"
      }
    ]);
  };

  const updateAndValidateId = event => {
    id.setValue(event.target.value);
    validateId(event.target.value);
  };

  const validateNickName = (newValue = nickName.value) => {
    return nickName.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "닉네임을 입력해주세요"
      },
      {
        validation: true,
        validatePending: "닉네임 사용가능 여부를 검사 중입니다",
        validationFalse: "사용할 수 없는 닉네임 입니다"
      }
    ]);
  };

  const updateAndValidateNickName = event => {
    nickName.setValue(event.target.value);
    validateNickName(event.target.value);
  };

  const validatePassword = (newValue = password.value) => {
    return password.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "비밀번호를 입력해주세요"
      },
      {
        validation: /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]*$/.test(newValue),
        validationFalse: "영어, 숫자 그리고 특수문자만 사용할 수 있습니다"
      }
    ]);
  };

  const updateAndValidatePassword = event => {
    password.setValue(event.target.value);
    validatePassword(event.target.value);
  };

  const validatePasswordConfirm = (newValue = passwordConfirm.value) => {
    return passwordConfirm.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "사용하실 비밀번호를 한번 더 입력해주세요"
      },
      {
        validation: newValue === password.value,
        validationFalse: "비밀번호가 일치하지 않습니다"
      }
    ]);
  };
  const updateAndValidatePasswordConfirm = event => {
    passwordConfirm.setValue(event.target.value);
    validatePasswordConfirm(event.target.value);
  };

  const validateAndSendEmail = () => {
    const emailValValidation = validateEmail();
    if (emailValValidation) {
      fetchHelper(
        {
          url: process.env.REACT_APP_VALIDATE_EMAIL,
          method: "post",
          body: { email: email.value }
        },
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              setIsLoading(false);
              email.setFeedbackMsgAndValidation("이메일을 확인해주세요", true);
            } else {
              email.setFeedbackMsgAndValidation("이미 사용중인 이메일 입니다");
            }
          },
          apiCallFailure: () => setIsError(true)
        }
      );
    }
  };

  const validateAndSubmitValidationCode = () => {
    const validationCodeValValidation = validateValidationCode();
    if (validationCodeValValidation) {
      fetchHelper(
        {
          url: process.env.REACT_APP_VALIDATE_VALIDATION_CODE,
          method: "post",
          body: { email: email.value, validationCode: validationCode.value }
        },
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              setIsLoading(false);
              setEmailValidation(true);
            } else {
              validationCode.setFeedbackMsgAndValidation(
                "코드가 올바르지 않습니다"
              );
            }
          },
          apiCallFailure: () => setIsError(true)
        }
      );
    }
  };

  const validateAdditionalInputs = () => {
    const idValValidation = validateId();
    const nickNameValValidation = validateNickName();
    const passwordValValidation = validatePassword();
    const passwordConfirmValValidation = validatePasswordConfirm();

    return (
      idValValidation &&
      nickNameValValidation &&
      passwordValValidation &&
      passwordConfirmValValidation
    );
  };

  const validateAdditionalInputsAndSignIn = () => {
    const inputsValidation = validateAdditionalInputs();
    if (inputsValidation) {
      fetchHelper(
        {
          url: process.env.REACT_APP_SIGN_UP,
          method: "post",
          body: {
            id: id.value,
            email: email.value,
            nickName: nickName.value,
            password: password.value
          }
        },
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              history.push("/");
            }
          },
          apiCallFailure: () => setIsError(true)
        }
      );
    }
  };

  return (
    <LoadingSpinner loadingState={isLoaing}>
      {isError ? (
        <PageError />
      ) : (
        <>
          {!emailValidation ? (
            <EmailValidationComponent
              email={email.value}
              emailValidation={email.validation}
              emailFeedbackMsg={email.feedbackMsg}
              updateAndValidateEmail={updateAndValidateEmail}
              validateAndSendEmail={validateAndSendEmail}
              validationCode={validationCode.value}
              validationCodeValidation={validationCode.validation}
              validationCodeFeedbackMsg={validationCode.feedbackMsg}
              updateAndValidateValidationCode={updateAndValidateValidationCode}
              validateAndSubmitValidationCode={validateAndSubmitValidationCode}
              cancelUrl={cancelUrl}
            />
          ) : (
            <AdditionalInformationComponent
              id={id.value}
              idValidation={id.validation}
              idFeedbackMsg={id.feedbackMsg}
              updateAndValidateId={updateAndValidateId}
              nickName={nickName.value}
              nickNameValidation={nickName.validation}
              nickNameFeedbackMsg={nickName.feedbackMsg}
              updateAndValidateNickName={updateAndValidateNickName}
              password={password.value}
              passwordValidation={password.validation}
              passwordFeedbackMsg={password.feedbackMsg}
              updateAndValidatePassword={updateAndValidatePassword}
              passwordConfirm={passwordConfirm.value}
              passwordConfirmValidation={passwordConfirm.validation}
              passwordConfirmFeedbackMsg={passwordConfirm.feedbackMsg}
              updateAndValidatePasswordConfirm={
                updateAndValidatePasswordConfirm
              }
              validateAdditionalInputsAndSignIn={
                validateAdditionalInputsAndSignIn
              }
              cancelUrl={cancelUrl}
            />
          )}
        </>
      )}
    </LoadingSpinner>
  );
};

SignUp.propTypes = {
  history: shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default SignUp;
