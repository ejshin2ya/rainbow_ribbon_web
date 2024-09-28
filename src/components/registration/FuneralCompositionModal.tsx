import { useState } from 'react';
import { useRecoilState } from 'recoil';
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
} from '../../styles/ModalStyle';
import { GoArrowLeft } from 'react-icons/go';
import { funeralCompositionState } from '../../atoms/funeralCompositionState';
import FuneralItemStep from './FuneralInfo/FuneralItemStep';
import FuneralServiceStep from './FuneralInfo/FuneralServiceStep';
import MemorialServiceStep from './FuneralInfo/MemorialServiceStep';

export enum FuneralCompositionStep {
  FuneralItem = 1,
  FuneralService,
  MemorialService,
}

interface FuneralCompositionModalProps {
  onClose: () => void;
}

export const FuneralCompositionModal: React.FC<
  FuneralCompositionModalProps
> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<FuneralCompositionStep>(
    FuneralCompositionStep.FuneralItem,
  );
  const [funeralComposition, setFuneralComposition] = useRecoilState(
    funeralCompositionState,
  );

  const stepName = [
    '업체를 소개해주세요.',
    '수의-함 서비스를 등록해주세요.',
    '메모리스톤 서비스가 있으신가요?',
  ];

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
    const props = { nextStep };
    switch (currentStep) {
      case FuneralCompositionStep.FuneralItem:
        return <FuneralItemStep {...props} />;
      case FuneralCompositionStep.FuneralService:
        return <FuneralServiceStep {...props} />;
      case FuneralCompositionStep.MemorialService:
        return <MemorialServiceStep {...props} onClose={onClose} />;
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
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ProgressBox>
          <span>{currentStep}/3</span>
          <ProgressBar value={(currentStep / 3) * 100} />
        </ProgressBox>
        <SubTitle>{stepName[currentStep - 1]} </SubTitle>
        {renderStepComponent()}
      </ModalContent>
    </ModalOverlay>
  );
};

export default FuneralCompositionModal;
