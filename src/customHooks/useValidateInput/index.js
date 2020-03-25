import { useState } from "react";

const VALIDATION_INIT_OPTION = {
  validation: true,
  validatePending: "",
  validationTrue: "",
  validationFalse: "값을 입력해주세요"
};

const useValidateInput = (initVal = "") => {
  const [value, setValue] = useState(initVal);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [validation, setValidation] = useState(true);

  const validateForm = (option = VALIDATION_INIT_OPTION) => {
    setFeedbackMsg(option.validatePending || "");
    if (option.validation) {
      setFeedbackMsg(option.validationTrue || "");
      return true;
    }
    setFeedbackMsg(option.validationFalse || "");
    return false;
  };

  const validate = (options = [VALIDATION_INIT_OPTION]) => {
    let tempValidation = true;
    options.forEach(option => {
      if (tempValidation) tempValidation = validateForm(option);
    });
    setValidation(tempValidation);
    return tempValidation;
  };

  const setFeedbackMsgAndValidation = (
    newFeedbackMsg = "",
    newValidation = false
  ) => {
    setFeedbackMsg(newFeedbackMsg);
    setValidation(newValidation);
  };

  return {
    value,
    setValue,
    feedbackMsg,
    setFeedbackMsgAndValidation,
    validation,
    validate
  };
};

export default useValidateInput;
