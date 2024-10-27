import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  StepProps,
  FormTitle,
  NextButton,
  AddressContainer,
  InputBox,
} from '../../../styles/ModalStyle';
import Button from '../../common/Button';
import Input from 'src/components/common/Input';
import AddressModal from '../../common/AddressModal';
import useModal from '../../../hooks/useModal';
import { registrationDataState } from '../../../atoms/registrationDataState';

interface AddressData {
  address: string;
  zonecode: string;
}

const BusinessInfoStep: React.FC<StepProps> = ({ nextStep }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const [registrationData, setRegistrationData] = useRecoilState(
    registrationDataState,
  );
  const [isNextButtonActive, setIsNextButtonActive] = useState(false);

  const validatePhoneNumber = (value: string) => {
    return /^\d+$/.test(value);
  };

  useEffect(() => {
    console.log('registrationData updated:', registrationData);
  }, [registrationData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Input changed - name: ${name}, value: ${value}`);

    // contact 필드인 경우에만 유효성 검사를 수행
    if (name === 'contact') {
      if (value !== '' && !validatePhoneNumber(value)) {
        return; // 숫자가 아닌 입력은 무시
      }
    }

    setRegistrationData(prev => ({
      ...prev,
      companyInfoEditReq: {
        ...prev.companyInfoEditReq,
        [name]: value,
      },
    }));
  };

  const handleAddressComplete = (data: AddressData) => {
    setRegistrationData(prev => ({
      ...prev,
      companyInfoEditReq: {
        ...prev.companyInfoEditReq,
        address: data.address,
        postalCode: data.zonecode,
      },
    }));
    closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNextButtonActive) {
      nextStep();
    }
  };

  useEffect(() => {
    const { contact, postalCode, address, addressDetail } =
      registrationData.companyInfoEditReq;
    setIsNextButtonActive(
      contact !== '' &&
        postalCode !== '' &&
        address !== '' &&
        addressDetail !== '',
    );
  }, [registrationData.companyInfoEditReq]);

  return (
    <form onSubmit={handleSubmit}>
      <FormTitle>전화번호를 입력해 주세요.</FormTitle>
      <Input
        type="tel"
        name="contact"
        placeholder="고객이 문의할 수 있는 전화번호를 입력해 주세요."
        value={registrationData.companyInfoEditReq.contact || ''}
        onChange={handleChange}
        required
      />

      <FormTitle>사업장 주소를 입력해 주세요.</FormTitle>
      <AddressContainer>
        <InputBox>
          <Input
            type="text"
            name="postalCode"
            value={registrationData.companyInfoEditReq.postalCode || ''}
            onChange={handleChange}
            placeholder="우편번호"
            readOnly
            required
          />
          <Button onClick={openModal} type="button" addBottomMargin="0.6rem">
            주소 찾기
          </Button>
        </InputBox>
        <Input
          type="text"
          name="address"
          value={registrationData.companyInfoEditReq.address || ''}
          onChange={handleChange}
          placeholder="주소"
          readOnly
          required
        />
        <Input
          type="text"
          name="addressDetail"
          value={registrationData.companyInfoEditReq.addressDetail || ''}
          onChange={handleChange}
          placeholder="상세주소"
          required
        />
      </AddressContainer>

      <NextButton type="submit" isActive={isNextButtonActive}>
        다음
      </NextButton>

      <AddressModal
        isOpen={isOpen}
        onClose={closeModal}
        onComplete={handleAddressComplete}
      />
    </form>
  );
};

export default BusinessInfoStep;
