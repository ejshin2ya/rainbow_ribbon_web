import { useState } from 'react';
import ProgressBar from '../common/ProgressBar';
import CompanyInfoStep from './companyInfo/CompanyInfoStep';
import BusinessInfoStep from './companyInfo/BusinessInfoStep';
import SalesInfoStep from './companyInfo/SalesInfoStep';
import DetailInfoStep from './companyInfo/DetailInfoStep';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  SubTitle,
  ProgressBox,
  CloseButton,
  IconWrapper,
} from '../../styles/ModalStyle';
import { GoArrowLeft } from 'react-icons/go';

enum CompanyRegistrationStep {
  CompanyInfo = 1,
  BusinessInfo,
  SalesInfo,
  DetailInfo,
}

interface FormData {
  companyName: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  hasDayOff: string;
  businessHoursType: string;
  simultaneousFunerals: string;
  instructions: string;
}

const initialFormData: FormData = {
  companyName: '',
  phoneNumber: '',
  postalCode: '',
  address: '',
  detailAddress: '',
  hasDayOff: '',
  businessHoursType: '',
  simultaneousFunerals: '',
  instructions: '',
};

export const CompanyRegistrationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<CompanyRegistrationStep>(
    CompanyRegistrationStep.CompanyInfo,
  );
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const stepName = [
    '업체 정보를',
    '사업자 정보를',
    '영업 정보를',
    '상세설명을',
  ];

  const nextStep = () =>
    setCurrentStep(prev =>
      prev < CompanyRegistrationStep.DetailInfo ? prev + 1 : prev,
    );
  const prevStep = () =>
    setCurrentStep(prev =>
      prev > CompanyRegistrationStep.CompanyInfo ? prev - 1 : prev,
    );

  const renderStepComponent = () => {
    const props = { nextStep, formData, setFormData };
    switch (currentStep) {
      case CompanyRegistrationStep.CompanyInfo:
        return <CompanyInfoStep {...props} />;
      case CompanyRegistrationStep.BusinessInfo:
        return <BusinessInfoStep {...props} />;
      case CompanyRegistrationStep.SalesInfo:
        return <SalesInfoStep {...props} />;
      case CompanyRegistrationStep.DetailInfo:
        return <DetailInfoStep {...props} onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <IconWrapper>
            {currentStep > CompanyRegistrationStep.CompanyInfo && (
              <IconWrapper>
                <GoArrowLeft size="2rem" onClick={prevStep} />
              </IconWrapper>
            )}
          </IconWrapper>
          <ModalTitle>업체 정보</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ProgressBox>
          <span>{currentStep}/4</span>
          <ProgressBar value={(currentStep / 4) * 100} />
        </ProgressBox>
        <SubTitle>{stepName[currentStep - 1]} 작성해 주세요.</SubTitle>
        {renderStepComponent()}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CompanyRegistrationModal;
