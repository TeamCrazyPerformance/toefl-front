import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useValidateInput } from "../../customHooks";

const EmailValidationComponentStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "3.5rem",
    paddingBottom: "0.6rem"
  },
  validationBox: {
    display: "flex",
    paddingBottom: "0.6rem"
  },
  textFieldWapper: {
    width: "17rem",
    marginRight: "1.25rem"
  },
  validationButtonWapper: {
    width: "5rem",
    margin: "auto"
  },
  cancelButtonWrapper: {
    width: "23.3rem"
  }
}));

const EmailValidationComponent = props => {
  const { sendEmail, submitValidationCode } = props;
  const {
    wrapper,
    title,
    validationBox,
    textFieldWapper,
    validationButtonWapper,
    cancelButtonWrapper
  } = EmailValidationComponentStyles();
  const email = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "이메일을 입력해주세요"
    },
    {
      validate: val => /^[A-Za-z0-9+]*(@seoultech.ac.kr)$/.test(val),
      validationFalse: "서울과학기술대학교 이메일을 입력해주세요"
    }
  ]);
  const validationCode = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "인증번호를 입력해주세요"
    }
  ]);

  const updateAndValidateEmail = event => {
    email.setValue(event.target.value);
    email.validateAndSetFeedBackMsg(event.target.value);
  };

  const updateAndValidateValidationCode = event => {
    validationCode.setValue(event.target.value);
    validationCode.validateAndSetFeedBackMsg(event.target.value);
  };

  const validateAndSendEmail = () => {
    if (email.validateAndSetFeedBackMsg()) {
      sendEmail({ email }).then(response => {
        if (response) {
          email.setFeedbackMsgAndValidation("이메일을 확인해주세요", true);
        } else {
          email.setFeedbackMsgAndValidation("이미 사용중인 이메일 입니다");
        }
      });
    }
  };

  const validateAndSubmitValidationCode = () => {
    if (validationCode.validateAndSetFeedBackMsg()) {
      submitValidationCode({ email, validationCode }).then(response => {
        if (!response) {
          validationCode.setFeedbackMsgAndValidation(
            "코드가 올바르지 않습니다"
          );
        }
      });
    }
  };

  return (
    <div className={wrapper}>
      <div className={title}>이메일 인증</div>
      <div className={validationBox}>
        <div className={textFieldWapper}>
          <TextField
            label="Email"
            type="string"
            value={email.value}
            onChange={updateAndValidateEmail}
            error={!email.validation}
            helperText={email.feedbackMsg || " "}
            fullWidth
          />
        </div>
        <div className={validationButtonWapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={validateAndSendEmail}
            fullWidth
          >
            전송
          </Button>
        </div>
      </div>
      <div className={validationBox}>
        <div className={textFieldWapper}>
          <TextField
            label="Validation code"
            type="string"
            value={validationCode.value}
            onChange={updateAndValidateValidationCode}
            error={!validationCode.validation}
            helperText={validationCode.feedbackMsg || " "}
            fullWidth
          />
        </div>
        <div className={validationButtonWapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={validateAndSubmitValidationCode}
            fullWidth
          >
            인증
          </Button>
        </div>
      </div>
      <div className={cancelButtonWrapper}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={process.env.REACT_APP_MAIN_URL}
          fullWidth
        >
          가입취소
        </Button>
      </div>
    </div>
  );
};

EmailValidationComponent.propTypes = {
  sendEmail: PropTypes.func.isRequired,
  submitValidationCode: PropTypes.func.isRequired
};

export default EmailValidationComponent;
