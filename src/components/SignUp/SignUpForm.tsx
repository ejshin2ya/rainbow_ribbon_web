import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { SignUpFormData, LoginReq } from '../../services/apiService';
import TermsAgreement from './TermsAgreement';
import UserInfo from './UserInfo';
import AccountInfo from './AccountInfo';
import BusinessInfo from './BusinessInfo';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../hooks/useSignUpMutation';
import { useLoginMutation } from '../../hooks/useLoginMutation';
import ProgressBar from '../common/ProgressBar';
import { useAuth } from '../../contexts/AuthContext';
import { authState } from '../../atoms/authState';
import Modal from '../../components/common/Modal';
import useModal from '../../hooks/useModal';
import {
  isCompanyInfoComplete,
  isFuneralInfoComplete,
} from '../../utils/dataMappingUtils';
import { fetchCompanyInfo } from '../../services/companyService';
import { fetchFuneralInfo } from '../../services/FuneralCompositionService';

// 회원가입 컴포넌트 스텝을 enum 형태로 저장하여 순서를 숫자로 인식합니다.
enum SignUpStep {
  termsAgreedInfo,
  UserInfo,
  AccountInfo,
  BusinessInfo,
}

const SignUpForm: React.FC = () => {
  //회원가입 진행 단계의 컴포넌트 순서를 관리하는 상태값
  const [currentStep, setCurrentStep] = useState<SignUpStep>(
    SignUpStep.termsAgreedInfo,
  );
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태 추가
  const { isOpen, openModal, closeModal } = useModal();
  //router를 통해 화면 전환하는 함수
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [, setLogindata] = useRecoilState(authState);

  const {
    mutate: signUp,
    // isPending: isSignUpPending,
    // isError: isSignUpError,
    // isSuccess: isSignUpSuccess,
    // data: signUpData,
    // error: signUpError,
  } = useSignUpMutation();

  const {
    mutate: loginMutate,
    // isPending: isLoginPending,
    // isError: isLoginError,
    // isSuccess: isLoginSuccess,
    // data: loginData,
    // error: loginError,
  } = useLoginMutation();

  const stepName = ['회원', '계정', '사업자'];

  const handleNextStep = () => {
    // 컴포넌트 스텝 다음 단계로 이동하는 함수
    setCurrentStep(prevStep => prevStep + 1);
  };

  const handlePrevStep = () => {
    // 컴포넌트 스텝 이전 단계로 이동하는 함수
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleSubmit = (updatedFormData: SignUpFormData) => {
    signUp(updatedFormData, {
      onSuccess: async () => {
        const loginData: LoginReq = {
          loginId: updatedFormData.companySignUpReq.email,
          password: updatedFormData.companySignUpReq.password,
        };

        loginMutate(loginData, {
          onSuccess: async data => {
            authLogin(data.data.accessToken, data.data.refreshToken);
            setLogindata(prevState => ({
              ...prevState,
              name: data.data.name,
              phone: data.data.phone,
              userType: data.data.userType,
            }));

            try {
              const [companyInfo, funeralInfo] = await Promise.all([
                fetchCompanyInfo(),
                fetchFuneralInfo(),
              ]);

              const hasCompleteCompanyInfo = isCompanyInfoComplete(companyInfo);
              const hasCompleteFuneralInfo = isFuneralInfoComplete(funeralInfo);

              if (hasCompleteCompanyInfo && hasCompleteFuneralInfo) {
                navigate('/partners'); // 메인 페이지로 이동
              } else {
                navigate('/registration'); // 등록 페이지로 이동
                console.log('로그인 완료시 companyinfo', companyInfo);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
              navigate('/registration'); // 에러 발생시 등록 페이지로 이동
            }
          },
          onError: (error: Error) => {
            if (axios.isAxiosError(error)) {
              const msg = error.response?.data?.msg || '로그인에 실패했습니다.';
              setErrorMessage(msg);
            } else {
              setErrorMessage('알 수 없는 오류가 발생했습니다.');
            }
            openModal();
          },
        });
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          const msg =
            error.response?.data?.msg || '회원가입 중 오류가 발생했습니다.';
          setErrorMessage(msg);
        } else {
          setErrorMessage('알 수 없는 오류가 발생했습니다.');
        }
        openModal();
      },
    });
  };

  //컴포넌트 순서에 따라 화면을 전환해주는 함수
  const renderCurrentStep = () => {
    switch (currentStep) {
      case SignUpStep.termsAgreedInfo:
        return <TermsAgreement onNext={handleNextStep} />;
      case SignUpStep.UserInfo:
        return <UserInfo onNext={handleNextStep} />;
      case SignUpStep.AccountInfo:
        return <AccountInfo onNext={handleNextStep} />;
      case SignUpStep.BusinessInfo:
        return <BusinessInfo onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Logo onClick={() => navigate('/')}>
        <img src="/assets/images/RebornLogo.png" alt="reborn_logo" />
      </Logo>
      {currentStep === SignUpStep.termsAgreedInfo ? (
        <FormContainer>{renderCurrentStep()}</FormContainer>
      ) : (
        <FormContainer>
          <HeadBox>
            <IconWrapper>
              <GoArrowLeft size="2rem" type="button" onClick={handlePrevStep}>
                이전
              </GoArrowLeft>
            </IconWrapper>
            <TextWrapper>
              <Title>회원가입</Title>
            </TextWrapper>
          </HeadBox>

          <ProgressBox>
            <span>{currentStep}/3</span>
            <ProgressBar value={(currentStep / 3) * 100} />
          </ProgressBox>

          <SubTitle>{stepName[currentStep - 1]} 정보를 작성해 주세요.</SubTitle>
          <ScrollableContent>{renderCurrentStep()}</ScrollableContent>
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            message={errorMessage}
          ></Modal>
        </FormContainer>
      )}
    </div>
  );
};

const FormContainer = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const SubTitle = styled.h2`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 30px;
  margin-top: 30px;
  cursor: pointer; // 커서 포인터 추가
  img {
    height: 24px;
  }

  &:hover {
    opacity: 0.8; // 호버 효과 추가
    transition: opacity 0.2s ease-in-out;
  }
`;

const ScrollableContent = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 10px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export default SignUpForm;
