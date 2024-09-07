import { useState } from 'react';
import styled from 'styled-components';
import ProgressBar from '../common/ProgressBar';

enum CompanyRegistraionStep {
  CompanyInfo,
  BusinessInfo,
  SalesInfo,
  DetailInfo,
}

export const CompanyInfoModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<CompanyRegistraionStep>(1);
  const stepName = [
    '업체 정보를',
    '사업자 정보를',
    '영업 정보를',
    '상세설명을',
  ];

  const totalSteps = 4;
  const [companyInfo, setCompanyInfo] = useState('');

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>업체 정보</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ProgressBox>
          <span>{currentStep}/4</span>
          <ProgressBar value={(currentStep / 4) * 100} />
        </ProgressBox>
        <SubTitle>{stepName[currentStep - 1]} 작성해 주세요.</SubTitle>

        <FormTitle>업체명을 입력해 주세요.</FormTitle>
        <Input
          type="text"
          placeholder="업체명을 입력해 주세요."
          value={companyInfo}
          onChange={e => setCompanyInfo(e.target.value)}
          maxLength={50}
        />
        <TextBox>
          <Text>한글,영문, 특수문자 사용가능</Text>
          <CharCount>{companyInfo.length}/50</CharCount>
        </TextBox>

        <FormTitle>업체 로고사진을 추가해 주세요.</FormTitle>
        <HintText>1:1 비율의 이미지를 권장합니다.</HintText>
        <ImageUploadArea>
          <UploadButton>+ 사진 등록</UploadButton>
        </ImageUploadArea>

        <NextButton onClick={nextStep}>다음</NextButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  width: 562px;
  height: 622px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const SubTitle = styled.h1`
  font-size: 1.5rem;

  margin-bottom: 1rem;
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
`;

const FormTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin: 20px auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
`;
const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.h1`
  font-size: 14px;
`;

const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100px;
  border: 2px dashed #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const UploadButton = styled.button`
  background: none;
  border: none;
  color: #ff6b6b;
  font-size: 14px;
  cursor: pointer;
`;

const HintText = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const NextButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 8px;
  color: #666;
  font-weight: bold;
  cursor: pointer;
  margin-top: 24px;
  &:hover {
    background-color: #d0d0d0;
  }
`;
