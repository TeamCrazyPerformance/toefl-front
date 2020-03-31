import React from "react";
import PropTypes from "prop-types";
import AdditionalInformationComponents from "../../components/AdditionalInformationComponents";
import { useValidateInput } from "../../customHooks";
import apiCallHelper from "../../helper/apiCallHelper";
import * as authApi from "../../api/authApi";

const AdditionalInformation = props => {
  const {
    emailForRequestBody,
    setIsLoading,
    setIsError,
    cancelUrl,
    moveToMain
  } = props;

  const id = useValidateInput("");
  const nickName = useValidateInput("");
  const password = useValidateInput("");
  const passwordConfirm = useValidateInput("");

  const validateId = (newValue = id.value) => {
    return id.validate([
      {
        validation: !(newValue === ""),
        validationFalse: "아이디를 입력해주세요"
      },
      {
        validation: /^[A-Za-z0-9+]*$/.test(newValue),
        validationFalse: "영어와 숫자만 사용할 수 있습니다"
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
      apiCallHelper(
        authApi.signUpFetcher({
          id: id.value,
          email: emailForRequestBody,
          nickName: nickName.value,
          password: password.value
        }),
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              moveToMain();
            }
          },
          apiCallFailure: () => setIsError(true)
        }
      );
    }
  };

  return (
    <AdditionalInformationComponents
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
      updateAndValidatePasswordConfirm={updateAndValidatePasswordConfirm}
      validateAdditionalInputsAndSignIn={validateAdditionalInputsAndSignIn}
      cancelUrl={cancelUrl}
    />
  );
};

AdditionalInformation.propTypes = {
  moveToMain: PropTypes.func.isRequired,
  emailForRequestBody: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setIsError: PropTypes.func.isRequired,
  cancelUrl: PropTypes.string.isRequired
};

export default AdditionalInformation;
