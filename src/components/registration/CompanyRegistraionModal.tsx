import { useState, useEffect } from 'react';
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
} from '../../styles/ModalStyle';
import { GoArrowLeft } from 'react-icons/go';

import {
  CompanyRegistrationStep,
  RegistrationData,
  registrationDataState,
} from '../../atoms/registrationDataState';
import {
  saveRegistrationProgress,
  loadRegistrationProgress,
  clearRegistrationProgress,
} from '../../utils/registrationUtils';
import SaveConfirmModal from '../common/SaveConfirmModal';
import LoadSavedProgressModal from '../common/LoadSavedProgressModal';

export const CompanyRegistrationModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<CompanyRegistrationStep>(
    CompanyRegistrationStep.CompanyInfo,
  );
  // const [formData, setFormData] = useState<FormData>(initialFormData);
  const [registrationData, setRegistrationData] = useRecoilState(
    registrationDataState,
  );
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showLoadSavedProgressModal, setShowLoadSavedProgressModal] =
    useState(false);
  const [savedProgress, setSavedProgress] = useState<RegistrationData | null>(
    null,
  );

  useEffect(() => {
    const saved = loadRegistrationProgress();
    if (saved) {
      setSavedProgress(saved);
      setShowLoadSavedProgressModal(true);
    }
  }, []);

  const handleCloseClick = () => {
    if (registrationData.isDirty) {
      setShowSaveConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSaveAndClose = () => {
    saveRegistrationProgress({
      ...registrationData,
      currentStep: currentStep,
    });
    onClose();
  };

  const handleCancelClose = () => {
    setShowSaveConfirm(false);
  };

  const handleLoadSavedProgress = () => {
    if (savedProgress) {
      setRegistrationData(savedProgress);
      setCurrentStep(savedProgress.currentStep);
    }
    setShowLoadSavedProgressModal(false);
  };

  const handleCancelLoadSavedProgress = () => {
    clearRegistrationProgress();
    setShowLoadSavedProgressModal(false);
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
    setRegistrationData(prev => ({ ...prev, currentStep: nextStep }));
  };

  const prevStep = () => {
    const prevStep =
      currentStep > CompanyRegistrationStep.CompanyInfo
        ? currentStep - 1
        : currentStep;
    setCurrentStep(prevStep);
    setRegistrationData(prev => ({ ...prev, currentStep: prevStep }));
  };

  const renderStepComponent = () => {
    const props = { nextStep };
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
          <CloseButton onClick={handleCloseClick}>&times;</CloseButton>
        </ModalHeader>
        <ProgressBox>
          <span>{currentStep}/4</span>
          <ProgressBar value={(currentStep / 4) * 100} />
        </ProgressBox>
        <SubTitle>{stepName[currentStep - 1]} 작성해 주세요.</SubTitle>
        {renderStepComponent()}
        {showSaveConfirm && (
          <SaveConfirmModal
            onConfirm={handleSaveAndClose}
            onCancel={handleCancelClose}
          />
        )}
        {showLoadSavedProgressModal && (
          <LoadSavedProgressModal
            onConfirm={handleLoadSavedProgress}
            onCancel={handleCancelLoadSavedProgress}
          />
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CompanyRegistrationModal;
