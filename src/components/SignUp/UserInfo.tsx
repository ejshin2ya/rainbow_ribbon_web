import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import InputWithLabel from '../common/InputWithLabel';
import {
  PhoneVerificationResponse,
  usePhoneVerification,
} from '../../hooks/usePhoneVerification';
import useModal from '../../hooks/useModal';
import Modal from '../common/Modal';
import { useRecoilState } from 'recoil';
import { signUpFormState } from '../../atoms/signupFormState';

//부모 컴포넌트인 SignUpForm으로 부터 다음페이지로 이동하도록 전달 받은 props
interface UserInfoProps {
  onNext: () => void;
}

// 사용자 정보 입력값 타입 지정
interface UserInfoData {
  name: string;
  phone: string;
  verificationCode: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ onNext }) => {
  //사용자 정보 입력값 상태 관리
  const [userData, setUserData] = useState<UserInfoData>({
    name: '',
    phone: '',
    verificationCode: '',
  });
  const [smsConfirmCode, setSmsConfirmCode] = useState<string | null>(null);
  const { mutate, isPending, isError, isSuccess, error } =
    usePhoneVerification();
  //인증요청 후 작동되는 타이머의 카운트다운 상태값
  const [countdown, setCountdown] = useState<number | null>(null);

  //서버에서 가져온 핸드폰 인증번호와 고객이 입력한 인증번호의 일치여부를 관리하는 상태값
  const [isCodeVerified, setIsCodeVerified] = useState<boolean | null>(null);

  //recoil에서 관리되는 회원가입 요청값을 가져오는 함수
  const [, setFormData] = useRecoilState(signUpFormState);
  const { isOpen, openModal, closeModal } = useModal();

  const handleVerificationRequest = () => {
    //핸드폰 인증 hook을 실행시키는 트리거
    mutate(userData.phone, {
      onSuccess: (data: PhoneVerificationResponse) => {
        setSmsConfirmCode(data.data.smsConfirmCode);
      },
    });
    setCountdown(300); // 5분(300초) 타이머 시작
  };

  const handleVerificationConfirm = () => {
    // 실제로는 백엔드에서 인증 코드 일치 여부를 확인해야 합니다.
    if (userData.verificationCode === smsConfirmCode) {
      setIsCodeVerified(true);
      setCountdown(null); // 타이머 종료
    } else {
      setIsCodeVerified(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Input 입력값의 변화를 감지하여 데이터를 새로 저장해주는 함수
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const nextHandleSubmit = (e: React.FormEvent) => {
    //다음 버튼 선택시 AccountInfo.tsx 컴포넌트를 보여줍니다.
    e.preventDefault();
    onNext();
    setFormData(prev => ({
      ...prev,
      companySignUpReq: {
        ...prev.companySignUpReq,
        name: userData.name,
        phone: userData.phone,
      },
    }));
  };

  useEffect(() => {
    //countdown의 값이 변화될 경우 타이머 카운트다운을 시작하는 함수
    if (countdown === null) return;
    else if (countdown === 0) {
      openModal();
    }

    const timer = setInterval(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, openModal]);

  const formatTime = (time: number) => {
    //5분이 카운트다운되는 것을 시각적으로 그려주는 함수
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  return (
    <Form onSubmit={nextHandleSubmit}>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        message="입력시간을 초과했습니다.다시 인증해 주세요."
      />

      <InputWithLabel
        label="이름"
        htmlFor="name-input"
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="이름을 입력해 주세요."
        required
        disabled={isCodeVerified !== null && isCodeVerified}
      />
      <InputWrapper>
        <InputWithLabel
          label="휴대폰번호"
          htmlFor="phone-input"
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="-없이 입력해 주세요."
          required
          disabled={isCodeVerified !== null && isCodeVerified}
        />
        <Button
          type="button"
          onClick={handleVerificationRequest}
          disabled={isPending || (isCodeVerified !== null && isCodeVerified)}
          addTopMargin={'1.8rem'}
        >
          {countdown !== null && countdown > 0 ? '다시받기' : '인증요청'}
        </Button>
      </InputWrapper>
      {isPending && <p>인증번호를 전송중입니다.</p>}
      {isError && <p>Error: {error?.message}</p>}
      {isSuccess && (
        <>
          <InputWrapper>
            <Input
              type="text"
              name="verificationCode"
              value={userData.verificationCode}
              onChange={handleChange}
              placeholder="인증 번호 6자리를 입력해 주세요."
              required
              disabled={isCodeVerified !== null && isCodeVerified}
            />
            <Button
              type="button"
              onClick={handleVerificationConfirm}
              disabled={isCodeVerified !== null && isCodeVerified}
              addBottomMargin={'0.6rem'}
            >
              확인
            </Button>
          </InputWrapper>
          {countdown !== null && countdown > 0 && (
            <Timer>남은시간: {formatTime(countdown)}</Timer>
          )}
          {isCodeVerified !== null && isCodeVerified && (
            <span>인증이 완료되었습니다</span>
          )}
          {isCodeVerified !== null && !isCodeVerified && (
            <span>인증번호를 다시 확인해주세요</span>
          )}
        </>
      )}

      <InfoText>
        인증번호 문자를 못 받으셨나요? 입력하신 인증정보가 일치하지 않을 경우,
        인증번호 문자는 발송되지 않습니다.
      </InfoText>

      <Button type="submit" disabled={!isCodeVerified}>
        다음
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Timer = styled.div`
  font-size: 0.875rem;
  color: #ff6f3d;
  text-align: right;
  margin-top: -0.5rem;
`;

const InfoText = styled.p`
  font-size: 0.75rem;
  color: #888;
  line-height: 1.5;
  margin-top: -0.5rem;
`;

export default UserInfo;
