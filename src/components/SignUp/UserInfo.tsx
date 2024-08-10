import React, { useState } from "react";
import styled from "styled-components";

interface UserInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (data: { userInfo: UserInfoData }) => void;
}

interface UserInfoData {
  name: string;
  email: string;
  phone: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  onNext,
  onPrev,
  updateFormData,
}) => {
  const [userData, setUserData] = useState<UserInfoData>({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ userInfo: userData });
    onNext();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>사용자 정보</h2>
      <Input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="이름"
        required
      />
      <Input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="이메일"
        required
      />
      <Input
        type="tel"
        name="phone"
        value={userData.phone}
        onChange={handleChange}
        placeholder="전화번호"
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

export default UserInfo;
