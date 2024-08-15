import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GoArrowLeft } from "react-icons/go";
import { usePhoneVerification } from "../../hooks/PhoneVeritication";
import useModal from "../../hooks/useModal";
import Modal from "../common/Modal";

interface UserInfoProps {
  onNext: () => void;
  onPrev: () => void;
  updateFormData: (data: { userInfo: UserInfoData }) => void;
  currentStep: number;
}

interface UserInfoData {
  name: string;
  phone: string;
  verificationCode: string;
}

const UserInfo: React.FC<UserInfoProps> = ({
  onNext,
  onPrev,
  updateFormData,
  currentStep,
}) => {
  const [userData, setUserData] = useState<UserInfoData>({
    name: "",
    phone: "",
    verificationCode: "",
  });
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const mutation = usePhoneVerification(); //핸드폰인증 hook을 실행(axios 요청)하는 함수 선언

  const handleVerificationRequest = () => {
    mutation.mutate(userData.phone); //핸드폰 인증 hook을 실행시키는 트리거
    setCountdown(300); // 5분(300초) 타이머 시작
  };

  const handleVerificationConfirm = () => {
    // 실제로는 백엔드에서 인증 코드 일치 여부를 확인해야 합니다.
    if (userData.verificationCode === mutation.data?.data.smsConfirmCode) {
      setIsCodeVerified(true);
      setCountdown(null); // 타이머 종료
    } else {
      setIsCodeVerified(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Input 입력값의 변화를 감지하여 데이터를 새로 저장해주는 함수
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const nextHandleSubmit = (e: React.FormEvent) => {
    //다음 버튼 선택시 AccountInfo.tsx 컴포넌트를 보여줍니다.
    e.preventDefault();
    updateFormData({ userInfo: userData });
    onNext();
  };

  useEffect(() => {
    //countdown의 값이 변화될 경우 타이머 카운트다운을 시작하는 함수
    if (countdown === null) return;
    else if (countdown === 0) {
      openModal();
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, openModal]);

  const formatTime = (time: number) => {
    //5분이 카운트다운되는 것을 시각적으로 그려주는 함수
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <Form onSubmit={nextHandleSubmit}>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        message="입력시간을 초과했습니다.다시 인증해 주세요."
      />
      <HeadBox>
        <IconWrapper>
          <GoArrowLeft size="2rem" type="button" onClick={onPrev}>
            이전
          </GoArrowLeft>
        </IconWrapper>
        <TextWrapper>
          <Title>회원가입</Title>
        </TextWrapper>
      </HeadBox>

      <ProgressBox>
        <span>{currentStep}/3</span>
        <ProgressBar
          id="progress"
          value={(currentStep / 3) * 100}
          max="100"
        ></ProgressBar>
      </ProgressBox>

      <SubTitle>회원 정보를 작성해 주세요.</SubTitle>

      <Input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="이름"
        required
        disabled={isCodeVerified !== null && isCodeVerified}
      />
      <InputWrapper>
        <Input
          type="tel"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="휴대폰번호"
          required
          disabled={isCodeVerified !== null && isCodeVerified}
        />
        <VerificationButton
          type="button"
          onClick={handleVerificationRequest}
          disabled={
            mutation.isPending || (isCodeVerified !== null && isCodeVerified)
          }
        >
          {countdown !== null && countdown > 0 ? "다시받기" : "인증요청"}
        </VerificationButton>
      </InputWrapper>
      {mutation.isPending && <p>인증번호를 전송중입니다.</p>}
      {mutation.isError && <p>Error: {mutation.error?.message}</p>}
      {mutation.isSuccess && mutation.data && (
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
            <VerificationButton
              type="button"
              onClick={handleVerificationConfirm}
              disabled={isCodeVerified !== null && isCodeVerified}
            >
              확인
            </VerificationButton>
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

      <NextButton type="submit" disabled={!isCodeVerified}>
        다음
      </NextButton>
    </Form>
  );
};

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const HeadBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressBar = styled.progress`
  width: 440px;
  background-color: 10px;
  color: #ff6632;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  flex: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const VerificationButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #ff6f3d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
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

const NextButton = styled.button<{ disabled: boolean }>`
  padding: 0.75rem;
  background-color: ${(props) => (!props.disabled ? "#ff6f3d" : "#EBEBEB")};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
`;

export default UserInfo;
