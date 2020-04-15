import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useValidateInput } from "../../customHooks";

const AdditionalInformationComponentStyles = makeStyles(() => ({
  wrapper: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: "4rem",
    paddingBottom: "10px"
  },
  textFieldWapper: {
    width: "20rem",
    paddingBottom: "10px"
  },
  buttonWrapper: {
    width: "20rem"
  },
  cancelButton: {
    float: "left"
  },
  signUpButton: {
    float: "right"
  }
}));

const AdditionalInformationComponent = props => {
  const { signUp } = props;

  const {
    wrapper,
    title,
    textFieldWapper,
    buttonWrapper,
    cancelButton,
    signUpButton
  } = AdditionalInformationComponentStyles();

  const id = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "아이디를 입력해주세요"
    },
    {
      validate: val => /^[A-Za-z0-9+]*$/.test(val),
      validationFalse: "영어와 숫자만 사용할 수 있습니다"
    },
    {
      validate: () => true,
      validatePending: "아이디 사용가능 여부를 검사 중입니다",
      validationFalse: "사용할 수 없는 아이디 입니다"
    }
  ]);
  const nickName = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "닉네임을 입력해주세요"
    },
    {
      validate: () => true,
      validatePending: "닉네임 사용가능 여부를 검사 중입니다",
      validationFalse: "사용할 수 없는 닉네임 입니다"
    }
  ]);
  const password = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "비밀번호를 입력해주세요"
    },
    {
      validate: val => /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]*$/.test(val),
      validationFalse: "영어, 숫자 그리고 특수문자만 사용할 수 있습니다"
    }
  ]);
  const passwordConfirm = useValidateInput("", [
    {
      validate: val => !(val === ""),
      validationFalse: "사용하실 비밀번호를 한번 더 입력해주세요"
    },
    {
      validate: val => val === password.value,
      validationFalse: "비밀번호가 일치하지 않습니다"
    }
  ]);

  const updateAndValidateId = event => {
    id.setValue(event.target.value);
    id.validateAndSetFeedBackMsg(event.target.value);
  };

  const updateAndValidateNickName = event => {
    nickName.setValue(event.target.value);
    nickName.validateAndSetFeedBackMsg(event.target.value);
  };

  const updateAndValidatePassword = event => {
    password.setValue(event.target.value);
    password.validateAndSetFeedBackMsg(event.target.value);
  };

  const updateAndValidatePasswordConfirm = event => {
    passwordConfirm.setValue(event.target.value);
    passwordConfirm.validateAndSetFeedBackMsg(event.target.value);
  };

  const validateInputs = () => {
    const idValidation = id.validateAndSetFeedBackMsg();
    const nickNameValidation = nickName.validateAndSetFeedBackMsg();
    const passwordValidation = password.validateAndSetFeedBackMsg();
    const passwordConfirmValidation = passwordConfirm.validateAndSetFeedBackMsg();

    return (
      idValidation &&
      nickNameValidation &&
      passwordValidation &&
      passwordConfirmValidation
    );
  };

  const validateAdditionalInputsAndSignIn = () => {
    if (validateInputs()) {
      signUp({
        id: id.value,
        nickName: nickName.value,
        password: password.value
      }).then(response => {
        if (!response) {
          id.setFeedbackMsgAndValidation("회원가입에 실패했습니다", false);
          nickName.setFeedbackMsgAndValidation(
            "회원가입에 실패했습니다",
            false
          );
          password.setFeedbackMsgAndValidation(
            "회원가입에 실패했습니다",
            false
          );
          passwordConfirm.setFeedbackMsgAndValidation(
            "회원가입에 실패했습니다",
            false
          );
        }
      });
    }
  };

  return (
    <div className={wrapper}>
      <div className={title}>정보 입력</div>
      <div className={textFieldWapper}>
        <TextField
          label="Id"
          type="string"
          value={id.value}
          onChange={updateAndValidateId}
          error={!id.validation}
          helperText={id.feedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Nickname"
          type="string"
          value={nickName.value}
          onChange={updateAndValidateNickName}
          error={!nickName.validation}
          helperText={nickName.feedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Password"
          type="password"
          value={password.value}
          onChange={updateAndValidatePassword}
          error={!password.validation}
          helperText={password.feedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={textFieldWapper}>
        <TextField
          label="Password confirm"
          type="password"
          value={passwordConfirm.value}
          onChange={updateAndValidatePasswordConfirm}
          error={!passwordConfirm.validation}
          helperText={passwordConfirm.feedbackMsg || " "}
          fullWidth
        />
      </div>
      <div className={buttonWrapper}>
        <Button
          className={cancelButton}
          variant="contained"
          color="primary"
          component={Link}
          to={process.env.REACT_APP_MAIN_URL}
        >
          가입취소
        </Button>
        <Button
          className={signUpButton}
          variant="contained"
          color="primary"
          onClick={validateAdditionalInputsAndSignIn}
        >
          회원가입
        </Button>
      </div>
    </div>
  );
};

AdditionalInformationComponent.propTypes = {
  signUp: PropTypes.func.isRequired
};

export default AdditionalInformationComponent;
