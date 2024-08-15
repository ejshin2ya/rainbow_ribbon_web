import React, { useState } from "react";
import styled from "styled-components";
import TermsAgreement from "./TermsAgreement";
import UserInfo from "./UserInfo";
import AccountInfo from "./AccountInfo";
import BusinessInfo from "./BusinessInfo";

//회원가입 컴포넌트들을 통합하여 관리하는 컴포넌트입니다.

//회원가입 컴포넌트 스텝을 enum 형태로 저장하여 순서를 숫자로 인식합니다.
enum SignUpStep {
  termsAgreedInfo,
  UserInfo,
  AccountInfo,
  BusinessInfo,
}

const SignUpForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>( //컴포넌트 스텝 순서 데이터 저장
    SignUpStep.termsAgreedInfo
  );
  const [formData, setFormData] = useState({
    //회원가입 컴포넌트별 데이터 관리
    termsAgreedInfo: {},
    userInfo: {},
    accountInfo: {},
    businessInfo: {},
  });

  const handleNextStep = () => {
    //컴포넌트 스텝 다음 단계로 이동하는 함수
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    //컴포넌트 스텝 이전 단계로 이동하는 함수
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const updateFormData = (stepData: Partial<typeof formData>) => {
    //하위 컴포넌트들로부터 데이터를 받아오는 함수
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  const handleSubmit = () => {
    // 회원가입 요청 버튼
    console.log("회원가입 요청", formData);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case SignUpStep.termsAgreedInfo: //첫번째 컴포넌트에 해당할 경우, TermsAgreement 컴포넌트를 보여줍니다.
        return (
          <TermsAgreement
            onNext={handleNextStep}
            updateFormData={updateFormData}
          />
        );
      case SignUpStep.UserInfo: //두번째 컴포넌트에 해당할 경우, UserInfo 컴포넌트를 보여줍니다.
        return (
          <UserInfo
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            updateFormData={updateFormData}
            currentStep={currentStep}
          />
        );
      case SignUpStep.AccountInfo: //세번째 컴포넌트에 해당할 경우, AccountInfo 컴포넌트를 보여줍니다.
        return (
          <AccountInfo
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            updateFormData={updateFormData}
            currentStep={currentStep}
          />
        );
      case SignUpStep.BusinessInfo: //네번째 컴포넌트에 해당할 경우, BusinessInfo 컴포넌트를 보여줍니다.
        return (
          <BusinessInfo
            onSubmit={handleSubmit}
            onPrev={handlePrevStep}
            updateFormData={updateFormData}
            currentStep={currentStep}
          />
        );
      default:
        return null;
    }
  };

  return <FormContainer>{renderCurrentStep()}</FormContainer>;
};

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
`;

export default SignUpForm;
