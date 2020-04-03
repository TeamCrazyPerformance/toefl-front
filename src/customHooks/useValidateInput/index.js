import { useState } from "react";

const VALIDATION_INIT_OPTION = {
  validate: () => true,
  validatePending: "",
  validationTrue: "",
  validationFalse: "값을 입력해주세요"
};

const useValidateInput = (initVal = "", options = [VALIDATION_INIT_OPTION]) => {
  const [value, setValue] = useState(initVal);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [validation, setValidation] = useState(true);

  const setFeedbackMsgAndValidation = (
    newFeedbackMsg = "",
    newValidation = false
  ) => {
    setFeedbackMsg(newFeedbackMsg);
    setValidation(newValidation);
  };

  const validateForm = (option = VALIDATION_INIT_OPTION, val) => {
    setFeedbackMsg(option.validatePending || "");
    if (option.validate(val)) {
      setFeedbackMsg(option.validationTrue || "");
      return true;
    }
    setFeedbackMsg(option.validationFalse || "");
    return false;
  };

  const validateAndSetFeedBackMsg = (val = value) => {
    let tempValidation = true;
    options.forEach(option => {
      if (tempValidation) tempValidation = validateForm(option, val);
    });
    setValidation(tempValidation);
    return tempValidation;
  };

  return {
    value,
    setValue,
    feedbackMsg,
    setFeedbackMsgAndValidation,
    validation,
    validateAndSetFeedBackMsg
  };
};

export default useValidateInput;
