import { useState } from 'react';
import { useRecoilState } from 'recoil';
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
  ScrollableContent,
} from '../../styles/ModalStyle';
import { GoArrowLeft } from 'react-icons/go';

import {
  CompanyRegistrationStep,
  registrationDataState,
} from '../../atoms/registrationDataState';
import SaveConfirmModal from '../common/SaveConfirmModal';
import { registerCompany } from 'src/services/companyService';

interface CompanyRegistrationModalProps {
  onClose: () => void;
  onRegistrationComplete: () => void;
}

export const CompanyRegistrationModal: React.FC<
  CompanyRegistrationModalProps
> = ({ onClose, onRegistrationComplete }) => {
  const [currentStep, setCurrentStep] = useState<CompanyRegistrationStep>(
    CompanyRegistrationStep.CompanyInfo,
  );
  const [registrationData] = useRecoilState(registrationDataState);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const handleCloseClick = () => {
    if (registrationData) {
      setShowSaveConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSaveAndClose = async () => {
    try {
      await registerCompany(registrationData);
      console.log(registrationData);
      onClose();
    } catch (error) {
      console.error('Error saving registration progress:', error);
      console.log(registrationData);
    }
  };

  const handleCancelClose = () => {
    setShowSaveConfirm(false);
    onClose();
  };

  const stepName = [
    '업체 정보를',
    '사업자 정보를',
    '영업 정보를',
    '상세설명을',
  ];

  const nextStep = () => {
    const nextStep =
      currentStep < CompanyRegistrationStep.DetailInfo
        ? currentStep + 1
        : currentStep;
    setCurrentStep(nextStep);
  };

  const prevStep = () => {
    const prevStep =
      currentStep > CompanyRegistrationStep.CompanyInfo
        ? currentStep - 1
        : currentStep;
    setCurrentStep(prevStep);
  };

  const renderStepComponent = () => {
    const props = { nextStep, onClose, onRegistrationComplete };
    switch (currentStep) {
      case CompanyRegistrationStep.CompanyInfo:
        return <CompanyInfoStep {...props} />;
      case CompanyRegistrationStep.BusinessInfo:
        return <BusinessInfoStep {...props} />;
      case CompanyRegistrationStep.SalesInfo:
        return <SalesInfoStep {...props} />;
      case CompanyRegistrationStep.DetailInfo:
        return <DetailInfoStep {...props} />;
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
          <CloseButton onClick={handleCloseClick}>&times;</CloseButton>
        </ModalHeader>
        <ProgressBox>
          <span>{currentStep}/4</span>
          <ProgressBar value={(currentStep / 4) * 100} />
        </ProgressBox>
        <SubTitle>{stepName[currentStep - 1]} 작성해 주세요.</SubTitle>
        <ScrollableContent>{renderStepComponent()}</ScrollableContent>
        {showSaveConfirm && (
          <SaveConfirmModal
            onConfirm={handleSaveAndClose}
            onCancel={handleCancelClose}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CompanyRegistrationModal;
