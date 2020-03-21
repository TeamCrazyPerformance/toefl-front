import { useState } from "react";

const useValidateInput = (
  initVal,
  emptyValidation = { emptyErrMsg: "값을 입력해주세요" },
  regValidation = {
    regExp: /$/,
    regExpErrMsg: "옳바른 값을 입력해주세요"
  },
  apiValidation = {
    apiCall: () => new Promise(res => res({ success: true })),
    apiCallPendingMsg: "잠시만 기다려주세요",
    apiCallErrMsg: "사용할 수 없는 값입니다"
  },
  matchValidation = {
    matchVal: "",
    matchValErrMsg: "값이 일치하지 않습니다"
  }
) => {
  const [inputVal, setInputVal] = useState(initVal);
  const [errMsg, setErrMsg] = useState("");
  let validation = false;

  const validateInputValEmpty = input => {
    return new Promise((resolve, reject) => {
      if (input === "") {
        setErrMsg(emptyValidation.emptyErrMsg);
        reject(new Error());
      } else {
        setErrMsg("");
        resolve(input);
      }
    });
  };

  const validateInputValRegExp = input => {
    return new Promise((resolve, reject) => {
      if (regValidation.regExp.test(input)) {
        setErrMsg("");
        resolve(input);
      } else {
        setErrMsg(regValidation.regExpErrMsg);
        reject(new Error());
      }
    });
  };

  const validateInputValMatch = input => {
    return new Promise((resolve, reject) => {
      if (!matchValidation.matchVal || input === matchValidation.matchVal) {
        setErrMsg("");
        resolve(input);
      } else {
        setErrMsg(regValidation.regExpErrMsg);
        reject(new Error());
      }
    });
  };

  const validateInputValApi = input => {
    return new Promise((resolve, reject) => {
      setErrMsg(apiValidation.apiCallPendingMsg);
      apiValidation.apiCall(input).then(response => {
        if (response.success) {
          setErrMsg("");
          resolve(input);
        } else {
          setErrMsg(apiValidation.apiCallErrMsg);
          reject(new Error());
        }
      });
    });
  };

  const validateInput = async (newInputVal = inputVal) => {
    validation = await Promise.resolve(newInputVal)
      .then(validateInputValEmpty)
      .then(validateInputValRegExp)
      .then(validateInputValMatch)
      .then(validateInputValApi)
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false));
    return validation;
  };

  const updateInpuVal = e => {
    setInputVal(e.target.value);
    validateInput(e.target.value);
  };

  const updateErrMsg = newErrMsg => setErrMsg(newErrMsg);

  return [inputVal, updateInpuVal, errMsg, updateErrMsg, validateInput];
};

export default useValidateInput;
