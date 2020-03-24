import { useState } from "react";

const VALIDATION_INIT_OPTION = {
  validate: input => !(input === ""),
  validatePending: "",
  validationTrue: "",
  validationFalse: "값을 입력해주세요"
};

const useValidateInput = (initVal, options = [VALIDATION_INIT_OPTION]) => {
  const [value, setValue] = useState(initVal);
  const [errMsg, setErrMsg] = useState("");

  const validateForm = (newValue, option = VALIDATION_INIT_OPTION) => {
    setErrMsg(option.validatePending || "");
    if (option.validate(newValue)) {
      setErrMsg(option.validationTrue || "");
      return true;
    }
    setErrMsg(option.validationFalse || "");
    return false;
  };

  const validate = (newValue = value) => {
    let validation = true;
    options.forEach(option => {
      if (validation) validation = validateForm(newValue, option);
    });
    return validation;
  };

  const updateValue = e => {
    setValue(e.target.value);
    validate(e.target.value);
  };

  const updateErrMsg = newErrMsg => setErrMsg(newErrMsg);

  return {
    value,
    updateValue,
    errMsg,
    updateErrMsg,
    validate
  };
};

export default useValidateInput;
