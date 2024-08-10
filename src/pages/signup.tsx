import React from "react";
import styled from "styled-components";
import SignUpForm from "../components/SignUp/SignUpForm";

const SignUpPage: React.FC = () => {
  return (
    <PageContainer>
      <SignUpForm />
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

export default SignUpPage;
