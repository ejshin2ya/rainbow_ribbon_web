import React, { useState } from "react";
import styled from "styled-components";
import TermsAgreement from "./TermsAgreement";
import UserInfo from "./UserInfo";
import AccountInfo from "./AccountInfo";
import BusinessInfo from "./BusinessInfo";

enum SignUpStep {
  termsAgreedInfo,
  UserInfo,
  AccountInfo,
  BusinessInfo,
}

const SignUpForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>(
    SignUpStep.termsAgreedInfo
  );
  const [formData, setFormData] = useState({
    termsAgreedInfo: {},
    userInfo: {},
    accountInfo: {},
    businessInfo: {},
  });

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData((prevData) => ({ ...prevData, ...stepData }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case SignUpStep.termsAgreedInfo:
        return (
          <TermsAgreement
            onNext={handleNextStep}
            updateFormData={updateFormData}
          />
        );
      case SignUpStep.UserInfo:
        return (
          <UserInfo
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            updateFormData={updateFormData}
          />
        );
      case SignUpStep.AccountInfo:
        return (
          <AccountInfo
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            updateFormData={updateFormData}
          />
        );
      case SignUpStep.BusinessInfo:
        return (
          <BusinessInfo
            onSubmit={handleSubmit}
            onPrev={handlePrevStep}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Form submission logic here
    console.log("Form submitted:", formData);
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
