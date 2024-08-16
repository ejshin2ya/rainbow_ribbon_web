import React from "react";
import styled from "styled-components";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  htmlFor: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  htmlFor,
  ...props
}) => {
  return (
    <Wrapper>
      <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>
      <StyledInput id={htmlFor} {...props} />
    </Wrapper>
  );
};

export default InputWithLabel;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  color: #333;
`;

const StyledInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;
