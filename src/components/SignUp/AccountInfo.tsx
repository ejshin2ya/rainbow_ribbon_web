import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../common/Button";
import InputWithLabel from "../common/InputWithLabel";

interface AccountInfoProps {
  //SignUpForm 상위 컴포넌트로부터 받은 props 데이터
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (data: { accountInfo: AccountInfoData }) => void;
}

interface AccountInfoData {
  //계정정보 관련 데이터 타입 설정
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordErrorData {
  passwordvalid: string; //패스워드 유효성 검사 실패시 에러 메시지 문구
  passwordcheck: string; //패스워드 확인시 불일치시 에러 메시지 문구
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  onNext,
  onPrev,
  updateFormData,
}) => {
  const [accountData, setAccountData] = useState<AccountInfoData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<PasswordErrorData>({
    passwordvalid: "",
    passwordcheck: "",
  });

  const validateEmail = (email: string) => {
    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // 비밀번호 유효성 검사: 최소 8자리, 영문 및 숫자 포함
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // 비밀번호와 비밀번호 확인의 상태를 업데이트하는 useEffect
  useEffect(() => {
    let passwordValid = "";
    let passwordCheck = "";

    if (accountData.password && !validatePassword(accountData.password)) {
      passwordValid =
        "비밀번호는 최소 8자리이며 영문과 숫자를 포함해야 합니다.";
    }

    if (
      accountData.confirmPassword &&
      accountData.password !== accountData.confirmPassword
    ) {
      passwordCheck = "비밀번호가 일치하지 않습니다.";
    }

    setPasswordError({
      passwordvalid: passwordValid,
      passwordcheck: passwordCheck,
    });
  }, [accountData.password, accountData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));

    // 이메일 유효성 검사
    if (name === "username") {
      if (!validateEmail(value)) {
        setEmailError("유효한 이메일 주소를 입력해 주세요.");
      } else {
        setEmailError(null); // 이메일이 유효하면 오류 초기화
      }
    }

    if (name === "password" || name === "confirmPassword") {
      let passwordValid = "";
      let passwordCheck = "";

      // 비밀번호 유효성 검사
      if (name === "password") {
        if (!validatePassword(value)) {
          passwordValid =
            "비밀번호는 최소 8자리이며 영문과 숫자를 포함해야 합니다.";
        }
      }

      // 비밀번호 확인 로직
      if (name === "confirmPassword") {
        if (value !== accountData.password) {
          passwordCheck = "비밀번호가 일치하지 않습니다.";
        }
      }

      // 비밀번호와 비밀번호 확인을 동시에 검사
      if (name === "password" || name === "confirmPassword") {
        if (passwordValid === "" && passwordCheck === "") {
          setPasswordError({ passwordvalid: "", passwordcheck: "" });
        } else {
          setPasswordError({
            passwordvalid: passwordValid,
            passwordcheck: passwordCheck,
          });
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountData.password !== accountData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    updateFormData({ accountInfo: accountData });
    onNext();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWithLabel
        label="이메일"
        htmlFor="input-email"
        type="email"
        name="email"
        value={accountData.email}
        onChange={handleChange}
        placeholder="이메일을 입력해 주세요."
        required
      />
      {emailError && <ErrorText>{emailError}</ErrorText>}
      <InputWithLabel
        label="비밀번호"
        htmlFor="input-password"
        type="password"
        name="password"
        value={accountData.password}
        onChange={handleChange}
        placeholder="비밀번호를 입력해 주세요."
        required
      />
      {passwordError && <ErrorText>{passwordError.passwordvalid}</ErrorText>}
      <InputWithLabel
        label="비밀번호 확인"
        htmlFor="input-again-password"
        type="password"
        name="confirmPassword"
        value={accountData.confirmPassword}
        onChange={handleChange}
        placeholder="비밀번호를 다시 입력해 주세요."
        required
      />
      {passwordError && <ErrorText>{passwordError.passwordcheck}</ErrorText>}
      <ButtonGroup>
        <Button
          type="submit"
          disabled={
            !validateEmail(accountData.email) ||
            !validatePassword(accountData.password) ||
            accountData.password !== accountData.confirmPassword
          }
        >
          다음
        </Button>
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-self: end;
  margin-top: 1rem;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: -0.5rem;
`;

export default AccountInfo;
