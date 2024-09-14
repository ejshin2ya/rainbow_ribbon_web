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

interface DetailInfoStepProps extends StepProps {
  onClose: () => void;
}

const DetailInfoStep: React.FC<DetailInfoStepProps> = ({
  onClose,
  nextStep,
}) => {
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
      // 여기에서 API 호출 또는 다른 제출 로직을 구현할 수 있습니다.
      console.log('Submitting data:', registrationData);
      nextStep();
      onClose();
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
