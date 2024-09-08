import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { signUpFormState } from '../../atoms/signupFormState';
import { authState } from '../../atoms/authState';
import { SignUpFormData, LoginReq } from '../../services/apiService';
import TermsAgreement from './TermsAgreement';
import UserInfo from './UserInfo';
import AccountInfo from './AccountInfo';
import BusinessInfo from './BusinessInfo';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../../hooks/useSignUpMutation';
import { useLoginMutation } from '../../hooks/useLoginMutation';
import api from 'src/api/axios';
import ProgressBar from '../common/ProgressBar';

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
  //recoil로 관리되는 회원가입 모든 정보를 가져와서 상태를 관리하는 함수
  const [formData] = useRecoilState<SignUpFormData>(signUpFormState);
  //recoil로 관리되는 로그인 응답값 상태를 관리하는 함수
  const [, setAuth] = useRecoilState(authState);
  //router를 통해 화면 전환하는 함수
  const navigate = useNavigate();

  const {
    mutate: signUp,
    // isPending: isSignUpPending,
    // isError: isSignUpError,
    // isSuccess: isSignUpSuccess,
    // data: signUpData,
    // error: signUpError,
  } = useSignUpMutation();

  const {
    mutate: login,
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

  const handleSubmit = () => {
    // 회원가입 요청 성공시 로그인 요청
    // 최신 formData를 가져오기 위해 Recoil state를 다시 가져옵니다
    const latestFormData = formData;

    signUp(latestFormData, {
      onSuccess: data => {
        const loginData: LoginReq = {
          loginId: latestFormData.companySignUpReq.email,
          password: latestFormData.companySignUpReq.password,
        };

        login(loginData, {
          onSuccess: data => {
            setAuth({
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              userType: data.data.userType,
              name: data.data.name,
              phone: data.data.phone,
            });

            api.defaults.headers.common.Authorization = data.data.accessToken;

            navigate('/registration');
          },
          onError: error => {
            console.log('로그인 실패', error);
          },
        });
      },
      onError: error => {
        console.error('회원가입 실패', error);
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
      <Logo>
        <img src="/assets/images/ic_logo_white.png" alt="reborn" />
        <img
          src="/assets/images/partners.png"
          alt="partners"
          style={{ paddingLeft: '5px' }}
        />
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
          {renderCurrentStep()}
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
`;

export default SignUpForm;
