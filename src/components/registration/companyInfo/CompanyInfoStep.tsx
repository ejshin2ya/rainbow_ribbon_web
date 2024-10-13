import React, { useRef, useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  StepProps,
  FormTitle,
  Input,
  TextBox,
  Text,
  CharCount,
  HintText,
  NextButton,
} from '../../../styles/ModalStyle';
import { registrationDataState } from '../../../atoms/registrationDataState';

const CompanyInfoStep: React.FC<StepProps> = ({ nextStep }) => {
  const [registrationData, setRegistrationData] = useRecoilState(
    registrationDataState,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [companyNameError, setCompanyNameError] = useState<string>('');
  const [isNextButtonActive, setIsNextButtonActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (registrationData.logoImage) {
      if (typeof registrationData.logoImage === 'string') {
        setPreviewUrl(registrationData.logoImage);
      } else if (registrationData.logoImage instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(registrationData.logoImage);
      }
    } else {
      setPreviewUrl(null);
    }
  }, [registrationData.logoImage]);

  const validateCompanyName = (name: string): boolean => {
    if (name === '') return true;
    const regex = /^[가-힣a-zA-Z\s!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
    return regex.test(name);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    if (validateCompanyName(newName)) {
      setCompanyNameError('');
      setRegistrationData(prev => ({
        ...prev,
        companyInfoEditReq: {
          ...prev.companyInfoEditReq,
          companyName: newName,
        },
      }));
    } else {
      setCompanyNameError('한글, 영문, 특수기호만 사용 가능합니다.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setRegistrationData(prev => ({
        ...prev,
        logoImage: file,
      }));
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const { companyName } = registrationData.companyInfoEditReq;
    setIsNextButtonActive(
      companyName.length > 0 &&
        validateCompanyName(companyName) &&
        registrationData.logoImage !== null,
    );
  }, [registrationData.companyInfoEditReq, registrationData.logoImage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNextButtonActive) {
      nextStep(); // 다음 단계로 이동
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>업체명을 입력해 주세요.</FormTitle>
      <Input
        type="text"
        placeholder="업체명을 입력해 주세요."
        value={registrationData.companyInfoEditReq.companyName}
        onChange={handleChange}
        maxLength={50}
      />
      {companyNameError && <ErrorMessage>{companyNameError}</ErrorMessage>}
      <TextBox>
        <Text>한글, 영문, 특수기호 사용 가능</Text>
        <CharCount>
          {registrationData.companyInfoEditReq.companyName.length}/50
        </CharCount>
      </TextBox>

      <FormTitle>업체 로고사진을 추가해 주세요.</FormTitle>
      <HintText>1:1 비율의 이미지를 권장합니다.</HintText>
      <ImageUploadArea onClick={handleUploadClick}>
        {previewUrl ? (
          <ImagePreview src={previewUrl} alt="Logo preview" />
        ) : (
          <UploadButton>사진 등록</UploadButton>
        )}
      </ImageUploadArea>
      <ImageCountText>({previewUrl ? '1' : '0'}/1)</ImageCountText>

      <HiddenInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      <NextButton type="submit" isActive={isNextButtonActive}>
        다음
      </NextButton>
    </form>
  );
};

export default CompanyInfoStep;

const ImageUploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
  overflow: hidden;
`;

const UploadButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;

  &::before {
    content: '+';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border: 1px solid #666;
    border-radius: 50%;
    margin-bottom: 8px;
    font-size: 20px;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageCountText = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 12px;
  margin-top: 4px;
`;
