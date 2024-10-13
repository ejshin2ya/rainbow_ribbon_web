import { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import ProgressBar from '../common/ProgressBar';
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
import { funeralCompositionState } from '../../atoms/funeralCompositionState';
import FuneralItemStep from './FuneralInfo/FuneralItemStep';
import FuneralServiceStep from './FuneralInfo/FuneralServiceStep';
import MemorialServiceStep from './FuneralInfo/MemorialServiceStep';
import SaveConfirmModal from '../common/SaveConfirmModal';
import LoadSavedProgressModal from '../common/LoadSavedProgressModal';
import {
  registerFuneralComposition,
  fetchFuneralInfo,
  FuneralInfo,
} from '../../services/FuneralCompositionService';
import { mapFuneralInfoToFuneralComposition } from 'src/utils/dataMappingUtils';

export enum FuneralCompositionStep {
  FuneralItem = 1,
  FuneralService,
  MemorialService,
}

interface FuneralCompositionModalProps {
  onClose: () => void;
  onRegistrationComplete: () => void;
}

export const FuneralCompositionModal: React.FC<
  FuneralCompositionModalProps
> = ({ onClose, onRegistrationComplete }) => {
  const [currentStep, setCurrentStep] = useState<FuneralCompositionStep>(
    FuneralCompositionStep.FuneralItem,
  );
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );
  const resetfuneralComposition = useResetRecoilState(funeralCompositionState);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [showLoadSavedProgressModal, setShowLoadSavedProgressModal] =
    useState(false);

  const [shouldLoadSavedData, setShouldLoadSavedData] = useState(false);

  useEffect(() => {
    setShowLoadSavedProgressModal(true);
  }, []);

  useEffect(() => {
    const loadSavedProgress = async () => {
      if (!shouldLoadSavedData) return;

      try {
        const savedData: FuneralInfo = await fetchFuneralInfo();
        if (savedData) {
          const convertedData = mapFuneralInfoToFuneralComposition(savedData);
          setFuneralComposition(convertedData);
        }
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    };

    loadSavedProgress();
  }, [shouldLoadSavedData, setFuneralComposition]);

  const stepName = [
    '업체를 소개해주세요.',
    '수의-함 서비스를 등록해주세요.',
    '메모리스톤 서비스가 있으신가요?',
  ];

  const handleCloseClick = () => {
    if (Object.keys(funeralComposition).length > 0) {
      setShowSaveConfirm(true);
    } else {
      onClose();
    }
  };

  const handleSaveAndClose = async () => {
    try {
      await registerFuneralComposition({
        ...funeralComposition,
      });
      onClose();
      console.log(funeralComposition);
    } catch (error) {
      console.error('Error saving funeral composition:', error);
      console.log(funeralComposition);
    }
  };

  const handleCancelClose = () => {
    setShowSaveConfirm(false);
  };

  const handleLoadSavedProgress = () => {
    setShowLoadSavedProgressModal(false);
    setShouldLoadSavedData(true);
  };

  const handleCancelLoadSavedProgress = () => {
    setShowLoadSavedProgressModal(false);
    resetfuneralComposition();
  };

  const nextStep = () => {
    const nextStep =
      currentStep < FuneralCompositionStep.MemorialService
        ? currentStep + 1
        : currentStep;
    setCurrentStep(nextStep);
  };

  const prevStep = () => {
    const prevStep =
      currentStep > FuneralCompositionStep.FuneralItem
        ? currentStep - 1
        : currentStep;
    setCurrentStep(prevStep);
  };

  const renderStepComponent = () => {
    const props = { nextStep, onClose, onRegistrationComplete };
    switch (currentStep) {
      case FuneralCompositionStep.FuneralItem:
        return <FuneralItemStep {...props} />;
      case FuneralCompositionStep.FuneralService:
        return <FuneralServiceStep {...props} />;
      case FuneralCompositionStep.MemorialService:
        return <MemorialServiceStep {...props} />;
      default:
        return null;
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <IconWrapper>
            {currentStep > FuneralCompositionStep.FuneralItem && (
              <GoArrowLeft size="2rem" onClick={prevStep} />
            )}
          </IconWrapper>
          <ModalTitle>장례구성</ModalTitle>
          <CloseButton onClick={handleCloseClick}>&times;</CloseButton>
        </ModalHeader>
        <ProgressBox>
          <span>{currentStep}/3</span>
          <ProgressBar value={(currentStep / 3) * 100} />
        </ProgressBox>
        <SubTitle>{stepName[currentStep - 1]} </SubTitle>
        <ScrollableContent>{renderStepComponent()}</ScrollableContent>
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

export default FuneralCompositionModal;
