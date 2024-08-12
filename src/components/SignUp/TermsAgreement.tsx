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

  const [TermsAgreedInfoData, setTermsAgreedInfoData] = //전체동의 여부와, 개별항목 동의 여부 상태 저장
    useState<TermsAgreedInfoData>({
      allAgreed: false,
      agreements: Array(terms.length).fill(false),
    });

  const handleAgreeAllChange = () => {
    //전체동의 선택시 useState 함수가 작동되어 값을 업데이트하고 렌더링 하는 함수
    const newState = TermsAgreedInfoData.allAgreed;
    setTermsAgreedInfoData((prev) => ({
      ...prev,
      allAgreed: !newState,
      agreements: Array(terms.length).fill(!newState),
    }));
  };

  const handleIndividualChange = (index: number) => {
    //개별 항목 동의 선택시 useState 함수가 작동되어 값을 업데이트하고 렌더링하는 함수
    const newAgreements = [...TermsAgreedInfoData.agreements];
    newAgreements[index] = !newAgreements[index];
    setTermsAgreedInfoData((prev) => ({
      ...prev,
      allAgreed: newAgreements.every(Boolean),
      agreements: newAgreements,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    //전체동의 완료 후 제출 버튼 선택시 상위 컴포넌트인 SignUpForm 컴포넌트로 값을 보내주는 함수
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
          <AllCheckbox
            id="checkbox"
            type="checkbox"
            checked={TermsAgreedInfoData.allAgreed}
            onChange={handleAgreeAllChange}
          />
          <label htmlFor="checkbox" style={{ cursor: "pointer" }}>
            <StyledCheckbox isChecked={TermsAgreedInfoData.allAgreed}>
              <FaCheck color="#FFFFFF" display="relative" />
            </StyledCheckbox>
          </label>
          <Label>모든 약관에 동의합니다</Label>
        </CheckboxContainer>
        <TermsList>
          {terms.map((term, index) => (
            <TermItem key={index}>
              <HiddenCheckbox
                id={`checkbox-${index}`}
                checked={TermsAgreedInfoData.agreements[index]}
                onChange={() => handleIndividualChange(index)}
              />
              <label
                htmlFor={`checkbox-${index}`}
                style={{ cursor: "pointer" }}
              >
                <FaCheck
                  color={
                    TermsAgreedInfoData.agreements[index]
                      ? "#FF6632"
                      : "#EBEBEB"
                  }
                />
              </label>

              <span>{term}</span>
            </TermItem>
          ))}
        </TermsList>
        <SubmitButton type="submit" isvalid={TermsAgreedInfoData.allAgreed}>
          시작하기
        </SubmitButton>
      </AgreementBox>
    </Container>
  );
};

const StyledCheckbox = styled.div<{ isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => (props.isChecked ? "width: 21px;" : "width: 20px;")}
  ${(props) => (props.isChecked ? "height: 21px;" : "height: 20px;")}
  ${(props) =>
    props.isChecked
      ? "background-color: #ff6632;"
      : "background-color: #FFFFFF;"}
  border-radius: 4px;
  ${(props) =>
    props.isChecked
      ? "border: 0px solid #ebebeb;"
      : "border: 2px solid #ebebeb;"}
`;

const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const AgreementBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const Title = styled.h1`
  font-size: 22px;
  margin-bottom: 10px;
  color: #181717;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #adadad;
  margin-bottom: 30px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 2px;
  border: 1px solid #EBEBEB;
  padding: 18px;
}
`;

const AllCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
  width: 20px;
  height: 20px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute,
  width: 20px;
  height: 20px;
`;

const Label = styled.label`
  margin-left: 10px;
  font-size: 16px;
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
      color: #181717;
    }
  }
`;

const TermItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Logo = styled.div`
  text-align: left;
  margin-bottom: 20px;

  img {
    width: 150px;
  }
`;
const SubmitButton = styled.button<{ isvalid: boolean }>`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => (props.isvalid ? "#FF6632" : "#EBEBEB")};
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
