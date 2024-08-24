import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { signUpFormState } from "../../atoms/signupFormState";
import { authState } from "../../atoms/authState";
import {
  signUpUser,
  loginUser,
  SignUpFormData,
  LoginReq,
  ApiResponse,
} from "../../services/apiService";
import TermsAgreement from "./TermsAgreement";
import UserInfo from "./UserInfo";
import AccountInfo from "./AccountInfo";
import BusinessInfo from "./BusinessInfo";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

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
    SignUpStep.termsAgreedInfo
  );
  //recoil로 관리되는 회원가입 모든 정보를 가져와서 상태를 관리하는 함수
  const [formData] = useRecoilState<SignUpFormData>(signUpFormState);
  //recoil로 관리되는 로그인 응답값 상태를 관리하는 함수
  const [, setAuth] = useRecoilState(authState);
  //router를 통해 화면 전환하는 함수
  const navigate = useNavigate();

  //react-query의 mutation 기능으로 회원가입 axios 요청 진행
  const signUpMutation: UseMutationResult<ApiResponse, Error, SignUpFormData> =
    useMutation({
      mutationFn: (data: SignUpFormData) => signUpUser(data),
      onSuccess: (data) => {
        console.log("회원가입 성공", data);

        const loginData: LoginReq = {
          loginId: formData.companySignUpReq.email,
          password: formData.companySignUpReq.password,
        };

        loginMutation.mutate(loginData);
      },
      onError: (error) => {
        console.error("회원가입 실패", error);
      },
    });
  //react-query의 mutation 기능으로 로그인 axios 요청 진행
  const loginMutation: UseMutationResult<ApiResponse, Error, LoginReq> =
    useMutation({
      mutationFn: (data: LoginReq) => loginUser(data),
      onSuccess: (data) => {
        console.log("로그인 성공", data);

        // Recoil 로그인 키에 저장할 데이터
        setAuth({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
          isAuthenticated: true,
        });

        // 정보 등록 페이지로 이동
        navigate("/registration");
      },
      onError: (error) => {
        console.error("로그인 실패", error);
        // 로그인 에러시 구현 부분
      },
    });

  const stepName = ["회원", "계정", "사업자"];

  const handleNextStep = () => {
    // 컴포넌트 스텝 다음 단계로 이동하는 함수
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    // 컴포넌트 스텝 이전 단계로 이동하는 함수
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // 회원가입 요청 버튼
    console.log("회원가입 요청", formData);
    signUpMutation.mutate(formData);
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

  return currentStep === SignUpStep.termsAgreedInfo ? (
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
        <ProgressBar
          id="progress"
          value={(currentStep / 3) * 100}
          max="100"
        ></ProgressBar>
      </ProgressBox>

      <SubTitle>{stepName[currentStep - 1]} 정보를 작성해 주세요.</SubTitle>
      {renderCurrentStep()}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
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

const ProgressBar = styled.progress`
  width: 440px;
  background-color: 10px;
  color: #ff6632;
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

export default SignUpForm;
