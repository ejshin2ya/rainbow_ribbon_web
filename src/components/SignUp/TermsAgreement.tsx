import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

interface TermsAgreementProps {
  onNext: () => void;
  updateFormData: (data: { termsAgreedInfo: TermsAgreedInfoData }) => void;
}

interface TermsAgreedInfoData {
  allAgreed: boolean;
  agreements: boolean[];
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  onNext,
  updateFormData,
}) => {
  const terms = [
    "계약서의 정보 작성에 대한 확인",
    "사업자 변경 불가 동의",
    "셀프 서비스 이용 동의",
    "광고 · 서비스 운영 원칙 동의",
    "무지개리본 서비스 이용약관",
    "고객 개인정보 보호 동의",
    "개인정보 수집 및 이용 동의",
    "서비스/이벤트 정보 수신 동의",
  ];

  const [TermsAgreedInfoData, setTermsAgreedInfoData] =
    useState<TermsAgreedInfoData>({
      allAgreed: false,
      agreements: Array(terms.length).fill(false),
    });

  const handleAgreeAllChange = () => {
    const newState = TermsAgreedInfoData.allAgreed;
    setTermsAgreedInfoData((prev) => ({
      ...prev,
      allAgreed: !newState,
      agreements: Array(terms.length).fill(!newState),
    }));
  };

  const handleIndividualChange = (index: number) => {
    const newAgreements = [...TermsAgreedInfoData.agreements];
    newAgreements[index] = !newAgreements[index];
    setTermsAgreedInfoData((prev) => ({
      ...prev,
      allAgreed: newAgreements.every(Boolean),
      agreements: newAgreements,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData({ termsAgreedInfo: TermsAgreedInfoData });
    onNext();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <AgreementBox>
        <Logo>
          <img src="path_to_logo" alt="Logo" />
        </Logo>
        <Title>무지개리본 파트너 회원가입을 시작합니다.</Title>
        <SubTitle>
          무지개리본 파트너가 되시면 모든 서비스를 편하게 이용하실 수 있어요.
          진행하시기 전에 내용을 검토하고 동의해 주세요.
        </SubTitle>
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={TermsAgreedInfoData.allAgreed}
            onChange={handleAgreeAllChange}
          />
          <Label>모든 약관에 동의합니다</Label>
        </CheckboxContainer>
        <TermsList>
          {terms.map((term, index) => (
            <TermItem key={index}>
              <Checkbox
                checked={TermsAgreedInfoData.agreements[index]}
                onChange={() => handleIndividualChange(index)}
              />
              <span>{term}</span>
            </TermItem>
          ))}
        </TermsList>
        <SubmitButton type="submit" disabled={!TermsAgreedInfoData.allAgreed}>
          시작하기
        </SubmitButton>
      </AgreementBox>
    </Container>
  );
};

const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const SubTitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 30px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
`;

const TermsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  text-align: left;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    svg {
      margin-right: 10px;
      color: #ff6f3c;
    }

    span {
      font-size: 14px;
      color: #555;
    }
  }
`;

const TermItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const AgreementBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Logo = styled.div`
  text-align: left;
  margin-bottom: 20px;

  img {
    width: 150px;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ff6f3c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #e65c2d;
  }
`;

export default TermsAgreement;
