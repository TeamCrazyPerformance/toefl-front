import { useState } from "react";

const VALIDATION_INIT_OPTION = {
  validation: true,
  validatePending: "",
  validationTrue: "",
  validationFalse: "값을 입력해주세요"
};

const useValidateInput = (initVal = "") => {
  const [value, setValue] = useState(initVal);
  const [errMsg, setErrMsg] = useState("");

  const updateValue = newValue => setValue(newValue);

  const updateErrMsg = newErrMsg => setErrMsg(newErrMsg);

  const validateForm = (option = VALIDATION_INIT_OPTION) => {
    setErrMsg(option.validatePending || "");
    if (option.validation) {
      setErrMsg(option.validationTrue || "");
      return true;
    }
    setErrMsg(option.validationFalse || "");
    return false;
  };

  const validate = (options = [VALIDATION_INIT_OPTION]) => {
    let validation = true;
    options.forEach(option => {
      if (validation) validation = validateForm(option);
    });
    return validation;
  };

  return [value, updateValue, errMsg, updateErrMsg, validate];
};

export default useValidateInput;
