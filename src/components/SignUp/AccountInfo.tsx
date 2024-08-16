import React, { useState } from "react";
import styled from "styled-components";

interface AccountInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (data: { accountInfo: AccountInfoData }) => void;
  currentStep: number;
}

interface AccountInfoData {
  username: string;
  password: string;
  confirmPassword: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  onNext,
  onPrev,
  updateFormData,
  currentStep,
}) => {
  const [accountData, setAccountData] = useState<AccountInfoData>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
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
      <h2>계정 정보</h2>
      <Input
        type="text"
        name="username"
        value={accountData.username}
        onChange={handleChange}
        placeholder="사용자 이름"
        required
      />
      <Input
        type="password"
        name="password"
        value={accountData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
      />
      <Input
        type="password"
        name="confirmPassword"
        value={accountData.confirmPassword}
        onChange={handleChange}
        placeholder="비밀번호 확인"
        required
      />
      <ButtonGroup>
        <Button type="button" onClick={onPrev}>
          이전
        </Button>
        <Button type="submit">다음</Button>
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default AccountInfo;
