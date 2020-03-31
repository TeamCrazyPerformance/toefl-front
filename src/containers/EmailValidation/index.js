import React from "react";
import PropTypes from "prop-types";
import EmailValidationComponent from "../../components/EmailValidationComponent";
import { useValidateInput } from "../../customHooks";
import apiCallHelper from "../../helper/apiCallHelper";
import * as authApi from "../../api/authApi";

const EmailValidation = props => {
  const {
    setEmailForRequestBody,
    setEmailValidation,
    setIsLoading,
    setIsError,
    cancelUrl
  } = props;

  const email = useValidateInput("");
  const validationCode = useValidateInput("");

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

  const validateAndSendEmail = () => {
    const emailValValidation = validateEmail();
    if (emailValValidation) {
      email.setFeedbackMsgAndValidation("잠시만 기다려주세요", true);
      apiCallHelper(authApi.validateEmailFetcher({ email: email.value }), {
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
      });
    }
  };

  const validateAndSubmitValidationCode = () => {
    const validationCodeValValidation = validateValidationCode();
    if (validationCodeValValidation) {
      validationCode.setFeedbackMsgAndValidation("잠시만 기다려주세요", true);
      apiCallHelper(
        authApi.validateValidationCodeFetcher({
          email: email.value,
          validationCode: validationCode.value
        }),
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              setIsLoading(false);
              setEmailForRequestBody(email.value);
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

  return (
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
  );
};

EmailValidation.propTypes = {
  setEmailForRequestBody: PropTypes.func.isRequired,
  setEmailValidation: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
  cancelUrl: PropTypes.string.isRequired
};

export default EmailValidation;
