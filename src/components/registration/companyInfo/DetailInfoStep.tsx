import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  StepProps,
  FormTitle,
  Input,
  Textarea,
  HintText,
  CharCount,
  NextButton,
} from '../../../styles/ModalStyle';
import { registrationDataState } from '../../../atoms/registrationDataState';
import { registerCompany } from '../../../services/companyService';

interface DetailInfoStepProps extends StepProps {
  onClose: () => void;
}

const DetailInfoStep: React.FC<DetailInfoStepProps> = ({ onClose }) => {
  const [registrationData, setRegistrationData] = useRecoilState(
    registrationDataState,
  );
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRegistrationData(prev => ({
      ...prev,
      companyInfoEditReq: {
        ...prev.companyInfoEditReq,
        [name]: name === 'parallel' ? parseInt(value) : value,
      },
    }));
  };

  useEffect(() => {
    const { parallel, notification } = registrationData.companyInfoEditReq;
    setIsNextButtonActive(
      parallel !== undefined && parallel > 0 && notification.trim() !== '',
    );
  }, [registrationData.companyInfoEditReq]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNextButtonActive) {
      try {
        const response = await registerCompany(registrationData);
        console.log('Registration successful:', response);
        alert('등록 성공');
        onClose();
      } catch (error) {
        console.error('Registration failed:', error);
        console.log(registrationData); // 에러 처리 로직
        alert('등록실패');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HintText>동시 진행 가능한 장례 수</HintText>
      <Input
        type="number"
        name="parallel"
        placeholder="숫자만 입력해 주세요."
        value={registrationData.companyInfoEditReq.parallel || ''}
        onChange={handleChange}
        required
        min="1"
      />

      <FormTitle>안내사항을 입력해 주세요.</FormTitle>
      <Textarea
        name="notification"
        placeholder="안내사항을 입력해 주세요."
        maxLength={500}
        value={registrationData.companyInfoEditReq.notification}
        onChange={handleChange}
        required
      />
      <CharCount>
        {registrationData.companyInfoEditReq.notification.length}/500자
      </CharCount>

      <NextButton type="submit" isActive={isNextButtonActive}>
        완료
      </NextButton>
    </form>
  );
};

export default DetailInfoStep;
