import React, { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import PageError from "../PageError";
import fetchHelper from "../../helper/fetchHelper";
import { useValidateInput } from "../../customHooks";

const SignUp = props => {
  const { history } = props;
  const [isLoaing, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);

  const [
    emailVal,
    updateEmailVal,
    emailValErrMsg,
    ,
    validateEmailVal
  ] = useValidateInput("");
  const [
    validationCodeVal,
    updateValidationCodeVal,
    validationCodeValErrMsg,
    ,
    validateValidationCodeVal
  ] = useValidateInput("");
  const [idVal, updateIdVal, idValErrMsg, , validateIdVal] = useValidateInput(
    ""
  );
  const [
    nickNameVal,
    updateNickNameVal,
    nickNameValErrMsg,
    ,
    validateNickNameVal
  ] = useValidateInput("");
  const [
    passwordVal,
    updatePasswordVal,
    passwordValErrMsg,
    ,
    validatePasswordVal
  ] = useValidateInput("");
  const [
    passwordConfirmVal,
    updatePasswordConfirmVal,
    passwordConfirmValErrMsg,
    ,
    validatePasswordConfirmVal
  ] = useValidateInput("");

  const validateEmail = (newValue = emailVal) => {
    return validateEmailVal([
      {
        validation: !(newValue === ""),
        validationFalse: "이메일을 입력해주세요"
      },
      {
        validation: /^[0-9]{8}(@seoultech.ac.kr)*$/.test(newValue),
        validationFalse: "서울과학기술대학교 이메일을 입력해주세요"
      }
    ]);
  };
  const updateAndValidateEmailVal = event => {
    updateEmailVal(event.target.value);
    validateEmail(event.target.value);
  };

  const validateValidationCode = (newValue = validationCodeVal) => {
    return validateValidationCodeVal([
      {
        validation: !(newValue === ""),
        validationFalse: "인증번호를 입력해주세요"
      }
    ]);
  };
  const updateAndValidateValidationCodeVal = event => {
    updateValidationCodeVal(event.target.value);
    validateValidationCode(event.target.value);
  };

  const validateId = (newValue = idVal) => {
    return validateIdVal([
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
  const updateAndValidateIdVal = event => {
    updateIdVal(event.target.value);
    validateId(event.target.value);
  };

  const validateNickName = (newValue = nickNameVal) => {
    return validateNickNameVal([
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
  const updateAndValidateNickNameVal = event => {
    updateNickNameVal(event.target.value);
    validateNickName(event.target.value);
  };

  const validatePassword = (newValue = passwordVal) => {
    return validatePasswordVal([
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
  const updateAndValidatePasswordVal = event => {
    updatePasswordVal(event.target.value);
    validatePassword(event.target.value);
  };

  const validatePasswordConfirm = (newValue = passwordConfirmVal) => {
    return validatePasswordConfirmVal([
      {
        validation: !(newValue === ""),
        validationFalse: "사용하실 비밀번호를 한번 더 입력해주세요"
      },
      {
        validation: newValue === passwordVal,
        validationFalse: "비밀번호가 일치하지 않습니다"
      }
    ]);
  };
  const updateAndValidatePasswordConfirmVal = event => {
    updatePasswordConfirmVal(event.target.value);
    validatePasswordConfirm(event.target.value);
  };

  const validateAndSendEmail = () => {
    const emailValValidation = validateEmail();
    if (emailValValidation) {
      fetchHelper(
        {
          url: "/user/email",
          method: "post",
          body: { email: emailVal }
        },
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              setIsLoading(false);
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
          url: "/user/email/validation",
          method: "post",
          body: { email: emailVal, validationCode: validationCodeVal }
        },
        {
          apiCallStart: () => setIsLoading(true),
          apiCallSuccess: res => {
            if (res.success) {
              setIsLoading(false);
              setEmailValidation(true);
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
          url: "/user",
          method: "post",
          body: {
            id: idVal,
            email: emailVal,
            nickName: nickNameVal,
            password: passwordVal
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
            <div>
              <h1>이메일 인증</h1>
              <div>
                <input
                  value={emailVal}
                  placeholder="이메일"
                  onChange={updateAndValidateEmailVal}
                />
                <div>{emailValErrMsg}</div>
                <input
                  type="button"
                  value="전송"
                  onClick={validateAndSendEmail}
                />
              </div>
              <div>
                <input
                  value={validationCodeVal}
                  placeholder="인증번호"
                  onChange={updateAndValidateValidationCodeVal}
                />
                <div>{validationCodeValErrMsg}</div>
                <input
                  type="button"
                  value="인증 확인"
                  onClick={validateAndSubmitValidationCode}
                />
              </div>
              <div>
                <input
                  type="button"
                  value="가입취소"
                  onClick={() => history.push("/")}
                />
                <input type="button" value="다음으로" onClick={() => {}} />
              </div>
            </div>
          ) : (
            <div>
              <h1>추가정보입력</h1>
              <div>
                <input
                  value={idVal}
                  placeholder="아이디"
                  onChange={updateAndValidateIdVal}
                />
                <div>{idValErrMsg}</div>
              </div>
              <div>
                <input
                  value={nickNameVal}
                  placeholder="닉네임"
                  onChange={updateAndValidateNickNameVal}
                />
                <div>{nickNameValErrMsg}</div>
              </div>
              <div>
                <input
                  type="password"
                  value={passwordVal}
                  placeholder="비밀번호"
                  onChange={updateAndValidatePasswordVal}
                />
                <div>{passwordValErrMsg}</div>
              </div>
              <div>
                <input
                  type="password"
                  value={passwordConfirmVal}
                  placeholder="비밀번호 확인"
                  onChange={updateAndValidatePasswordConfirmVal}
                />
                <div>{passwordConfirmValErrMsg}</div>
              </div>
              <div>
                <input
                  type="button"
                  value="가입취소"
                  onClick={() => history.push("/")}
                />
                <input
                  type="button"
                  value="가입완료"
                  onClick={validateAdditionalInputsAndSignIn}
                />
              </div>
            </div>
          )}
        </>
      )}
    </LoadingSpinner>
  );
};

export default SignUp;
