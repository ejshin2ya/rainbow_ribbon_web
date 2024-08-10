import React, { useState } from "react";
import styled from "styled-components";

interface TermsAgreementProps {
  onNext: () => void;
  updateFormData: (data: { termsAgreed: boolean }) => void;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({
  onNext,
  updateFormData,
}) => {
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    setAgreed(!agreed);
    updateFormData({ termsAgreed: !agreed });
  };

  return (
    <Container>
      <h2>이용약관</h2>
      <TermsText>
        {/* 이용약관 내용 */}
        이용약관 내용이 여기에 들어갑니다...
      </TermsText>
      <CheckboxLabel>
        <input type="checkbox" checked={agreed} onChange={handleAgree} />위
        약관에 동의합니다
      </CheckboxLabel>
      <Button onClick={onNext} disabled={!agreed}>
        다음
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TermsText = styled.div`
  height: 200px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default TermsAgreement;
