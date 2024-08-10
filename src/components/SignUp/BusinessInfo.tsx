import React, { useState } from "react";
import styled from "styled-components";

interface BusinessInfoProps {
  onSubmit: () => void;
  onPrev: () => void;
  updateFormData: (data: { businessInfo: BusinessInfoData }) => void;
}

interface BusinessInfoData {
  companyName: string;
  businessNumber: string;
  address: string;
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({
  onSubmit,
  onPrev,
  updateFormData,
}) => {
  const [businessData, setBusinessData] = useState<BusinessInfoData>({
    companyName: "",
    businessNumber: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ businessInfo: businessData });
    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>사업자 정보</h2>
      <Input
        type="text"
        name="companyName"
        value={businessData.companyName}
        onChange={handleChange}
        placeholder="회사명"
        required
      />
      <Input
        type="text"
        name="businessNumber"
        value={businessData.businessNumber}
        onChange={handleChange}
        placeholder="사업자 등록번호"
        required
      />
      <Input
        type="text"
        name="address"
        value={businessData.address}
        onChange={handleChange}
        placeholder="주소"
        required
      />
      <ButtonGroup>
        <Button type="button" onClick={onPrev}>
          이전
        </Button>
        <Button type="submit">제출</Button>
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

export default BusinessInfo;
