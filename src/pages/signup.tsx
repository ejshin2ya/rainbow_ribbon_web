import React from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <PageContainer>
      <h1>회원가입</h1>
      <SignUpForm />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
    color: #333;
  }
`;

export default SignUpPage;
